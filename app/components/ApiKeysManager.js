"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import {
  ADD_API_KEYS,
  KEY_TYPE_ACCESS,
  KEY_TYPE_SECRET,
  REMOVE_API_KEYS,
} from "../Constant";
import { useKeyManagementContext } from "../custom-hooks";

export function PopoverDemo(props) {
  const { accessKeys, setAccessKeys, secretKeys, setSecretKeys } = props;
  const { showKeyPopOver, setShowKeyPopOver } = useKeyManagementContext();
  const handleApiKeys = (apiKeys, keyType) => {
    switch (keyType) {
      case KEY_TYPE_ACCESS:
        setAccessKeys(apiKeys);
        break;
      case KEY_TYPE_SECRET:
        setSecretKeys(apiKeys);
        break;
    }
  };
  const handleApiKeysInLocalStore = (operation) => {
    switch (operation) {
      case ADD_API_KEYS:
        localStorage.setItem("API_KEYS", accessKeys + "&&&" + secretKeys);
        break;
      case REMOVE_API_KEYS:
        if (localStorage.getItem("API_KEYS"))
          localStorage.removeItem("API_KEYS");
        setAccessKeys("");
        setSecretKeys("");
        break;
    }
  };
  return (
    <Popover
      open={showKeyPopOver}
      onOpenChange={(open) => {
        setShowKeyPopOver(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className="bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
          variant="outline"
        >
          Update API Keys
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <div className="grid gap-4">
          <div className="grid gap-6">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="access-key">Access Key</Label>
              <Input
                id="access-key"
                className="col-span-2 h-8"
                type="password"
                value={accessKeys}
                placeHolder="Your AWS Access Keys"
                onChange={(e) => handleApiKeys(e.target.value, KEY_TYPE_ACCESS)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="secret-key">Secret Key</Label>
              <Input
                id="secret-key"
                className="col-span-2 h-8"
                type="password"
                value={secretKeys}
                placeHolder="Your AWS Secret Keys"
                onChange={(e) => handleApiKeys(e.target.value, KEY_TYPE_SECRET)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Button
                className={`${
                  accessKeys.length > 0 && secretKeys.length > 0
                    ? "bg-green-800 text-white hover:bg-green-900 hover:text-white"
                    : "cursor-not-allowed bg-green-400 text-white hover:bg-gray-300 hover:text-white"
                }`}
                variant="outline"
                onClick={() => handleApiKeysInLocalStore(ADD_API_KEYS)}
              >
                Save
              </Button>

              <Button
                className="bg-red-800 text-white hover:bg-red-900 hover:text-white"
                variant="outline"
                onClick={() => handleApiKeysInLocalStore(REMOVE_API_KEYS)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
