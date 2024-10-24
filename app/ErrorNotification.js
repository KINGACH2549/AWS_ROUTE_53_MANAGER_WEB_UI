import { useErrorNotification } from "./custom-hooks";
import { useToast } from "@/components/ui/use-toast";
import { ToastClose } from "@radix-ui/react-toast";
import { useEffect } from "react";
export default function ErrorNotification() {
  const { errorMessage, setErrorMessage } = useErrorNotification();
  const { toast } = useToast();

  useEffect(() => {
    if (errorMessage.length > 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! It doesn't look alright",
        description: errorMessage,
        duration: Infinity,
        // close: <ToastClose onClick={() => setErrorMessage("")}></ToastClose>,
      });
    }
  }, [errorMessage]);
  // if (errorMessage.length > 0) {
  //   toast({
  //     variant: "destructive",
  //     title: "Uh oh! It doesn't look alright",
  //     description: errorMessage,
  //     duration: Infinity,
  //     // close: <ToastClose onClick={() => setErrorMessage("")}></ToastClose>,
  //   });
  // }
  return <></>;
}
