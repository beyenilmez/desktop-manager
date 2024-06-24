import { Minimize, Maximize, Quit } from "wailsjs/go/main/App";
import { Minus, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import icon from "../assets/appicon.png";

export default function TitleBar() {
  return (
    <header className="flex justify-between items-center bg-muted pl-3 w-full h-8 wails-drag">
      <h1 className="flex gap-1 mt-2.5 font-semibold select-none">
        <img src={icon} className="w-6 h-6" />
        {document.title}
      </h1>
      <div className="wails-nodrag">
        <Button size={"icon"} onClick={() => Minimize()} variant={"ghost"} className="hover:dark:brightness-150 hover:brightness-75 rounded-none cursor-default">
          <Minus size={'1rem'} />
        </Button>
        <Button size={"icon"} onClick={() => Maximize()} variant={"ghost"} className="hover:dark:brightness-150 hover:brightness-75 rounded-none cursor-default">
          <Copy size={'1rem'} className="rotate-90" />
        </Button>
        <Button size={"icon"} onClick={() => Quit()} variant={"ghost"} className="hover:bg-destructive rounded-none cursor-default">
          <X size={'1rem'}  />
        </Button>
      </div>
    </header>
  );
}

