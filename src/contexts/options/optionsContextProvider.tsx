import React, { useContext, useEffect, useState } from "react";
import { getStoredOptions, LocalStorageOptions } from "../../services/storage";
import { OptionsContext } from "./optionsContext";

// Provider Component

export function OptionsProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<LocalStorageOptions>({
    isDark: false,
  });

  // Load options from Chrome storage when the component mounts
  useEffect(() => {
    async function fetchOptions() {
      const storedOptions = await getStoredOptions();
      setOptions(storedOptions);
    }
    fetchOptions();

    // Listen for changes in Chrome storage and update state
    // chrome.storage.onChanged.addListener((changes, areaName) => {
    //   if (areaName === "local" && changes.options) {
    //     setOptions(changes.options.newValue);
    //   }
    // });

    // Cleanup listener on unmount
    // return () => {
    //   chrome.storage.onChanged.removeListener(() => {});
    // };
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
