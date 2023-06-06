import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);

  return (
    <AuthContext.Provider value={{ isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;