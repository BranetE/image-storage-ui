import type { ImageResponseType, ImageType } from "./types";
import { BASE_URL, BUCKET_NAME } from "../utils/constants";

export const searchImages = async (keyword: string): Promise<ImageType[]> => {
  const response = await fetch(
    `${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const searchResults = await response.json();

  return searchResults.images.map(
    (image: ImageResponseType, index: number) => ({
      url: `data:${image.contentType};base64,${image.imageData}`,
      name: image.imageName,
      id: `${index}-${image.imageName}`,
    })
  );
};

export const uploadImage = async (file: File): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/upload/${BUCKET_NAME}/${file.name}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    }
  );

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
};
