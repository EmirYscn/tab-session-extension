import styled from "styled-components";
import { Options } from "./SortBy";
import { useOptions } from "../contexts/options/optionsContextProvider";
import { ChangeEvent } from "../types/types";
import { SortTypes } from "../services/storage";

const StyledSelect = styled.select<{ $isDark?: boolean }>`
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[200]
      : props.theme.colors.grey[900]};
  color: ${(props) =>
    props.$isDark ? props.theme.colors.darkmode[400] : "black"};
  font-weight: 500;
  box-shadow: ${(props) => props.theme.shadows.sm};

  &:active {
    border: none;
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

type SelectProps = {
  options: Options[];
  value?: SortTypes;
  onChange: (e: ChangeEvent) => void;
};

function Select({ options, onChange, value }: SelectProps) {
  const { options: storeOptions } = useOptions();
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      $isDark={storeOptions.isDark}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
