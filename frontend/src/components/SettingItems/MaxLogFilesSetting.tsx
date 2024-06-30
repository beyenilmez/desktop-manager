import {
  SettingsItem,
  SettingContent,
  SettingDescription,
  SettingLabel,
} from "../ui/settings-group";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { GetConfigField, SetConfigField } from "@/lib/config";
import { useStorage } from "@/contexts/storage-provider";

export function MaxLogFilesSetting() {
  const { t } = useTranslation();
  const { getValue, setValueIfUndefined } = useStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [maxLogFiles, setMaxLogFiles] = useState(-1);

  useEffect(() => {
    GetConfigField("MaxLogFiles").then((value) => {
      setMaxLogFiles(parseInt(value));
      setValueIfUndefined("initialMaxLogFiles", value);
      setIsLoading(false);
    });
  }, []);

  const handleMaxLogFilesChange = (textValue: string) => {
    const value = Math.max(1, Math.min(10000, parseInt(textValue)));
    const targetValue = isNaN(parseInt(textValue)) ? 20 : value;
    SetConfigField("MaxLogFiles", String(targetValue)).then(() => {
      setMaxLogFiles(value);
    });
  };

  return (
    <SettingsItem
      loading={isLoading}
      name="MaxLogFiles"
      initialValue={getValue("initialMaxLogFiles")}
      value={isNaN(maxLogFiles) ? "20" : String(maxLogFiles)}
    >
      <div>
        <SettingLabel>{t("settings.setting.max_log_files.label")}</SettingLabel>
        <SettingDescription>
          {t("settings.setting.max_log_files.description") +
            " (" +
            t("settings.restart_the_app_for_changes_to_take_effect") +
            ")"}
        </SettingDescription>
      </div>
      <SettingContent>
        <Input
          type="number"
          placeholder="20"
          value={maxLogFiles}
          onChange={(e) => handleMaxLogFilesChange(e.target.value)}
          min={1}
          max={10000}
        />
      </SettingContent>
    </SettingsItem>
  );
}
