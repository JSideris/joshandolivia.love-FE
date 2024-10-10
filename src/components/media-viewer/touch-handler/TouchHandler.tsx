import { useState } from "react";

const TouchHandler: React.FC<{ onSwipeLeft: () => void; onSwipeRight: () => void; children: React.ReactNode }> = ({ onSwipeLeft, onSwipeRight, children }) => {
	const [touchStartX, setTouchStartX] = useState<number | null>(null);
	const [touchEndX, setTouchEndX] = useState<number | null>(null);

	// Handle touch start
	const handleTouchStart = (e: React.TouchEvent) => {
		// Ignore if more than one touch point is detected
		if (e.touches.length > 1) {
			setTouchStartX(null); // Cancel swipe interaction
			return;
		}
		setTouchStartX(e.touches[0].clientX);
	};

	// Handle touch move
	const handleTouchMove = (e: React.TouchEvent) => {
		// Ignore if more than one touch point is detected
		if (e.touches.length > 1) {
			setTouchEndX(null); // Cancel swipe interaction
			return;
		}
		setTouchEndX(e.touches[0].clientX);
	};

	// Handle touch end
	const handleTouchEnd = () => {
		// Only process swipe if one touch was active and both touchStartX and touchEndX are set
		if (touchStartX !== null && touchEndX !== null) {
			const distance = touchStartX - touchEndX;
			const swipeThreshold = 50; // Minimum distance for swipe to be recognized
			if (distance > swipeThreshold) {
				// Swipe left detected
				onSwipeLeft();
			} else if (distance < -swipeThreshold) {
				// Swipe right detected
				onSwipeRight();
			}
		}
		// Reset the touch coordinates
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
