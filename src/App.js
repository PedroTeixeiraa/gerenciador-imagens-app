import React, { useState, useEffect } from 'react';

import api from './api/api'

import './App.css'

import UploadImage from './components/upload-image/upload-image';
import UploadedImages from './components/uploaded-images/uploaded-images';

function App() {
  const [showContent, setShowContent] = useState(false)

  const [images, setImages] = useState([])

  useEffect(() => {
    const loadImages = async () => {
      const result = (await api.get()).data

      const loadedImages = result.map(image => {
        return {
          image: `data:image/png;base64,${image.base64}`,
          name: image.name,
          progress: 100,
        }
      })
      setImages(loadedImages)
      setShowContent(true)
    }

    loadImages()
  }, [])

  const handleImageUpload = async (file) => {
    const imageName = file.name

    const newImage = {
      name: imageName,
      image: URL.createObjectURL(file),
      progress: 0
    }

    const updateImages = [newImage, ...images]
    setImages(updateImages)

    const formData = new FormData()
    formData.append('file', file)

    await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    setTimeout(() => {
      const newImages = updateImages.map((image) => {
        if (image.name === imageName) {
          return { ...image, progress: 100 }
        }
        return image
      })

      setImages(newImages)
    }, 1500)
  }


  return (
    <div className="container">
      <main>
        <header>
          <h1>Upload Image</h1>
          <p>Upload images you want to share with your team</p>
        </header>
        <section>
          <UploadImage handleImageUpload={handleImageUpload} />
          {showContent ? (
            <UploadedImages images={images} />
          ) : null}
        </section>
      </main>
    </div>
  )
}

export default App
