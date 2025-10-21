import { createContext, useContext } from "react";
import { useState } from "react";

const LoaderContext = createContext();



const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const loaderData = {
        isLoading,
        setIsLoading,
    };

    return (
        <LoaderContext.Provider value={loaderData}>
            {children}
        </LoaderContext.Provider>
    );
};

const useLoader = () => useContext(LoaderContext);



export { LoaderProvider, useLoader }