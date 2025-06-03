import type { ImageType } from "../../services/types";
import ImageCard from "../ImageCard/ImageCard";

type Props = {
  images: ImageType[];
};

const ImageGallery = ({ images }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <ImageCard key={image.id} {...image} />
      ))}
    </div>
  );
};

export default ImageGallery;
