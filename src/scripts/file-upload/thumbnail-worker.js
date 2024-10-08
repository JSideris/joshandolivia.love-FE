

import imageCompression from 'browser-image-compression';

self.addEventListener('message', async (e) => {
	let errors = [];
	let compressed;
	let thumbnail;
	try{
		let imgBitmap = await createImageBitmapFromFile(e.data.file);
		let width = imgBitmap.width;
		let height = imgBitmap.height;
		let sizeFactor = 256 / Math.max(width, height);
		compressed = await generateThumbnail(imgBitmap, 1);
		thumbnail = await generateThumbnail(imgBitmap, sizeFactor);
	}
	catch(e){
		errors.push(e.message);
	}
	
	self.postMessage({ compressed, thumbnail, errors: errors });
});

async function generateThumbnail(imgBitmap, sizeFactor) {
    

    let thumbnailWidth = Math.ceil(imgBitmap.width * sizeFactor);
    let thumbnailHeight = Math.ceil(imgBitmap.height * sizeFactor);

	if(thumbnailWidth < 64 || thumbnailHeight < 64) return null;

    let offscreenCanvas = new OffscreenCanvas(thumbnailWidth, thumbnailHeight);
    let ctx = offscreenCanvas.getContext('2d');

	ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(imgBitmap, 0, 0, thumbnailWidth, thumbnailHeight);

    const blob = await offscreenCanvas.convertToBlob();
    const options = {
        maxSizeMB: 1,           // maximum size in MB
        // maxWidthOrHeight: 256,  // max size for width or height
        useWebWorker: true,
        fileType: 'image/webp', // file type
        initialQuality: 0.75    // initial quality (0-1)
    };

    // Compress the image using browser-image-compression
    // @ts-ignore
    const compressedBlob = await imageCompression(blob, options);
    return {
		blob: compressedBlob,
		width: thumbnailWidth,
		height: thumbnailHeight
	};
}

function createImageBitmapFromFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			createImageBitmap(new Blob([event.target.result])).then(bitmap=>{
				resolve(bitmap);
			}).catch(reject);
		};
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});
}