import React, { useContext, useEffect, useState } from "react";
import {
  defaultOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../../services/storage";
import { OptionsContext } from "./optionsContext";

// Provider Component

export function OptionsProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<LocalStorageOptions>(defaultOptions);

  // Load options from Chrome storage when the component mounts
  useEffect(() => {
    async function fetchOptions() {
      const storedOptions = await getStoredOptions();
      setOptions(storedOptions);
    }
    fetchOptions();
  }, []);

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionsContext.Provider>
  );
}

// Hook to use the context
export function useOptions() {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
}
