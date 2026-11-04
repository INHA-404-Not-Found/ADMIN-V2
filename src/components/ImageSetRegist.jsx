import { useEffect, useState } from 'react';
import imageSet from '../styles/ImageSet.module.css';

export default function ImageSetRegist({ images, setImages }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스

    useEffect(() => {
        console.log("images:", images);
    }, [images]);


    // 이미지 업로드 처리
    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files || []);

        setImages(prev => {
            const merged = [...prev];

            selected.forEach(file => {
                // 중복 방지
                const duplicate = merged.some(
                    f => f.name === file.name &&
                        f.size === file.size &&
                        f.lastModified === file.lastModified
                );
                if (!duplicate) merged.push(file);
            });

            return merged;
        });

        e.target.value = "";
    };


    // 이미지 삭제
    const handleDelete = (index) => {
        if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;

        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

        if (currentIndex >= newImages.length) {
            setCurrentIndex(Math.max(0, newImages.length - 1));
        }
    };


    


    const goLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const goRight = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };


    // 이미지 src 변환 함수
    const getImageSrc = (file) => {
        if (!file) return "";
        return typeof file === "string" ? file : URL.createObjectURL(file);
    };

    
    return (
        <div>
            <div className={imageSet.Container}>
                <img
                    className={imageSet.Icon}
                    src="./images/left.png"
                    alt="left"
                    onClick={goLeft}
                    style={{ 
                        cursor: currentIndex > 0 ? 'pointer' : 'default',
                        opacity: currentIndex > 0 ? 1 : 0.3 // 투명도 조절
                    }}
                />

                <div className={imageSet.Image_Container}>
                    {images.length > 0 ? (
                        <>
                            <img
                                className={imageSet.ImageView}
                                src={getImageSrc(images[currentIndex])}
                                alt={`img-${currentIndex}`}
                            />
                            <img
                                className={imageSet.Trash}
                                src="./images/trash.png"
                                alt="trash"
                                onClick={() => handleDelete(currentIndex)}
                                style={{ cursor: "pointer" }}
                            />
                        </>
                    ) : (
                        <div>이미지가 없습니다.</div>
                    )}
                </div>

                <img 
                    className={imageSet.Icon}
                    src="./images/right.png"
                    alt="right"
                    onClick={goRight}
                    style={{
                        cursor: currentIndex < images.length - 1  ? 'pointer' : 'default',
                        opacity: currentIndex < images.length - 1  ? 1 : 0.3 // 투명도 조절
                    }}
                />
            </div>

            <div className={imageSet.UploadBtn}>
                <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                    <img style={{ height: "25px", marginRight: "8px" }} src="./images/upload.png" alt="upload" />
                    <span>사진 업로드</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </label>
            </div>
        </div>
    );
}
