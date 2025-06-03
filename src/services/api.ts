import type { ImageItem } from "./types";
import { BASE_URL, BUCKET_NAME } from "../utils/constants";

// List all images (temporary mock)
export const fetchAllImages = async (): Promise<ImageItem[]> => {
  // Replace with actual API call when available
  return [
    {
      id: "1",
      name: "sample1.jpg",
      url: "https://via.placeholder.com/300x200?text=Sample+Image+1",
    },
    {
      id: "2",
      name: "sample2.jpg",
      url: "https://via.placeholder.com/300x200?text=Sample+Image+2",
    },
  ];
};

// Search images
export const searchImages = async (keyword: string): Promise<ImageItem[]> => {
  const response = await fetch(`${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const searchResults = await response.json();

  return searchResults.map((item: any, index: number) => ({
    id: item.id || `search-${index}`,
    name: item.name || item.filename || `image-${index}`,
    url: item.url || item.imageUrl || item.src,
  }));
};

// Upload image
export const uploadImage = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload/${BUCKET_NAME}/${file.name}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
};
