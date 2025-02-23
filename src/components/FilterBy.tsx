import { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

import Button from "./Button";

import { useOptions } from "../contexts/options/optionsContextProvider";

const Wrapper = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input<{ $isDark?: boolean }>`
  padding: 0.5rem 0.6rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  width: 8rem;
  flex-grow: 1;

  background-color: ${(props) =>
    props.$isDark
      ? props.theme.colors.darkmode[100]
      : props.theme.colors.grey[800]};
  color: ${(props) =>
    props.$isDark ? props.theme.colors.darkmode[400] : "black"};

  box-shadow: ${(props) => props.theme.shadows.sm};
`;

type FilterByProps = {
  addSearchTag: (tag: string) => void;
};

function FilterBy({ addSearchTag }: FilterByProps) {
  const { options } = useOptions();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!inputValue) return;

    if (e.key === "Enter") {
      addSearchTag(inputValue);
      setInputValue("");
    } else if (e.key === "Escape") {
      setInputValue("");
    }
  }

  return (
    <Wrapper>
      {isOpen ? (
        <Input
          type="text"
          value={inputValue}
          placeholder="Search by tag"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          $isDark={options.isDark}
          onBlur={() => setIsOpen(false)}
          autoFocus
        />
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <IoSearch />
        </Button>
      )}
    </Wrapper>
  );
}

export default FilterBy;
