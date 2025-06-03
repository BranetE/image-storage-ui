import type { ImageItem } from "../../services/types"
import ImageCard from "../ImageCard/ImageCard"

const imageGallery = (images: ImageItem[]) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <ImageCard {...image}/>
            ))}
          </div>
    )
}

export default imageGallery