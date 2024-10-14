import { useErrorNotification } from "./custom-hooks";
import { useToast } from "@/components/ui/use-toast";
import { ToastClose } from "@radix-ui/react-toast";
export default function ErrorNotification({ children }) {
  const { errorMessage, setErrorMessage } = useErrorNotification();
  const { toast } = useToast();
  if (errorMessage.length > 0) {
    toast({
      variant: "destructive",
      title: "Uh oh! It doesn't look alright",
      description: errorMessage,
      duration: Infinity,
      close: <ToastClose onClick={() => setErrorMessage("")}></ToastClose>,
    });
  }
  return <>{children}</>;
}
