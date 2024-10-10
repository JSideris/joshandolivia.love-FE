import { useState } from "react";

const TouchHandler: React.FC<{ onSwipeLeft: () => void; onSwipeRight: () => void; children: React.ReactNode }> = ({ onSwipeLeft, onSwipeRight, children }) => {
	const [touchStartX, setTouchStartX] = useState<number | null>(null);
	const [touchEndX, setTouchEndX] = useState<number | null>(null);

	const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
	const handleTouchMove = (e: React.TouchEvent) => setTouchEndX(e.touches[0].clientX);
	const handleTouchEnd = () => {
		if (touchStartX !== null && touchEndX !== null) {
			const distance = touchStartX - touchEndX;
			const swipeThreshold = 50;
			if (distance > swipeThreshold) onSwipeLeft();
			else if (distance < -swipeThreshold) onSwipeRight();
		}
		setTouchStartX(null);
		setTouchEndX(null);
	};

	return (
		<div
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{children}
		</div>
	);
};

export default TouchHandler;