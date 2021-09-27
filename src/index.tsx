import React, { useState, useRef, forwardRef } from 'react';
import {
  Badge,
  Box,
  Flex,
  Input,
  InputProps,
  List,
  ListItem,
} from '@chakra-ui/react';
import { matchSorter } from 'match-sorter';
import { CheckCircleIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';
import mergeRefs from 'react-merge-refs';

export type Option = {
  value: string;
  label: string;
  [key: string]: unknown;
};

export interface AutocompleteProps extends InputProps {
  /** Options to be displayed in the autocomplete */
  options: Option[];
  /** Result that gets populated with the selected options */
  result: Option[];
  /** Callback to set the result */
  setResult: (options: Option[]) => void;
  /** Render prop to customize the check icon */
  renderCheckIcon?: (option: Option) => React.ReactNode;
  /** Render prop to customize the create icon */
  renderCreateIcon?: (text?: string) => React.ReactNode;
  /** Input placeholder */
  placeholder?: string;
  /** Render prop to customize the badges */
  renderBadge?: (option: Option) => React.ReactNode;
  bgHoverColor?: string;
  allowCreation?: boolean;
  notFoundText?: string;
}

const defaultRenderCheckIcon = (option: Option) => {
  return <CheckCircleIcon color="green.500" data-label={option.label} mr={2} />;
};

const defaultCreateIcon = () => (
  <>
    <SmallAddIcon color="green.500" mr={2} />
    Create option
  </>
);

const defaultRenderBadge = (option: Option) => {
  return (
    <Badge
      borderRadius="full"
      px="2"
      colorScheme="teal"
      mx={1}
      cursor="pointer"
    >
      {option.label}
      <CloseIcon ml={1} w={2} h={2} mb="4px" />
    </Badge>
  );
};

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      options,
      result,
      setResult,
      bgHoverColor,
      allowCreation,
      notFoundText,
      renderBadge = defaultRenderBadge,
      renderCheckIcon = defaultRenderCheckIcon,
      renderCreateIcon = defaultCreateIcon,
      ...rest
    }: AutocompleteProps,
    ref
  ) => {
    const [optionsCopy, setOptionsCopy] = useState<Option[]>(options);
    const [partialResult, setPartialResult] = useState<Option[]>();
    const [displayOptions, setDisplayOptions] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);

    const filterOptions = (inputValue: string) => {
      if (inputValue) {
        setDisplayOptions(true);
        setPartialResult(
          matchSorter(optionsCopy, inputValue, { keys: ['label', 'value'] })
        );
        setInputValue(inputValue);
      } else {
        setDisplayOptions(false);
      }
    };

    const selectOption = (option: Option) => {
      if (result.includes(option)) {
        setResult([
          ...result.filter(
            (existingOption) => existingOption.value !== option.value
          ),
        ]);
      } else {
        setResult([option, ...result]);
      }
    };

    const isOptionSelected = (option: Option) => {
      return (
        result.filter((selectedOption) => selectedOption.value === option.value)
          .length > 0
      );
    };

    const createOption = () => {
      if (inputValue && allowCreation) {
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

    const selectOptionFromList = (option: Option) => {
      selectOption(option);
      setDisplayOptions(false);
      if (inputRef && inputRef.current !== null) {
        inputRef.current.value = '';
      }
    };

    const checkIcon = (option: Option) => {
      if (isOptionSelected(option)) {
        return renderCheckIcon(option);
      }
      return null;
    };

    return (
      <Box data-testid="simple-autocomplete">
        {result.length > 0 && (
          <Box my={2}>
            {result.map((option) => (
              <Box
                d="inline-block"
                onClick={() => selectOption(option)}
                key={option.value}
              >
                {renderBadge(option)}
              </Box>
            ))}
          </Box>
        )}
        <Input
          onChange={(e) => filterOptions(e.currentTarget.value)}
          ref={mergeRefs([inputRef, ref])}
          {...rest}
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
                  onClick={() => selectOptionFromList(option)}
                >
                  <Flex align="center">
                    {checkIcon(option)}
                    {option.label}
                  </Flex>
                </ListItem>
              );
            })}
            {!partialResult?.length && allowCreation && (
              <ListItem
                _hover={{ bg: bgHoverColor || 'gray.100' }}
                my={1}
                p={2}
                cursor="pointer"
                data-testid="create-option"
                onClick={() => createOption()}
              >
                <Flex align="center">{renderCreateIcon()}</Flex>
              </ListItem>
            )}
            {!partialResult?.length && !allowCreation && (
              <ListItem my={1} p={2} data-testid="not-found">
                <Flex align="center">{notFoundText}</Flex>
              </ListItem>
            )}
          </List>
        )}
      </Box>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

Autocomplete.defaultProps = {
  notFoundText: 'Not found',
  allowCreation: true,
};
