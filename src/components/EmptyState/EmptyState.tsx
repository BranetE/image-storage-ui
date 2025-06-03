import { FileImage } from "lucide-react";
import useImages from "../../hooks/useImages";

const EmptyState = () => {
  const { searchQuery } = useImages();

  return (
    <div className="text-center py-12">
      <FileImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-600 mb-2">
        {searchQuery ? "No images found" : "No images yet"}
      </h3>
      <p className="text-gray-500">
        {searchQuery
          ? `No images match "${searchQuery}"`
          : "Upload some images to get started"}
      </p>
    </div>
  );
};

export default EmptyState;
