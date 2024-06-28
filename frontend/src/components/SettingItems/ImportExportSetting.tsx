import {
  GetLoadConfigPath,
  ReadConfig,
  SaveConfigDialog,
} from "wailsjs/go/main/App";
import {
  SettingsItem,
  SettingContent,
  SettingDescription,
  SettingLabel,
} from "../ui/settings-group";
import { Button } from "../ui/button";
import { AreYouSureDialog, AreYouSureDialogRef } from "../ui/are-you-sure";
import { useRef, useState } from "react";
import { LogDebug, WindowReloadApp } from "wailsjs/runtime/runtime";
import { InitConfigCache } from "@/lib/config";
import { useTranslation } from "react-i18next";

export function ImportExportSetting() {
  const { t } = useTranslation();
  const dialogRef = useRef<AreYouSureDialogRef>(null);
  const [usePath, setUsePath] = useState("");

  return (
    <SettingsItem vertical={false}>
      <div>
        <SettingLabel>{t("settings.setting.import_export.label")}</SettingLabel>
        <SettingDescription>
          {t("settings.setting.import_export.description")}
        </SettingDescription>
      </div>
      <SettingContent>
        <div className="flex gap-0.5">
          <Button
            onClick={() => {
              GetLoadConfigPath().then((path) => {
                if (path !== "") {
                  setUsePath(path);
                  dialogRef.current?.openDialog();
                }
              });
            }}
          >
            {t("import")}
          </Button>
          <AreYouSureDialog
            ref={dialogRef}
            title={t("settings.are_you_sure_you_want_to_import_this_config")}
            cancelText={t("cancel")}
            acceptText={t("yes")}
            onAccept={() => {
              LogDebug("Attempting to read config from " + usePath);
              ReadConfig(usePath).then(() => {
                InitConfigCache().then(() => {
                  WindowReloadApp();
                });
              });
            }}
          />
          <Button onClick={() => SaveConfigDialog()}>{t("export")}</Button>
        </div>
      </SettingContent>
    </SettingsItem>
  );
}