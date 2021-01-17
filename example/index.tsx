import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Autocomplete, Option } from '../.';
import { Badge, Box, ChakraProvider } from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, SmallAddIcon } from '@chakra-ui/icons';

const options = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

const App = () => {
  const [result, setResult] = React.useState<Option[]>([]);

  return (
    <ChakraProvider>
      <Box maxW="md">
        <Autocomplete
          options={options}
          result={result}
          setResult={(options: Option[]) => {
            setResult(options);
          }}
          renderCheckIcon={<CheckCircleIcon color="green.500" mr={2} />}
          placeholder="Autocomplete"
          renderBadge={(option: Option) => (
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
          )}
          renderCreateIcon={<SmallAddIcon color="green.500" mr={2} />}
          createText="Create new option"
        />
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
