import { createContext} from "react";

export const UnsplashContext = createContext();

export const UnsplashProvider = ({ children }) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  return (
    <UnsplashContext.Provider value={{ accessKey }}>
      {children}
    </UnsplashContext.Provider>
  );
};
