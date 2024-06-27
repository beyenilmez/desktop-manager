import {
  GetConfigField,
  Log,
  SetConfigField,
  SetTheme,
} from "wailsjs/go/main/App";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStorage } from "./storage-provider";

type SettingsProviderProps = {
  children: React.ReactNode;
};

type SettingsProviderState = {
  loading: boolean;
  theme: string;
  setTheme: (theme: string) => void;
  useSystemTitleBar: boolean;
  setUseSystemTitleBar: (useSystemTitleBar: boolean) => void;
  enableLogging: boolean;
  setEnableLogging: (enableLogging: boolean) => void;
  enableTrace: boolean;
  setEnableTrace: (enableTrace: boolean) => void;
  enableDebug: boolean;
  setEnableDebug: (enableDebug: boolean) => void;
  enableInfo: boolean;
  setEnableInfo: (enableInfo: boolean) => void;
  enableWarn: boolean;
  setEnableWarn: (enableWarn: boolean) => void;
  enableError: boolean;
  setEnableError: (enableError: boolean) => void;
  enableFatal: boolean;
  setEnableFatal: (enableFatal: boolean) => void;
  maxLogFiles: number;
  setMaxLogFiles: (maxLogFiles: number) => void;
  language: string;
  setLanguage: (language: string) => void;
  windowStartState: number;
  setWindowStartState: (windowStartState: number) => void;
  windowScale: number;
  setWindowScale: (windowScale: number) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  windowEffect: number;
  setWindowEffect: (windowEffect: number) => void;
};

const initialState: SettingsProviderState = {
  loading: true,
  theme: "system",
  setTheme: () => null,
  useSystemTitleBar: false,
  setUseSystemTitleBar: () => null,
  enableLogging: true,
  setEnableLogging: () => null,
  enableTrace: false,
  setEnableTrace: () => null,
  enableDebug: false,
  setEnableDebug: () => null,
  enableInfo: true,
  setEnableInfo: () => null,
  enableWarn: true,
  setEnableWarn: () => null,
  enableError: true,
  setEnableError: () => null,
  enableFatal: true,
  setEnableFatal: () => null,
  maxLogFiles: 20,
  setMaxLogFiles: () => null,
  language: "en-US",
  setLanguage: () => null,
  windowStartState: 0,
  setWindowStartState: () => null,
  windowScale: 100,
  setWindowScale: () => null,
  opacity: 90,
  setOpacity: () => null,
  windowEffect: 0,
  setWindowEffect: () => null,
};

const SettingsProviderContext =
  createContext<SettingsProviderState>(initialState);

