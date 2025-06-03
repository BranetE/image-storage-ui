import { Loader2, Upload } from "lucide-react";
import useImages from "../../hooks/useImages";

const UploadButton = () => {
  const { uploading, handleFileSelect, fileInputRef } = useImages();

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        {uploading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Upload className="w-5 h-5" />
        )}
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default UploadButton;
