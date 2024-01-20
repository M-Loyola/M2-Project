import React, {createContext, useState} from 'react';

export const MyContext = createContext();

export const MyProvider = (props) => {
    const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState(null);

    return (
        <MyContext.Provider value={{ currentUserLoggedIn, setCurrentUserLoggedIn }}>
            {props.children}
        </MyContext.Provider>
    );
}