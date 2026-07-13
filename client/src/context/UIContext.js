import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }){
  const [notificationCount, setNotificationCount] = useState(2);
  const [user, setUser] = useState({name:'Arjun Mehta', role:'Administrator', email:'arjun.mehta@contractiq.com'});
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState({ visible: false, message: "" });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.full_name, role: data.role, email: data.email });
        }
      } catch (err) {
        // Fallback to default state
      }
    }
    loadUserProfile();
  }, []);

  function toggleTheme(){
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  }

  function showToast(message){
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 3000);
  }

  return (
    <UIContext.Provider value={{ 
      notificationCount, 
      setNotificationCount, 
      user, 
      setUser, 
      theme, 
      toggleTheme,
      toast,
      showToast
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI(){
  return useContext(UIContext);
}

export default UIContext;
