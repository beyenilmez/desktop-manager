import {
  SettingsGroup,
  SettingsItem,
  SettingContent,
  SettingDescription,
  SettingLabel,
} from "../ui/settings-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "../ui/switch";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { useSettings } from "@/contexts/settings-provider";
import { useState } from "react";

export function AdvancedSettings() {
  const { t } = useTranslation();

  const {
    loading,
    enableLogging,
    setEnableLogging,
    enableTrace,
    setEnableTrace,
    enableDebug,
    setEnableDebug,
    enableInfo,
    setEnableInfo,
    enableWarn,
    setEnableWarn,
    enableError,
    setEnableError,
    enableFatal,
    setEnableFatal,
    maxLogFiles,
    setMaxLogFiles,
  } = useSettings();

  const [maxLogFilesState, setMaxLogFilesState] = useState(String(maxLogFiles));

  return (
    <SettingsGroup className="flex flex-col items-start px-4 py-2 w-full h-full">
      <SettingsItem loading={loading}>
        <div>
          <SettingLabel>{t("settings.advanced.logging.label")}</SettingLabel>
          <SettingDescription>
            {t("settings.advanced.logging.description") +
              " (" +
              t("settings.restart_the_app_for_changes_to_take_effect") +
              ")"}
          </SettingDescription>
        </div>
        <SettingContent>
          <Switch
            checked={enableLogging}
            onCheckedChange={() => setEnableLogging(!enableLogging)}
          />
        </SettingContent>
      </SettingsItem>

      <SettingsItem loading={loading}>
        <div>
          <SettingLabel>{t("settings.advanced.log_levels.label")}</SettingLabel>
          <SettingDescription>
            {t("settings.advanced.log_levels.description")}
          </SettingDescription>
        </div>
        <SettingContent>
          <ToggleGroup
            type="multiple"
            value={[
              enableTrace ? "trace" : "",
              enableDebug ? "debug" : "",
              enableInfo ? "info" : "",
              enableWarn ? "warn" : "",
              enableError ? "error" : "",
              enableFatal ? "fatal" : "",
            ]}
          >
            <ToggleGroupItem
              value="trace"
              aria-label="Enable trace logging"
              onClick={() => setEnableTrace(!enableTrace)}
            >
              Trace
            </ToggleGroupItem>

            <ToggleGroupItem
              value="debug"
              aria-label="Enable debug logging"
              onClick={() => setEnableDebug(!enableDebug)}
            >
              Debug
            </ToggleGroupItem>

            <ToggleGroupItem
              value="info"
              aria-label="Enable info logging"
              onClick={() => setEnableInfo(!enableInfo)}
            >
              Info
            </ToggleGroupItem>

            <ToggleGroupItem
              value="warn"
              aria-label="Enable warn logging"
              onClick={() => setEnableWarn(!enableWarn)}
            >
              Warn
            </ToggleGroupItem>

            <ToggleGroupItem
              value="error"
              aria-label="Enable error logging"
              onClick={() => setEnableError(!enableError)}
            >
              Error
            </ToggleGroupItem>

            <ToggleGroupItem
              value="fatal"
              aria-label="Enable fatal logging"
              onClick={() => setEnableFatal(!enableFatal)}
            >
              Fatal
            </ToggleGroupItem>
          </ToggleGroup>
        </SettingContent>
      </SettingsItem>

      <SettingsItem loading={loading}>
        <div>
          <SettingLabel>
            {t("settings.advanced.max_log_files.label")}
          </SettingLabel>
          <SettingDescription>
            {t("settings.advanced.max_log_files.description") +
              " (" +
              t("settings.restart_the_app_for_changes_to_take_effect") +
              ")"}
          </SettingDescription>
        </div>
        <SettingContent>
          <Input
            type="number"
            placeholder="20"
            value={maxLogFilesState}
            onChange={(e) => {

              if (isNaN(parseInt(e.target.value))) {
                setMaxLogFiles(20);
                setMaxLogFilesState("");
                return;
              }

              const value = Math.max(
                1,
                Math.min(10000, parseInt(e.target.value))
              );

              setMaxLogFiles(value);
              setMaxLogFilesState(String(value));
            }}
            min={1}
            max={10000}
          />
        </SettingContent>
      </SettingsItem>
    </SettingsGroup>
  );
}
