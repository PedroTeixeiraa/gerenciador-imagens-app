import React, { useRef, useState } from 'react';
import image from "../../images/upload-image.png"

import './upload-image.css'

const UploadImage = ({ handleImageUpload }) => {
  const [isDragging, setIsDragging] = useState()

  const fileInputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setIsDragging(false)
    handleImageUpload(file)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const classNameContainer = `upload-image-container ${isDragging ? 'dragging' : ''}`

  return (
    <div
      className={classNameContainer}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <img className="upload-image__image" src={image} alt="Imagem" />
      <label className="upload-image__label">
        <span className="upload-image__span">Drag and drop image here</span>
        <span className="upload-image__span">-OR-</span>
        <button
          className="upload-image__button"
          onClick={() => fileInputRef.current.click()
          }>
          Browser Image
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />
      </label>
    </div>
  )
}

export default UploadImage