import HeaderComponent from "./HeaderComponent";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export default function SearchDomain() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-gray-100 text-gray-700  py-4 lg:w-1/5 "
          // style={{ "box-shadow": "inset 0 4px 6px rgba(0, 0, 0, 0.1)" }}
          variant="outline"
        >
          Search Your Domains...
        </Button>
      </DialogTrigger>
      <HeaderComponent />
    </Dialog>
  );
}
