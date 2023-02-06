import { ThemeStore, UnsyncedUserSettingsStore, ThemeColorMap } from "./requiredModules.jsx";
import ShowNames from "..";
const PluginInstance = () => ShowNames.instance;
export const getBackgroundColor = () => {
  const ChatBackgroundColorMap = ThemeColorMap.CHAT_BACKGROUND;
  const {theme} = ThemeStore;
  const { useAMOLEDTheme } = UnsyncedUserSettingsStore
  switch(true) {
    case (theme == "dark" && useAMOLEDTheme !== 2):
      return  ChatBackgroundColorMap[0];
      case (theme == "dark" || useAMOLEDTheme == 2):
      return  ChatBackgroundColorMap[2];
      case (theme == "light"):
      return  ChatBackgroundColorMap[1];
  }
 
};
export const LightenDarkenColor = (color, amount) => {
  return `#${color
    .replace(/^#/, "")
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)}`.substr(-2),
    )}`;
};
export const makeColorVisible = (color, precent) => {
  const { theme } = ThemeStore;
  switch (theme) {
    case "light":
      return LightenDarkenColor(color, -precent);
    case "dark":
      return LightenDarkenColor(color, precent);
    default:
      PluginInstance().logger.error("Unknown theme detected. Contact the developer for help!");
  }
};
export const getDifference = (color1, color2) => {
  if (!color1 && !color2) return;
  color1 = color1.substring(1, 7);
  color2 = color2.substring(1, 7);
  const _r = parseInt(color1.substring(0, 2), 16);
  const _g = parseInt(color1.substring(2, 4), 16);
  const _b = parseInt(color1.substring(4, 6), 16);
  const __r = parseInt(color2.substring(0, 2), 16);
  const __g = parseInt(color2.substring(2, 4), 16);
  const __b = parseInt(color2.substring(4, 6), 16);
  const _p1 = (_r / 255) * 100;
  const _p2 = (_g / 255) * 100;
  const _p3 = (_b / 255) * 100;
  const perc1 = Math.round((_p1 + _p2 + _p3) / 3);
  const __p1 = (__r / 255) * 100;
  const __p2 = (__g / 255) * 100;
  const __p3 = (__b / 255) * 100;
  const perc2 = Math.round((__p1 + __p2 + __p3) / 3);
  return Math.abs(perc1 - perc2);
};
