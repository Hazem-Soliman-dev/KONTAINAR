import React, { createContext, useState, useEffect } from 'react';
import config from './config';

// Create the context with an initial value
export const CustomizerContext = createContext(undefined);

// Create the provider component
export const CustomizerContextProvider = ({ children }) => {
  // Initialize state with localStorage values or config defaults
  const [activeDir, setActiveDir] = useState(() => {
    const saved = localStorage.getItem('kontainar-activeDir');
    return saved || config.activeDir;
  });
  const [activeMode, setActiveMode] = useState(() => {
    const saved = localStorage.getItem('kontainar-activeMode');
    return saved || config.activeMode;
  });
  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('kontainar-activeTheme');
    return saved || config.activeTheme;
  });
  const [activeLayout, setActiveLayout] = useState(() => {
    const saved = localStorage.getItem('kontainar-activeLayout');
    return saved || config.activeLayout;
  });
  const [isCardShadow, setIsCardShadow] = useState(() => {
    const saved = localStorage.getItem('kontainar-isCardShadow');
    return saved ? JSON.parse(saved) : config.isCardShadow;
  });
  const [isLayout, setIsLayout] = useState(() => {
    const saved = localStorage.getItem('kontainar-isLayout');
    return saved || config.isLayout;
  });
  const [isBorderRadius, setIsBorderRadius] = useState(() => {
    const saved = localStorage.getItem('kontainar-isBorderRadius');
    return saved ? JSON.parse(saved) : config.isBorderRadius;
  });
  const [isCollapse, setIsCollapse] = useState(() => {
    const saved = localStorage.getItem('kontainar-isCollapse');
    return saved || config.isCollapse;
  });
  const [isLanguage, setIsLanguage] = useState(() => {
    const saved = localStorage.getItem('kontainar-isLanguage');
    return saved || config.isLanguage;
  });
  const [isSidebarHover, setIsSidebarHover] = useState(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);

  // Save to localStorage whenever state changes - optimized
  useEffect(() => {
    localStorage.setItem('kontainar-activeDir', activeDir);
  }, [activeDir]);

  useEffect(() => {
    localStorage.setItem('kontainar-activeMode', activeMode);
  }, [activeMode]);

  useEffect(() => {
    localStorage.setItem('kontainar-activeTheme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    localStorage.setItem('kontainar-activeLayout', activeLayout);
  }, [activeLayout]);

  useEffect(() => {
    localStorage.setItem('kontainar-isCardShadow', JSON.stringify(isCardShadow));
  }, [isCardShadow]);

  useEffect(() => {
    localStorage.setItem('kontainar-isLayout', isLayout);
  }, [isLayout]);

  useEffect(() => {
    localStorage.setItem('kontainar-isBorderRadius', JSON.stringify(isBorderRadius));
  }, [isBorderRadius]);

  useEffect(() => {
    localStorage.setItem('kontainar-isCollapse', isCollapse);
  }, [isCollapse]);

  useEffect(() => {
    localStorage.setItem('kontainar-isLanguage', isLanguage);
  }, [isLanguage]);

  // Set attributes immediately
  useEffect(() => {
    document.documentElement.setAttribute('class', activeMode);
    document.documentElement.setAttribute('dir', activeDir);
    document.documentElement.setAttribute('data-color-theme', activeTheme);
    document.documentElement.setAttribute('data-layout', activeLayout);
    document.documentElement.setAttribute('data-boxed-layout', isLayout);
    document.documentElement.setAttribute('data-sidebar-type', isCollapse);
  }, [activeMode, activeDir, activeTheme, activeLayout, isLayout, isCollapse]);

  return (
    <CustomizerContext.Provider
      value={{
        activeDir,
        setActiveDir,
        activeMode,
        setActiveMode,
        activeTheme,
        setActiveTheme,
        activeLayout,
        setActiveLayout,
        isCardShadow,
        setIsCardShadow,
        isLayout,
        setIsLayout,
        isBorderRadius,
        setIsBorderRadius,
        isCollapse,
        setIsCollapse,
        isLanguage,
        setIsLanguage,
        isSidebarHover,
        setIsSidebarHover,
        isMobileSidebar,
        setIsMobileSidebar,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};
