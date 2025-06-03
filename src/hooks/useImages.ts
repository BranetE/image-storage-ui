import { useState, useEffect, useRef } from "react";
import { searchImages, handleFileUpload, loadAllImages } from "../services/api";
import type { ImageItem } from "../services/types";
const useImages = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setLoading(true)
    searchImages(searchQuery);
  };

  // Handle file selection from input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  // Clear search and show all images
  const clearSearch = () => {
    setSearchQuery('');
    loadAllImages();
  };

  // Load images on component mount
  useEffect(() => {
    loadAllImages();
  }, []);

  const loadAllImages = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Since you don't have a list endpoint, this is a placeholder
      // You'll need to implement a list endpoint or modify this based on your backend
      const mockImages: ImageItem[] = [
        {
          id: '1',
          name: 'sample1.jpg',
          url: 'https://via.placeholder.com/300x200?text=Sample+Image+1'
        },
        {
          id: '2',
          name: 'sample2.jpg',
          url: 'https://via.placeholder.com/300x200?text=Sample+Image+2'
        }
      ];
      
      setImages(mockImages);
    } catch (err) {
      setError('Failed to load images');
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search for images using the search endpoint
  const searchImages = async (keyword: string) => {
    if (!keyword.trim()) {
      loadAllImages();
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      
      const searchResults = await response.json();
      
      // Assuming the API returns an array of image objects
      // Adjust this based on your actual API response format
      const formattedImages: ImageItem[] = searchResults.map((item: any, index: number) => ({
        id: item.id || `search-${index}`,
        name: item.name || item.filename || `image-${index}`,
        url: item.url || item.imageUrl || item.src
      }));
      
      setImages(formattedImages);
    } catch (err) {
      setError('Search failed');
      console.error('Error searching images:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload using the upload endpoint
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${BASE_URL}/upload/${BUCKET_NAME}/${file.name}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      // Refresh the image list after successful upload
      if (searchQuery.trim()) {
        searchImages(searchQuery);
      } else {
        loadAllImages();
      }
      
    } catch (err) {
      setError('Upload failed');
      console.error('Error uploading file:', err);
    } finally {
      setUploading(false);
    }

  return {images, handleSearch, handleFileSelect, clearSearch, loading, uploading} as const
}
}

export default useImages;