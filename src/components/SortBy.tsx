import styled from "styled-components";
import Select from "./Select";
import { ChangeEvent } from "../types/types";
import { useOptions } from "../contexts/options/optionsContextProvider";
import { setStoredOptions, SortTypes } from "../services/storage";

export type Options = {
  value: string;
  label: string;
};

const StyledSortBy = styled.div`
  align-self: flex-end;
`;

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

  return (
    <StyledSortBy>
      <Select options={options} value={sortBy} onChange={handleChange} />
    </StyledSortBy>
  );
}

export default SortBy;
