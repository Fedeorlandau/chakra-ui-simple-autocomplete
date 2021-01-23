# Chakra UI Simple Autocomplete

A simple autocomplete input built with Chakra UI

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]

## Demo
![demo](https://media.giphy.com/media/OMbcK9dsAEc5pAop1z/giphy.gif)

[Typescript CodeSandbox](https://codesandbox.io/s/chakra-ui-simple-autocomplete-cvj92?file=/src/App.tsx)

[Javascript CodeSandbox](https://codesandbox.io/s/chakra-ui-simple-autocomplete-js-lu10n?file=/src/App.js)

## Install
```bash
npm install chakra-ui-simple-autocomplete
```

## Usage
- Usage Example with TSX/Typescript

```tsx
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
import { Badge, Box } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';

const options = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

const AutocompleteWrapper = () => {
  const [result, setResult] = React.useState<Option[]>([]);

  return (
      <Box maxW="md">
        <Autocomplete
          options={options}
          result={result}
          setResult={(options: Option[]) => setResult(options)}
          renderCheckIcon={<CheckCircleIcon color="green.500" mr={2}/>}
          placeholder="Autocomplete"
          renderBadge={(option: Option) => <Badge
            borderRadius="full"
            px="2"
            colorScheme="teal"
            mx={1}
            cursor="pointer"
          >
            {option.label}
            <CloseIcon ml={1} w={2} h={2} mb="4px" />
          </Badge>}
          renderCreateIcon={<SmallAddIcon color="green.500" mr={2}/>}
          createText="Create new option"
        />
      </Box>
  );
};
```

- Usage Example with TSX and Formik + Yup

```tsx
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
import { Badge, Box } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';

const options = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

const autocompleteSchema = Yup.object().shape({
  tags: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string(),
      }),
    )
    .min(1),
});

const AutocompleteWrapper = () => {
  const [result, setResult] = React.useState<Option[]>([]);

  return (
    <Formik
      validationSchema={autocompleteSchema}
      initialValues={{ tags: [] }}
      onSubmit={(values) => {
        console.log(values)
      }}>
      {(props) => (
        <Box maxW="md">
          <Field name="tags">
            {({ field, form }: FieldProps) => (
              <Autocomplete
                options={options}
                result={result}
                setResult={(options: Option[]) => {
                  form.setFieldValue('tags', options);
                  setResult(options);
                }}
                renderCheckIcon={<CheckCircleIcon color="green.500" mr={2}/>}
                placeholder="Autocomplete"
                renderBadge={(option: Option) => <Badge
                  borderRadius="full"
                  px="2"
                  colorScheme="teal"
                  mx={1}
                  cursor="pointer"
                >
                  {option.label}
                  <CloseIcon ml={1} w={2} h={2} mb="4px" />
                </Badge>}
                renderCreateIcon={<SmallAddIcon color="green.500" mr={2}/>}
                createText="Create new option"
              />
            )}
          </Field>
        </Box>
      )}
    </Formik>
  );
};
```

## Props


| Property               | Type     | Required | Description                                                                                                                                                     |
| ---------------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                  | Option[]    | Yes      | An array of Option to render on the autocomplete                                                                                                      |
| result            | Option[]   |     Yes     |State where the selected options are going to be stored                                                                                                                              |
| setResult                  | (options: Option[]) => void   | Yes      | Callback to be triggered everytime the we add/remove an option from the result                                                                                                              |
| renderBadge        | (option: Option) => React.ReactNode   |    Yes      | Renders each selected option                                                                          |
| renderCheckIcon        | React.ReactNode   |    No      | Custom check icon |
| renderCreateIcon           | React.ReactNode | No      | Custom create icon                                                                                                                             |
| placeholder       | String | No      | Placeholder for the input                                                                                                       |
| colorScheme           | String |    No      | Color scheme to be applied on the input                           |
| inputName        | String   |    No      | Input name                                                                     |
| inputId | String   |     No     | Input id                                                     |
| bgHoverColor          | String   |   No       | Background color when hovering the options                                                    |
| createText         | String   |    No      | "Create new option" text                                                           |
| allowCreation         | Boolean   |    No      |  Show the create new tag option. Default `true`                                                           |
| notFoundText         | String   |    No      | "Not found" text to be displayed if allowCreation is `false`.                                                          |


## :hammer_and_wrench: Support

Please [open an issue](https://github.com/leonard-henriquez/readme-boilerplate/issues/new) for support.

## :memo: Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/leonard-henriquez/readme-boilerplate/compare/).

## :scroll: License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[downloads-image]: https://img.shields.io/npm/dt/chakra-ui-simple-autocomplete.svg

[npm-url]: https://www.npmjs.com/package/chakra-ui-simple-autocomplete
[npm-image]: http://img.shields.io/npm/v/chakra-ui-simple-autocomplete.svg

[travis-url]: https://travis-ci.org/Fedeorlandau/chakra-ui-simple-autocomplete
[travis-image]: https://travis-ci.org/Fedeorlandau/chakra-ui-simple-autocomplete.svg