import { createContext, createRef } from "react";
import type { ImagesContextType } from "../services/types";

const INITIAL_VALUE: ImagesContextType = {
  images: [],
  setImages: () => {},
  handleSearch: async () => {},
  handleFileSelect: () => {},
  clearSearch: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  loading: false,
  uploading: false,
  fileInputRef: createRef<HTMLInputElement>(),
  error: "",
};

export const ImagesContext = createContext<ImagesContextType>(INITIAL_VALUE);
