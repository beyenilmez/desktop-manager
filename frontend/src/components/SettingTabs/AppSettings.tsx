import {
  SettingsGroup,
  SettingsItem,
  SettingContent,
  SettingDescription,
  SettingLabel,
} from "../ui/settings-group";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { Slider } from "../ui/my-slider";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ThemeSetting } from "../SettingItems/ThemeSetting";
import { useSettings } from "@/contexts/settings-provider";
import { useStorage } from "@/contexts/storage-provider";

export function AppSettings() {
  const { t } = useTranslation();

  const { getValue } = useStorage();

  const {
    loading,
    windowEffect,
    setWindowEffect,
    opacity,
    setOpacity,
    windowScale,
    setWindowScale,
    useSystemTitleBar,
    setUseSystemTitleBar,
  } = useSettings();

  return (
    <SettingsGroup className="flex flex-col items-start px-4 py-2 w-full h-full">
      <ThemeSetting />

      <SettingsItem loading={loading}>
        <div>
          <SettingLabel>
            {t("settings.application.window_effect.label")}
          </SettingLabel>
          <SettingDescription>
            {t("settings.application.window_effect.description") +
              " (" +
              t("settings.restart_the_app_for_changes_to_take_effect") +
              ")"}
          </SettingDescription>
        </div>
        <SettingContent>
          <ToggleGroup type="single" value={String(windowEffect)}>
            <ToggleGroupItem
              value="1"
              aria-label="No window effect"
              onClick={() => setWindowEffect(1)}
            >
              {t("settings.application.window_effect.none")}
            </ToggleGroupItem>

            <ToggleGroupItem
              value="0"
              aria-label="Auto window effect"
              onClick={() => setWindowEffect(0)}
            >
              {t("settings.application.window_effect.auto")}
            </ToggleGroupItem>

            <ToggleGroupItem
              value="2"
              aria-label="Mica window effect"
              onClick={() => setWindowEffect(2)}
            >
              {t("settings.application.window_effect.mica")}
            </ToggleGroupItem>

            <ToggleGroupItem
              value="3"
              aria-label="Acrylic window effect"
              onClick={() => setWindowEffect(3)}
            >
              {t("settings.application.window_effect.acrylic")}
            </ToggleGroupItem>

            <ToggleGroupItem
              value="4"
              aria-label="Tabbed window effect"
              onClick={() => setWindowEffect(4)}
            >
              {t("settings.application.window_effect.tabbed")}
            </ToggleGroupItem>
          </ToggleGroup>
        </SettingContent>
      </SettingsItem>

      <SettingsItem
        loading={loading}
        vertical={false}
        disabled={windowEffect === 1 || getValue("initialWindowEffect") === 1}
      >
        <div>
          <SettingLabel>
            {t("settings.application.window_opacity.label")}
          </SettingLabel>
          <SettingDescription>
            {t("settings.application.window_opacity.description")}
          </SettingDescription>
        </div>
        <SettingContent>
          <div className="flex gap-2">
            <div>50%</div>
            <Slider
              onValueChange={(value) => setOpacity(value[0])}
              defaultValue={[opacity]}
              min={50}
              max={100}
              step={1}
              className={"w-64 cursor-pointer"}
            />
            <div>100%</div>
            <div className="w-16 font-bold text-center">({opacity}%)</div>
          </div>
        </SettingContent>
      </SettingsItem>

      <SettingsItem loading={loading} vertical={false}>
        <div>
          <SettingLabel>
            {t("settings.application.window_scale.label")}
          </SettingLabel>
          <SettingDescription>
            {t("settings.application.window_scale.description")}
          </SettingDescription>
        </div>
        <SettingContent>
          <div className="flex gap-2">
            <div>50%</div>
            <Slider
              onValueChange={(value) => {
                setWindowScale(value[0]);
              }}
              onPointerUp={() => {
                document.documentElement.style.fontSize =
                  windowScale * (16 / 100) + "px";
              }}
              defaultValue={[windowScale]}
              min={50}
              max={150}
              step={10}
              className={"w-64 cursor-pointer"}
            />
            <div>150%</div>
            <div className="w-16 font-bold text-center">({windowScale}%)</div>
          </div>
        </SettingContent>
      </SettingsItem>

      <SettingsItem loading={loading}>
        <div>
          <SettingLabel>
            {t("settings.application.use_system_title_bar.label")}
          </SettingLabel>
          <SettingDescription>
            {t("settings.application.use_system_title_bar.description") +
              " (" +
              t("settings.restart_the_app_for_changes_to_take_effect") +
              ")"}
          </SettingDescription>
        </div>
        <SettingContent>
          <Switch
            checked={useSystemTitleBar}
            onCheckedChange={(value) => setUseSystemTitleBar(value)}
          />
        </SettingContent>
      </SettingsItem>
    </SettingsGroup>
  );
}
