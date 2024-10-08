type Job = {
	resolve: (value: WorkerOutput | null) => void;
	reject: (reason?: any) => void;
	data: {
		file: File;
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

	return new Promise<WorkerOutput>((resolve, reject) => {
		const job: Job = {
			resolve,
			reject,
			data: { file, thumbnailSize}
		};

		if (currentJob) {
			jobQueue.push(job);
		} else {
			currentJob = job;
			worker.postMessage(job.data);
		}
	});
}