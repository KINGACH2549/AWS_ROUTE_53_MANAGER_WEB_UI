"use client";
import { Globe, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteZone from "./DeleteZone";
import React from "react";

export function SettingsMenu({ zoneDetails }) {
  const [isMenuVisible, setMenuVisible] = React.useState(false);
  const nameServers = zoneDetails?.DelegationSet?.NameServers.map((server) => {
    return (
      <>
        <DropdownMenuItem>
          <span>{server}</span>
        </DropdownMenuItem>
      </>
    );
  });
  return (
    <DropdownMenu
    //   open={isMenuVisible}
    //   onOpenChange={(open) => {

    //     setMenuVisible(true);
    //   }}
    >
      <DropdownMenuTrigger asChild>
        <Button>Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Hosted Zone</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Globe className="mr-2 h-4 w-4" />
            <span>Edit Zone</span>
          </DropdownMenuItem>{" "}
          <DropdownMenuItem>
            <Globe className="mr-2 h-4 w-4" />
            {/* <span>Delete Zone</span> */}
            <DeleteZone zoneID={zoneDetails.HostedZone.Id} />
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Cloud className="mr-2 h-4 w-4" />
              <span>Name Servers</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>{nameServers}</DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
