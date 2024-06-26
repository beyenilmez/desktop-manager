import { useEffect, useState } from "react";
import { useProfile } from "@/contexts/profile-provider";
import { GetProfiles, GetProfile, SyncDesktop, RemoveProfile, RunProfile } from "wailsjs/go/main/App";
import { Button } from "./ui/button";
import { Combobox } from "./ui/combobox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RefreshCw, Play, Plus, Pause } from 'lucide-react';
import { ModeToggle } from "./mode-toggle"
import { CreateProfileForm } from "./CreateProfileForm"

import { /* profile as profStruct, */ profileInfo, fileInfo } from "@/structs";
import React from "react";

const TopBar = () => {
    const { profile, setProfile } = useProfile();
    const [running, setRunning] = useState(false);

    const [profiles, setProfiles] = useState<profileInfo[]>([]);

    useEffect(() => {
        GetProfilesF();
    }, [])

    const GetProfilesF = () => {
        GetProfiles().then((res) => setProfiles(res));
    }

    const onProfileChange = (profileName: string) => {
        GetProfile(profileName).then((res) => {
            setProfile(res);
        });
    }

    return (
        <div className="top-0 z-50 sticky flex justify-between bg-muted shadow-sm p-2 border-b w-full">
            <div className="flex items-center space-x-2">
                <Combobox placeholder="Select a profile" noElementsText="No profile found" searchBar={false}
                    elements={profiles}
                    onChange={(value) => onProfileChange(value)}
                    onExpand={() => GetProfilesF()}
                    onElementContextMenu={(value) => console.log("Context: " + value)}
                />
                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline" size={"icon"} title="Create Profile">
                            <Plus />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <CreateProfileForm />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex items-center space-x-2">
                {profile.name && (
                    <React.Fragment>
                        <Button variant="destructive" size={"lg"} className="space-x-2" onClick={() => {
                            RemoveProfile(profile.name);
                            setProfile({ name: "", id: "", value: [] })
                        }}>
                            Remove Profile
                        </Button>
                        <Button variant="outline" size={"lg"} className="space-x-2"
                         onClick={() => {
                            SyncDesktop(profile.name, true).then((profile) => setProfile(profile));
                        }}>
                            <RefreshCw />
                            <div>
                                Get Desktop
                            </div>
                        </Button>
                        <Button variant="outline" size={"icon"} disabled={running} title="Run Profile"
                         onClick={() => {
                            const fileInfos: fileInfo[] = profile.value;

                            setRunning(true);
                            RunProfile(profile.name, fileInfos).then(() => setRunning(false));
                        }}>
                            <Play className={running ? "hidden" : ""}  />
                            <Pause className={running ? "" : "hidden"} />
                        </Button>
                    </React.Fragment>
                )}

                <ModeToggle />
            </div>
        </div>
    )
}

export default TopBar;