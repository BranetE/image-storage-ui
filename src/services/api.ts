import type { ImageType } from "./types";
import { BASE_URL, BUCKET_NAME } from "../utils/constants";
import {v4 as uuidv4} from 'uuid';

// List all images (temporary mock)
export const fetchAllImages = async (): Promise<ImageType[]> => {
  // Replace with actual API call when available
  return [];
};

// Search images
export const searchImages = async (keyword: string): Promise<ImageType[]> => {
  const response = await fetch(
    `${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  const searchResults = await response.json();

  return [];
};

// Upload image
export const uploadImage = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  const fileName = uuidv4();

  const response = await fetch(
    `${BASE_URL}/upload/${BUCKET_NAME}/${fileName}`,
    {
      method: "PUT",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
};
