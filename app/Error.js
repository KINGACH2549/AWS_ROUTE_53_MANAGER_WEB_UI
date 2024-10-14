import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ErrorContext } from "./custom-hooks";
export default function Error({ children }) {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <>
      <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
        {children}
      </ErrorContext.Provider>
    </>
  );
}
