import heic2any from 'heic2any';

type Job = {
	resolve: (value: WorkerOutput | null) => void;
	reject: (reason?: any) => void;
	data: {
		file: File | Blob;
		thumbnailSize: number;
	};
};

let worker: Worker;
let jobQueue: Array<Job> = [];
let currentJob: Job = null;

type WorkerOutput = {
	compressed: {blob: Blob, width: number, height: number};
	thumbnail: {blob: Blob, width: number, height: number};
	errors: string[];
};

function createWorker() {
	if (typeof window !== "undefined" && window.Worker) {
		worker = new Worker(new URL("./thumbnail-worker.js?worker", import.meta.url), { type: 'module', credentials: 'same-origin' });

		worker.addEventListener("message", (e) => {
			if (e.data.error) {
				console.warn("Worker error:", e.data.error);
				currentJob?.resolve(null);
			} else {
				currentJob?.resolve(e.data);
			}
			processNextJob();
		});

		worker.addEventListener("error", (e) => {
			console.warn("Worker error:", e);
			currentJob?.resolve(null);
			processNextJob();
		});
	}
}

function terminateWorker() {
	if (worker) {
		worker.terminate();
		worker = null;
	}
}

function processNextJob() {
	currentJob = null;
	if (jobQueue.length > 0) {
		const nextJob = jobQueue.shift();
		currentJob = nextJob;
		worker?.postMessage(nextJob.data);
	} else {
		terminateWorker();
	}
}

// Function to convert HEIC to PNG using heic2any in the main thread
async function convertHeicToPng(heicFile: File): Promise<Blob> {
	try {
		const convertedBlob = await heic2any({
			blob: heicFile,
			toType: 'image/png'
		});
		console.log(convertedBlob);
		return convertedBlob as Blob;
	} catch (error) {
		console.log('Error converting HEIC to PNG:', error);
		throw new Error('Failed to convert HEIC file to PNG');
	}
}

export default async function generateThumbnails(file: File, thumbnailSize = 256): Promise<WorkerOutput | null> {
	if (!file) {
		console.error("Unable to generate thumbnails. No file provided.");
		return null;
	}
	if (!worker) {
		createWorker();
		if (!worker) {
			console.warn("This browser is unable to generate thumbnails. Web workers not supported.");
			return null;
		}
	}

	// Detect HEIC and convert if necessary
	let processedFile: File | Blob = file;
	const fileType = file.type;

	console.log(fileType);

	if (fileType === 'image/heic' || fileType === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
		try {
			// Convert the HEIC file to PNG
			processedFile = await convertHeicToPng(file);
		} catch (error) {
			console.error("Error converting HEIC:", error);
			return null;
		}
	}

	return new Promise<WorkerOutput>((resolve, reject) => {
		const job: Job = {
			resolve,
			reject,
			data: { file: processedFile, thumbnailSize }
		};

		if (currentJob) {
			jobQueue.push(job);
		} else {
			currentJob = job;
			worker.postMessage(job.data);
		}
	});
}
