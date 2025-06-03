import { useState, useEffect, useRef } from "react";
import type { ImageItem } from "../services/types";
import { fetchAllImages, searchImages, uploadImage } from "../services/api";

const useImages = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!searchQuery.trim()) {
        const data = await fetchAllImages();
        setImages(data);
      } else {
        const data = await searchImages(searchQuery);
        setImages(data);
      }
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      setError('Please select a valid image file');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    loadAllImages();
  };

  const loadAllImages = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAllImages();
      setImages(data);
    } catch (err) {
      setError('Failed to load images');
      console.error('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setError('');
      await uploadImage(file);
      if (searchQuery.trim()) {
        const data = await searchImages(searchQuery);
        setImages(data);
      } else {
        const data = await fetchAllImages();
        setImages(data);
      }
    } catch (err) {
      setError('Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    loadAllImages();
  }, []);

  return {
    images,
    handleSearch,
    handleFileSelect,
    clearSearch,
    searchQuery,
    setSearchQuery,
    loading,
    uploading,
    fileInputRef,
    error,
  } as const;
};

export default useImages;