export function SettingsProvider({
  children,
  ...props
}: SettingsProviderProps) {
  const { getValue, setValue } = useStorage();

  const [loading, setLoadingState] = useState(true);

  const [theme, setThemeState] = useState("system");
  const [useSystemTitleBar, setUseSystemTitleBarState] = useState(false);
  const [enableLogging, setEnableLoggingState] = useState(true);
  const [enableTrace, setEnableTraceState] = useState(false);
  const [enableDebug, setEnableDebugState] = useState(false);
  const [enableInfo, setEnableInfoState] = useState(true);
  const [enableWarn, setEnableWarnState] = useState(true);
  const [enableError, setEnableErrorState] = useState(true);
  const [enableFatal, setEnableFatalState] = useState(true);
  const [maxLogFiles, setMaxLogFilesState] = useState(20);
  const [language, setLanguageState] = useState("en-US");
  const [windowStartState, setWindowStartStateState] = useState(0);
  const [windowScale, setWindowScaleState] = useState(100);
  const [opacity, setOpacityState] = useState(90);
  const [windowEffect, setWindowEffectState] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const theme = await GetConfigField("Theme");
        setThemeState(theme);

        const useSystemTitleBar = await GetConfigField("UseSystemTitleBar");
        setUseSystemTitleBarState(useSystemTitleBar === "true");

        const enableLogging = await GetConfigField("EnableLogging");
        setEnableLoggingState(enableLogging === "true");

        const enableTrace = await GetConfigField("EnableTrace");
        setEnableTraceState(enableTrace === "true");

        const enableDebug = await GetConfigField("EnableDebug");
        setEnableDebugState(enableDebug === "true");

        const enableInfo = await GetConfigField("EnableInfo");
        setEnableInfoState(enableInfo === "true");

        const enableWarn = await GetConfigField("EnableWarn");
        setEnableWarnState(enableWarn === "true");

        const enableError = await GetConfigField("EnableError");
        setEnableErrorState(enableError === "true");

        const enableFatal = await GetConfigField("EnableFatal");
        setEnableFatalState(enableFatal === "true");

        const maxLogFiles = await GetConfigField("MaxLogFiles");
        setMaxLogFilesState(Number(maxLogFiles));

        const language = await GetConfigField("Language");
        setLanguageState(language);

        const windowStartState = await GetConfigField("WindowStartState");
        setWindowStartStateState(Number(windowStartState));

        const windowScale = await GetConfigField("WindowScale");
        setWindowScaleState(Number(windowScale));

        const opacity = await GetConfigField("Opacity");
        setOpacityState(Number(opacity));

        const windowEffect = await GetConfigField("WindowEffect");
        setWindowEffectState(Number(windowEffect));
        if (getValue("initialWindowEffect") === undefined)
          setValue("initialWindowEffect", Number(windowEffect));

        setLoadingState(false);
      } catch (error) {
        Log("Failed to fetch settings", 4);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--opacity",
      String(
        (windowEffect === 1 || getValue("initialWindowEffect") === "1"
          ? 100
          : opacity) / 100
      )
    );
  }, [opacity, windowEffect]);

  const value = {
    loading,
    theme,
    setTheme: async (theme: string) => {
      try {
        setThemeState(theme);
        SetTheme?.(theme); // Optional chaining to avoid undefined errors
        await SetConfigField("Theme", theme);
      } catch (error) {
        Log("Failed to set theme", 4);
      }
    },
    useSystemTitleBar,
    setUseSystemTitleBar: async (useSystemTitleBar: boolean) => {
      try {
        setUseSystemTitleBarState(useSystemTitleBar);
        await SetConfigField("UseSystemTitleBar", useSystemTitleBar.toString());
      } catch (error) {
        Log("Failed to set useSystemTitleBar", 4);
      }
    },
    enableLogging,
    setEnableLogging: async (enableLogging: boolean) => {
      try {
        setEnableLoggingState(enableLogging);
        await SetConfigField("EnableLogging", enableLogging.toString());
      } catch (error) {
        Log("Failed to set enableLogging", 4);
      }
    },
    enableTrace,
    setEnableTrace: async (enableTrace: boolean) => {
      try {
        setEnableTraceState(enableTrace);
        await SetConfigField("EnableTrace", enableTrace.toString());
      } catch (error) {
        Log("Failed to set enableTrace", 4);
      }
    },
    enableDebug,
    setEnableDebug: async (enableDebug: boolean) => {
      try {
        setEnableDebugState(enableDebug);
        await SetConfigField("EnableDebug", enableDebug.toString());
      } catch (error) {
        Log("Failed to set enableDebug", 4);
      }
    },
    enableInfo,
    setEnableInfo: async (enableInfo: boolean) => {
      try {
        setEnableInfoState(enableInfo);
        await SetConfigField("EnableInfo", enableInfo.toString());
      } catch (error) {
        Log("Failed to set enableInfo", 4);
      }
    },
    enableWarn,
    setEnableWarn: async (enableWarn: boolean) => {
      try {
        setEnableWarnState(enableWarn);
        await SetConfigField("EnableWarn", enableWarn.toString());
      } catch (error) {
        Log("Failed to set enableWarn", 4);
      }
    },
    enableError,
    setEnableError: async (enableError: boolean) => {
      try {
        setEnableErrorState(enableError);
        await SetConfigField("EnableError", enableError.toString());
      } catch (error) {
        Log("Failed to set enableError", 4);
      }
    },
    enableFatal,
    setEnableFatal: async (enableFatal: boolean) => {
      try {
        setEnableFatalState(enableFatal);
        await SetConfigField("EnableFatal", enableFatal.toString());
      } catch (error) {
        Log("Failed to set enableFatal", 4);
      }
    },
    maxLogFiles,
    setMaxLogFiles: async (maxLogFiles: number) => {
      try {
        setMaxLogFilesState(maxLogFiles);
        await SetConfigField("MaxLogFiles", maxLogFiles.toString());
      } catch (error) {
        Log("Failed to set maxLogFiles", 4);
      }
    },
    language,
    setLanguage: async (language: string) => {
      try {
        setLanguageState(language);
        await SetConfigField("Language", language);
      } catch (error) {
        Log("Failed to set language", 4);
      }
    },
    windowStartState,
    setWindowStartState: async (windowStartState: number) => {
      try {
        setWindowStartStateState(windowStartState);
        await SetConfigField("WindowStartState", windowStartState.toString());
      } catch (error) {
        Log("Failed to set windowStartState", 4);
      }
    },
    windowScale,
    setWindowScale: async (windowScale: number) => {
      try {
        setWindowScaleState(windowScale);
        await SetConfigField("WindowScale", windowScale.toString());
      } catch (error) {
        Log("Failed to set windowScale", 4);
      }
    },
    opacity,
    setOpacity: async (opacity: number) => {
      try {
        setOpacityState(opacity);
        await SetConfigField("Opacity", opacity.toString());
      } catch (error) {
        Log("Failed to set opacity", 4);
      }
    },
    windowEffect,
    setWindowEffect: async (windowEffect: number) => {
      try {
        setWindowEffectState(windowEffect);
        await SetConfigField("WindowEffect", windowEffect.toString());
      } catch (error) {
        Log("Failed to set windowEffect", 4);
      }
    },
  };

  return (
    <SettingsProviderContext.Provider {...props} value={value}>
      {children}
    </SettingsProviderContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsProviderContext);

  if (context === undefined)
    throw new Error("useSettings must be used within a SettingsProvider");

  return context;
};
