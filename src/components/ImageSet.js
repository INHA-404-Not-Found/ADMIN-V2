import { useState } from 'react';
import imageSet from '../styles/ImageSet.module.css';

export default function ImageSet({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    return (
        <div className={imageSet.Container}> 
            {/* 왼쪽 화살표: 첫 이미지면 숨김 */}
            <img
                className={imageSet.Icon}
                src="./images/left.png"
                alt="left"
                onClick={handlePrev}
                style={{ 
                    cursor: currentIndex > 0 ? 'pointer' : 'default',
                    opacity: currentIndex > 0 ? 1 : 0.3 // 투명도 조절
                }}
            />

            {/* 이미지 표시 */}
            <div className={imageSet.Image_Container}>
                {images.length > 0 ? (
                    <img
                        className={imageSet.ImageView}
                        src={`https://lost-inha.kro.kr${images[currentIndex]}`}
                        alt={`image-${currentIndex}`}
                    />
                ) : (
                    <p>이미지가 없습니다.</p>
                )}
            </div>

            {/* 오른쪽 화살표: 마지막 이미지면 숨김 */}
            <img 
                className={imageSet.Icon}
                src="./images/right.png"
                alt="right"
                onClick={handleNext}
                style={{
                    cursor: currentIndex < images.length - 1  ? 'pointer' : 'default',
                    opacity: currentIndex < images.length - 1  ? 1 : 0.3 // 투명도 조절
                }}
            />
        </div>
    )
}
