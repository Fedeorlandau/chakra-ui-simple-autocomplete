# Chakra UI Simple Autocomplete

A simple autocomplete input built with Chakra UI

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url]

## Demo
![demo](https://media.giphy.com/media/OMbcK9dsAEc5pAop1z/giphy.gif)

[Storybook](https://fedeorlandau.github.io/chakra-ui-simple-autocomplete)

[Typescript CodeSandbox](https://codesandbox.io/s/modest-shockley-ub3e50)

## Install
```bash
npm install chakra-ui-simple-autocomplete
```

## Usage
- Usage Example with TSX/Typescript

```tsx
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';

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
          placeholder="Autocomplete"
        />
      </Box>
  );
};
```

- Usage Example with TSX and Formik + Yup

```tsx
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete';
import { Badge, Box } from '@chakra-ui/react';

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
                placeholder="Autocomplete"
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
| renderBadge        | (option: Option) => React.ReactNode   |    No      | Renders each selected option                                                                          |
| renderCheckIcon        | (option: Option) => React.ReactNode   |    No      | Custom check icon |
| renderCreateIcon           | () => React.ReactNode | No      | Custom create icon                                                                                                                             |
| placeholder       | String | No      | Placeholder for the input                                                                                                       |
| colorScheme           | String |    No      | Color scheme to be applied on the input                           |
| bgHoverColor          | String   |   No       | Background color when hovering the options                                                    |
| allowCreation         | Boolean   |    No      |  Show the create new tag option. Default `true`                                                           |
| notFoundText         | String   |    No      | "Not found" text to be displayed if allowCreation is `false`.                                               |                                             

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