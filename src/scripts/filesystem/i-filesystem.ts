// A generic filesystem interface for TypeScript that can be implemented for different backends
// such as S3, IndexedDB, or a remote Linux filestore.

export interface IFileMetadata {
	name: string;
	path: string;
	size: number;
	lastModified: Date;
	isDirectory: boolean;
	hasThumbnail: boolean;
}

export interface IFilesystem {
	// File operations
	readFile(path: string): Promise<File>; // Read file content as binary data
	writeFile(path: string, data: File): Promise<void>; // Write data to a file
	writeFiles(data: {
		file: File,
		path: string
	}[]): Promise<void>; // Write data to a file
	deleteFile(path: string): Promise<void>; // Delete a file
	copyFile(sourcePath: string, destinationPath: string): Promise<void>; // Copy a file
	moveFile(sourcePath: string, destinationPath: string): Promise<void>; // Move or rename a file

	// Directory operations
	createDirectory(path: string): Promise<void>; // Create a new directory
	deleteDirectory(path: string): Promise<void>; // Delete a directory and its contents
	listDirectory(path: string): Promise<IFileMetadata[]>; // List files and directories within a path

	// Metadata operations
	getMetadata(path: string): Promise<IFileMetadata>; // Get metadata for a file or directory
	exists(path: string): Promise<boolean>; // Check if a file or directory exists

	// Stream operations (useful for large files)
	// readFileStream(path: string): Promise<ReadableStream<Uint8Array>>; // Read file as a stream
	// writeFileStream(path: string): Promise<WritableStream<Uint8Array>>; // Write to a file using a stream

	// Permissions and access
	// setPermissions(path: string, permissions: string): Promise<void>; // Set permissions for a file or directory
	// getPermissions(path: string): Promise<string>; // Get permissions for a file or directory

	// Utility
	rename(oldPath: string, newPath: string): Promise<void>; // Rename a file or directory
	// watch(path: string, callback: (event: 'created' | 'deleted' | 'modified', path: string) => void): void; // Watch a path for changes
}

// Example usage (implementation-dependent):
// const filesystem: Filesystem = new S3Filesystem() or new LocalFilesystem();
// await filesystem.writeFile('/example/path.txt', new Uint8Array([1, 2, 3]));