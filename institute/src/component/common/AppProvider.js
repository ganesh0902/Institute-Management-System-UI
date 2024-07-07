import React, { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    // Define the method you want to share
    const getUserInformation = (user) => {
        console.log("User Information", user);
        setUserInfo(user);
    };

    return (
        <AppContext.Provider value={{ getUserInformation, userInfo }}>
            {children}
        </AppContext.Provider>
    );
};

// Create a custom hook for consuming the context
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };
