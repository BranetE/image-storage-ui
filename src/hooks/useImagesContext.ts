import { useContext } from "react";
import { ImagesContext } from "../context/ImagesContext";

export const useImagesContext = () => {
  const context = useContext(ImagesContext);
  return context;
};
