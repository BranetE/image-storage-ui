import { useMemo, useRef, useState } from "react";
import { ImagesContext } from "./ImagesContext";
import { searchImages, uploadImage } from "../services/api";
import type { ImageType } from "../services/types";

const ImagesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchImages(searchQuery);
      setImages(data);
    } catch (err) {
      setError(`Search failed: ${err}`);
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    } else {
      setError("Please select a valid image file");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setImages([])
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setError("");
      await uploadImage(file);
      if (searchQuery.trim()) {
        const data = await searchImages(searchQuery);
        setImages(data);
      }
    } catch (err) {
      setError(`Upload failed: ${err}`);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const value = useMemo(
    () => ({
      images,
      setImages,
      handleSearch,
      handleFileSelect,
      clearSearch,
      searchQuery,
      setSearchQuery,
      loading,
      uploading,
      fileInputRef,
      error,
    }),
    [images, searchQuery, loading, uploading, error]
  );
  return (
    <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>
  );
};

export default ImagesContextProvider;
