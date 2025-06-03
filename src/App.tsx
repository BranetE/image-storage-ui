import Header from "./components/Header/Header";
import Controls from "./components/Controls/Controls";
import SearchBar from "./components/SearchBar/SearchBar";
import EmptyState from "./components/EmptyState/EmptyState";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import useImages from "./hooks/useImages";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import UploadButton from "./components/UploadButton/UploadButton";

const App: React.FC = () => {
  const { images, loading, error } = useImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Controls>
          <UploadButton />
          <SearchBar />
        </Controls>
        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}
        {!loading && images.length > 0 && <ImageGallery images={images} />}
        {!loading && images.length === 0 && <EmptyState />}I
      </div>
    </div>
  );
};

export default App;
