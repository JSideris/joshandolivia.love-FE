import "./PhotoInfo.css";

const PhotoInfo: React.FC<{ photographerName: string; hdPhotoUrl?: string; onDownload: () => void }> = ({ photographerName, hdPhotoUrl, onDownload }) => (
	<div className="photo-info" onClick={e=>e.stopPropagation()}>
		<span>Captured by {photographerName}</span>
		<br />
		{hdPhotoUrl && (
			<span className="download-link" onClick={onDownload}>
				Download HD
			</span>
		)}
	</div>
);

export default PhotoInfo;