export interface ImageType {
  url: string;
  name: string;
  id: string;
}

export interface ImageResponseType {
  imageName: string;
  imageData: string;
  contentType: string;
}

export interface ErrorMessageType {
  message: string
}

export interface ImagesContextType {
  images: ImageType[];
  setImages: (images: ImageType[]) => void;
  handleSearch: (e: React.FormEvent | React.MouseEvent) => Promise<void>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  error: string;
}

