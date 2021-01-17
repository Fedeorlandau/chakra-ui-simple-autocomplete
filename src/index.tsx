import React, { useState, useRef } from 'react';
import { Box, Flex, Input, List, ListItem } from '@chakra-ui/react';
import { matchSorter } from 'match-sorter';
import { CheckCircleIcon, SmallAddIcon } from '@chakra-ui/icons';

export interface Option {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  options: Option[];
  result: Option[];
  setResult: (options: Option[]) => void;
  renderCheckIcon?: React.ReactNode;
  renderCreateIcon?: React.ReactNode
  placeholder?: string;
  colorScheme?: string;
  renderBadge: (option: Option) => React.ReactNode;
  inputName?: string;
  inputId?: string;
  bgHoverColor?: string;
  createText?: string;
}

export const Autocomplete = ({ options, result, setResult, placeholder, colorScheme, renderBadge, inputName, inputId, bgHoverColor, createText = "Create option", ...props }: AutocompleteProps) => {
  const [optionsCopy, setOptionsCopy] = useState<Option[]>(options);
  const [partialResult, setPartialResult] = useState<Option[]>();
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const filterOptions = (inputValue: string) => {
    if (inputValue) {
      setDisplayOptions(true);
      setPartialResult(matchSorter(optionsCopy, inputValue, { keys: ['label', 'value'] }));
      setInputValue(inputValue);
    } else {
      setDisplayOptions(false);
    }
  };

  const selectOption = (option: Option) => {
    if (result.includes(option)) {
      setResult([...result.filter((existingOption) => existingOption.value != option.value)]);
    } else {
      setResult([option, ...result]);
    }
  };

  const isOptionSelected = (option: Option) => {
    return result.filter((selectedOption) => selectedOption.value == option.value).length > 0;
  };

  const createOption = () => {
    if (inputValue) {
      const newOption: Option = {
        label: inputValue,
        value: inputValue,
      };
      setOptionsCopy([newOption, ...optionsCopy]);
      selectOption(newOption);
      setDisplayOptions(false);
      if (inputRef && inputRef.current !== null) {
        inputRef.current.value = '';
      }
    }
  };

  const renderCheckIcon = (option: Option) => {
    if (isOptionSelected(option)) {
      if(props.renderCheckIcon) {
        return props.renderCheckIcon;
      } else {
        return <CheckCircleIcon color="green.500" mr={2} />;
      }
    }
    return null;
  }

  const renderCreateIcon = () => {
    if(props.renderCreateIcon) {
      return props.renderCreateIcon;
    } else {
      return <SmallAddIcon color="green.500" mr={2} />;
    }
  }

  return (
    <Box data-testid="simple-autocomplete">
      {result.length > 0 && (
        <Box my={2} >
          {result.map((option) => <Box d="inline-block" onClick={() => selectOption(option)} key={option.value}> { renderBadge(option)} </Box>)}
        </Box>
      )}
      <Input
        name={inputName}
        id={inputId}
        placeholder={placeholder}
        onChange={(e) => filterOptions(e.currentTarget.value)}
        ref={inputRef}
      />
      {displayOptions && (
        <List
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          mt={2}
        >
          {partialResult?.map((option) => {
            return (
              <ListItem
                key={option.value}
                _hover={{ bg: bgHoverColor || 'gray.100' }}
                my={1}
                p={2}
                cursor="pointer"
                onClick={() => selectOption(option)}
              >
                <Flex align="center">
                  {renderCheckIcon(option)}
                  {option.label}
                </Flex>
              </ListItem>
            );
          })}
          {!partialResult?.length && (
            <ListItem _hover={{ bg: bgHoverColor || 'gray.100' }} my={1} p={2} cursor="pointer" data-testid="create-option" onClick={() => createOption()}>
              <Flex align="center">
                {renderCreateIcon()}
                {createText}
              </Flex>
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

