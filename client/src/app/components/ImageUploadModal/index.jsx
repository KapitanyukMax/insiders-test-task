'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImages } from '../../lib/images.js';
import styles from './index.module.css';

export default function ImageUploadModal({ ref: modalRef, user }) {
  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (event) => {
    event.preventDefault();
    setDragging(false);
    const selectedFiles = event.target.files || event.dataTransfer.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleImagesSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await uploadImages(formData);
      router.reload();
    } catch (error) {
      if (error.message === 'Unauthorized') {
        alert('Ви не авторизовані. Будь ласка, увійдіть або зареєструйтесь');
        router.push('/login');
        setFiles([]);
        setDragging(false);
        modalRef.current?.close();
      }
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setDragging(false);
    modalRef.current?.close();
  };

  if (!user) return null;

  return (
    <dialog ref={modalRef} className={styles.modal}>
      <h1>Завантажте зображення</h1>
      <div>
        <div
          className={`${styles['drag-drop-area']} ${
            dragging ? styles.dragging : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            Перетягніть зображення сюди або натисніть, щоб вибрати файл
          </label>
        </div>

        <div className={styles['image-preview']}>
          {files.length > 0 && (
            <div>
              <h3 className={styles.subheading}>Обрані файли:</h3>
              <div className={styles['preview-container']}>
                {files.map((file, index) => (
                  <div key={index} className={styles['preview-item']}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className={styles['preview-image']}
                    />
                    <button
                      className={styles['remove-button']}
                      onClick={() => handleRemoveImage(index)}
                    >
                      Видалити
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles['modal-menu-container']}>
        <button onClick={handleCancel}>Скасувати</button>
        <button onClick={handleImagesSubmit}>Оновити зображення</button>
      </div>
    </dialog>
  );
}
