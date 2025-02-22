import { LuSunMedium } from "react-icons/lu";
import { AiFillMoon } from "react-icons/ai";

import Button from "./Button";
import { useOptions } from "../contexts/options/optionsContextProvider";
import { setStoredOptions } from "../services/storage";

function ToggleDarkMode() {
  const { options, setOptions } = useOptions();

  function handleToggle() {
    setOptions((prevOptions) => {
      const newOptions = {
        ...prevOptions,
        isDark: !prevOptions.isDark,
      };
      setStoredOptions(newOptions); // Save to Chrome storage
      return newOptions;
    });
  }

  return (
    <Button onClick={handleToggle}>
      {options.isDark ? <AiFillMoon /> : <LuSunMedium />}
    </Button>
  );
}

export default ToggleDarkMode;
