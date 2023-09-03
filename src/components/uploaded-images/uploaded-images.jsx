
import './uploaded-images.css'

const UploadedImages = ({ images }) => {
  return (
    <div className="uploaded-images-container">
      <h2 className="uploaded-images__title">Uploaded Image</h2>
      {images?.length ? (
        <ul className="uploaded-images__list">
          {images.map(({ image, name, progress }) => (
            <li className="uploaded-images__item">
              <img className="uploaded-images__item__image" src={image} alt="Imagem" />
              <div className="uploaded-images__item__box">
                <div className="uploaded-images__item__box__content">
                  <span className="uploaded-images__item__description">{name} ({progress}%)</span>
                  <span className={`uploaded-images__item__status ${progress < 100 ? 'pending' : 'completed'}`}>
                    {progress < 100 ? 'Pending' : 'Completed'}
                  </span>
                </div>
                <div className="uploaded-images__item__progress-bar">
                  <div
                    className={`uploaded-images__item__progress ${progress < 100 ? 'pending' : 'completed'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default UploadedImages