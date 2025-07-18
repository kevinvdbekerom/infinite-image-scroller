import './ImageCard.css';

export default function ImageCard({ image }) {
  
  return (
    <div className="image-card-container">
      <div className="image-card">
        <img src={image.downloadUrl} alt={image.author} />
        <div className="image-caption">{image.author}</div>
      </div>
    </div>
  );
}
