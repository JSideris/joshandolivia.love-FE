import { useEffect, useState } from "react";
import largeUploadIcon from "../../assets/images/icons/cloud-upload-large.svg";
import "./DragAndDrop.css";

interface DragAndDropProps {
	currentPath: string;
	onDrop?: (files: { file: File, path: string }[]) => void;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
	currentPath,
	onDrop
}) => {

	const [isDragging, setIsDragging] = useState(false);
	const [dragCounter, setDragCounter] = useState(0);
	const [disableDragAndDrop, setDisableDragAndDrop] = useState(false);

	useEffect(() => {
		const handleDragEnter = (e: DragEvent) => {

			// console.log("enter", dragCounter);

			if (disableDragAndDrop) return;
			setDragCounter((prevCounter) => prevCounter + 1);
			setIsDragging(true);
		};

		const handleDragLeave = (e: DragEvent) => {

			if (disableDragAndDrop) return;
			let nextCounter = dragCounter;
			setDragCounter((prevCounter) => {
				nextCounter = Math.max(0, prevCounter - 1);
				return nextCounter;
			});

			if (nextCounter === 0) {
				setIsDragging(false); // If leaving the last drag element
			}
		};

		const handleDrop = async (e: DragEvent) => {
			if (disableDragAndDrop) return;
			e.preventDefault();

			if (isDragging) {
				setDragCounter(0);
				setIsDragging(false);

				const items = Array.from(e.dataTransfer.items);
				await processItems(items);
			}
		};

		const handleDragOver = (e: DragEvent) => {
			if (disableDragAndDrop) return;
			e.preventDefault();
		};

		const handleMouseDown = () => {
			setDisableDragAndDrop(true);
		};

		const handleMouseUp = () => {
			setDisableDragAndDrop(false);
		};

		window.addEventListener("dragenter", handleDragEnter);
		window.addEventListener("dragleave", handleDragLeave);
		window.addEventListener("dragover", handleDragOver);
		window.addEventListener("drop", handleDrop);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);

		// Cleanup the event listeners on unmount
		return () => {
			window.removeEventListener("dragenter", handleDragEnter);
			window.removeEventListener("dragleave", handleDragLeave);
			window.removeEventListener("dragover", handleDragOver);
			window.removeEventListener("drop", handleDrop);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, dragCounter, disableDragAndDrop]);

	const processItems = async (items: DataTransferItem[]) => {
		let files = [];

		// Process all items in the DataTransferItem array
		for (let item of items) {
			if (item.kind === "file") {
				// Use getAsFile for regular file entries
				// console.log(item);
				
				if (item.type) {
					const file = item.getAsFile();
					files.push({
						file: file,
						path: currentPath // Add your logic for setting the path
					});
				} else {
					// If it's a directory, we use webkitGetAsEntry() to handle it
					const entry = item.webkitGetAsEntry();
					if (entry && entry.isDirectory) {
						// Process directory recursively
						files = files.concat(await traverseDirectory(entry, currentPath));
					}
				}
			}
		}

		// console.log("files", files);
		onDrop(files); // Proceed with the processed files
	};

	async function traverseDirectory(entry, fullPath) {
		let files = [];

		// If entry is file, push it to the array
		if (entry.isFile) {
			files.push({
				file: await getFile(entry),
				path: fullPath
			});
		} else if (entry.isDirectory) {
			// If entry is directory, recursively traverse it
			let reader = entry.createReader();
			let entries = (await readAllEntries(reader)) as unknown[];

			for (let childEntry of entries) {
				files = files.concat(await traverseDirectory(childEntry, `${fullPath}${entry.name}/`));
			}
		}

		return files;
	}

	function getFile(entry) {
		return new Promise((resolve) => {
			entry.file(resolve);
		});
	}

	function readAllEntries(reader) {
		return new Promise((resolve, reject) => {
			let entries = [];

			function readEntries() {
				reader.readEntries((result) => {
					if (!result.length) {
						resolve(entries);
					} else {
						entries = entries.concat(result);
						readEntries();
					}
				}, reject);
			}

			readEntries();
		});
	}

	return (
		<div className={`filedrop-overlay ${isDragging ? "visible" : "hidden"}`}>
			<div className="stylistic-filedrop-bg"></div>
			<img src={largeUploadIcon} width="300" height="300" />
			<br />
			<br />
			<p>Drop files here.</p>
		</div>
	);
};

export default DragAndDrop;