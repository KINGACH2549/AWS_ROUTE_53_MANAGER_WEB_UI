import { useState } from "react";
import { KeyManagementContext } from "./custom-hooks";

export default function KeyManagement({ children }) {
  const [showKeyPopOver, setShowKeyPopOver] = useState(false);

  return (
    <KeyManagementContext.Provider
      value={{ showKeyPopOver, setShowKeyPopOver }}
    >
      {children}
    </KeyManagementContext.Provider>
  );
}
