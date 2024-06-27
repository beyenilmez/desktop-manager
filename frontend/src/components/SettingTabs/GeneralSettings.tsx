import {
  SettingsGroup,
  SettingsItem,
  SettingContent,
  SettingDescription,
  SettingLabel,
} from "../ui/settings-group";
import { useTranslation } from "react-i18next";
import { Combobox } from "../ui/combobox";
import locales from "@/locales.json";
import { ThemeSetting } from "../SettingItems/ThemeSetting";
import { useSettings } from "@/contexts/settings-provider";

export function GeneralSettings() {
  const { t } = useTranslation();

  const { language, setLanguage, loading } = useSettings();

  return (
    <SettingsGroup className="flex flex-col items-start px-4 py-2 w-full h-full">
      <SettingsItem loading={loading}>
        <div>
          <SettingLabel>{t("settings.general.language.label")}</SettingLabel>
          <SettingDescription>
            {t("settings.general.language.description")}
          </SettingDescription>
        </div>
        <SettingContent>
          <Combobox
            initialValue={language}
            mandatory={true}
            elements={locales.locales.map((language) => ({
              value: language.code,
              label: language.name,
            }))}
            placeholder={t("settings.general.language.select_language")}
            searchPlaceholder={t("settings.general.language.search_language")}
            nothingFoundMessage={t(
              "settings.general.language.no_languages_found"
            )}
            onChange={(value) => setLanguage(value)}
          />
        </SettingContent>
      </SettingsItem>

      <ThemeSetting />
    </SettingsGroup>
  );
}
