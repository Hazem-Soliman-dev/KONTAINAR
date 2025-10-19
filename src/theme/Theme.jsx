import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import { CustomizerContext } from '../context/CustomizerContext';
import { useContext, useEffect, useMemo } from 'react';
import components from './Components.jsx';
import typography from './Typography.jsx';
import { shadows, darkshadows } from './Shadows.jsx';
import { DarkThemeColors } from './DarkThemeColors.jsx';
import { LightThemeColors } from './LightThemeColors.jsx';
import * as locales from '@mui/material/locale';
import { baseDarkTheme, baselightTheme } from './DefaultColors.jsx';

export const BuildTheme = (config = {}) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);

  const defaultTheme = config.activeMode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow = config.activeMode === 'dark' ? darkshadows : shadows;
  const themeSelect = config.activeMode === 'dark' ? darkthemeOptions : themeOptions;

  const baseMode = {
    palette: {
      mode: config.activeMode,
    },
    shape: {
      borderRadius: config.isBorderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales[config.isLanguage], themeSelect, {
      direction: config.direction,
    }),
  );
  theme.components = components(theme);
  return theme;
};

const ThemeSettings = () => {
  const { activeTheme, activeDir, activeMode, isBorderRadius, isLanguage } = useContext(CustomizerContext);

  const theme = useMemo(() => BuildTheme({
    direction: activeDir,
    theme: activeTheme,
    activeMode,
    isBorderRadius,
    isLanguage,
  }), [activeDir, activeTheme, activeMode, isBorderRadius, isLanguage]);
  
  useEffect(() => {
    document.dir = activeDir;
  }, [activeDir]);

  return theme;
};

export { ThemeSettings };
