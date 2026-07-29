import { useEffect, useState } from 'react';
import imageSet from '../styles/ImageSet.module.css';

export default function ImageSetEdit({ images = [], setImages, setChangeImage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("현재 images 배열: ", images);
  }, [images]);

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

  const handleDelete = (index) => {
    if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;

    const newImages = images.filter((_, i) => i !== index);

    // File 객체인 경우 createObjectURL 해제
    const removed = images[index];
    if (removed instanceof File) {
      URL.revokeObjectURL(removed);
    }

    setImages(newImages);

    if (currentIndex >= newImages.length) {
      setCurrentIndex(Math.max(0, newImages.length - 1));
    }

    setChangeImage(true);
  };

    const handleUpload = (e) => {
        const selectedFiles = Array.from(e.target.files || []);

        // 이전 이미지 제거하고 새로 업로드한 것만 넣기
        setImages(selectedFiles);

        setChangeImage(true);

        // input 초기화
        e.target.value = "";
    };

  const getImageSrc = (img) => {
    if (typeof img === "string") {
      // 서버에서 가져온 이미지 경로
      return `https://lost-inha.kro.kr${img}`;
    } else if (img instanceof File) {
      // 업로드한 파일
      return URL.createObjectURL(img);
    }
    return "";
  };

  return (
    <div>
      <div className={imageSet.Container}>
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
          onClick={handleNext}
          style={{
            cursor: currentIndex < images.length - 1  ? 'pointer' : 'default',
            opacity: currentIndex < images.length - 1  ? 1 : 0.3 // 투명도 조절
          }}
        />
      </div>

      <div className={imageSet.UploadBtn}>
        <label
          htmlFor="fileUpload"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <img style={{ height: '25px' }} src="./images/upload.png" alt="upload" />
          <div>사진 업로드</div>
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
}
