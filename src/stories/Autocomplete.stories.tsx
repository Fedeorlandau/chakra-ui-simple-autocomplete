import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChakraProvider } from '@chakra-ui/react';
import { Autocomplete, Option } from '..';

const defaultOptions = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

export default {
  title: 'Autocomplete',
  component: Autocomplete,
  argTypes: {},
} as ComponentMeta<typeof Autocomplete>;

const Template: ComponentStory<typeof Autocomplete> = () => {
  const [selectedOptions, setSelectedOptions] = React.useState<Option[]>([]);
  return (
    <ChakraProvider>
      <Autocomplete
        options={defaultOptions}
        result={selectedOptions}
        setResult={(result: Option[]) => {
          setSelectedOptions(result);
        }}
      />
    </ChakraProvider>
  );
};

export const Primary = Template.bind({});
