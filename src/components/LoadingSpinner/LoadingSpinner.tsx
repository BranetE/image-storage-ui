import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading images...</span>
    </div>
  );
};

export default LoadingSpinner;
