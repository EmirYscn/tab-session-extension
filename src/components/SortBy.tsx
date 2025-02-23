import Select from "./Select";
import { useOptions } from "../contexts/options/optionsContextProvider";

import { ChangeEvent } from "../types/types";
import { setStoredOptions, SortTypes } from "../services/storage";

export type Options = {
  value: string;
  label: string;
};

function SortBy({ options }: { options: Options[] }) {
  const { options: storeOptions, setOptions } = useOptions();

  const sortBy = storeOptions.sort;

  function handleChange(e: ChangeEvent) {
    setOptions((prevOptions) => {
      const updatedOptions = {
        ...prevOptions,
        sort: e.target.value as SortTypes,
      };

      setStoredOptions(updatedOptions);
      return updatedOptions;
    });
  }

  return <Select options={options} value={sortBy} onChange={handleChange} />;
}

export default SortBy;
