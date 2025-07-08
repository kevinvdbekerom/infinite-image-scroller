import ImageCard from './ImageCard';

export default function ImageList({ images }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
