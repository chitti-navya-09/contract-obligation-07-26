import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }){
  const [notificationCount, setNotificationCount] = useState(2);
  const [user, setUser] = useState({name:'Arjun Mehta', role:'Administrator', email:'arjun.mehta@contractiq.com'});
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme(){
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }

  return (
    <UIContext.Provider value={{ notificationCount, setNotificationCount, user, setUser, theme, toggleTheme }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI(){
  return useContext(UIContext);
}

export default UIContext;
