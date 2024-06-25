import { GetConfigField, SetConfigField } from "wailsjs/go/main/App";
import {
  SettingsGroup,
  SettingsItem,
  SettingContent,
  SettingDescription,
  SettingLabel,
} from "../ui/settings-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function AdvancedSettings() {
  const { t } = useTranslation();

  const [enableLogging, setEnableLogging] = useState(false);
  const [enableTrace, setEnableTrace] = useState(false);
  const [enableDebug, setEnableDebug] = useState(false);
  const [enableInfo, setEnableInfo] = useState(false);
  const [enableWarn, setEnableWarn] = useState(false);
  const [enableError, setEnableError] = useState(false);
  const [enableFatal, setEnableFatal] = useState(false);

  useEffect(() => {
    GetConfigField("EnableLogging").then((value) => {
      setEnableLogging(value === "true");
    });

    GetConfigField("EnableTrace").then((value) => {
      setEnableTrace(value === "true");
    });

    GetConfigField("EnableDebug").then((value) => {
      setEnableDebug(value === "true");
    });

    GetConfigField("EnableInfo").then((value) => {
      setEnableInfo(value === "true");
    });

    GetConfigField("EnableWarn").then((value) => {
      setEnableWarn(value === "true");
    });

    GetConfigField("EnableError").then((value) => {
      setEnableError(value === "true");
    });

    GetConfigField("EnableFatal").then((value) => {
      setEnableFatal(value === "true");
    });
  }, []);

  return (
    <SettingsGroup className="flex flex-col items-start px-4 py-2 w-full h-full">
      <SettingsItem>
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
            onCheckedChange={() => {
              SetConfigField("EnableLogging", String(!enableLogging)).then(
                () => {
                  setEnableLogging(!enableLogging);
                }
              );
            }}
          />
        </SettingContent>
      </SettingsItem>

      <SettingsItem>
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
              onClick={() => {
                SetConfigField("EnableTrace", String(!enableTrace)).then(() => {
                  setEnableTrace(!enableTrace);
                });
              }}
            >
              Trace
            </ToggleGroupItem>

            <ToggleGroupItem
              value="debug"
              aria-label="Enable debug logging"
              onClick={() => {
                SetConfigField("EnableDebug", String(!enableDebug)).then(() => {
                  setEnableDebug(!enableDebug);
                });
              }}
            >
              Debug
            </ToggleGroupItem>

            <ToggleGroupItem
              value="info"
              aria-label="Enable info logging"
              onClick={() => {
                SetConfigField("EnableInfo", String(!enableInfo)).then(() => {
                  setEnableInfo(!enableInfo);
                });
              }}
            >
              Info
            </ToggleGroupItem>

            <ToggleGroupItem
              value="warn"
              aria-label="Enable warn logging"
              onClick={() => {
                SetConfigField("EnableWarn", String(!enableWarn)).then(() => {
                  setEnableWarn(!enableWarn);
                });
              }}
            >
              Warn
            </ToggleGroupItem>

            <ToggleGroupItem
              value="error"
              aria-label="Enable error logging"
              onClick={() => {
                SetConfigField("EnableError", String(!enableError)).then(() => {
                  setEnableError(!enableError);
                });
              }}
            >
              Error
            </ToggleGroupItem>

            <ToggleGroupItem
              value="fatal"
              aria-label="Enable fatal logging"
              onClick={() => {
                SetConfigField("EnableFatal", String(!enableFatal)).then(() => {
                  setEnableFatal(!enableFatal);
                });
              }}
            >
              Fatal
            </ToggleGroupItem>
          </ToggleGroup>
        </SettingContent>
      </SettingsItem>
    </SettingsGroup>
  );
}
