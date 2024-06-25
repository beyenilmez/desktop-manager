import { ThemeProvider } from "./contexts/theme-provider";
import ModeToggle from "@/components/ModeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TitleBar from "./components/TitleBar";
import Settings from "./components/Settings";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <ThemeProvider defaultTheme="system">
      <div className="flex flex-col h-dvh">
        <TitleBar />
        <Tabs defaultValue="packs" className="flex flex-col w-full h-full">
          <TabsList className="shadow-bottom-xs z-10 justify-between px-3 py-7 rounded-none w-full s">
            <div>
              <TabsTrigger value="packs">{t("nav.my_packs")}</TabsTrigger>
              <TabsTrigger value="edit">{t("nav.edit")}</TabsTrigger>
              <TabsTrigger value="settings">{t("nav.settings")}</TabsTrigger>
            </div>
            <ModeToggle />
          </TabsList>

          <TabsContent value="packs" className="w-ful h-full">
            View your packs here.
          </TabsContent>
          <TabsContent value="edit" className="w-ful h-full">
            Edit your packs here.
          </TabsContent>
          <TabsContent value="settings" className="w-ful h-full">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  );
}

export default App;
