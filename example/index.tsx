import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Autocomplete, Option } from '../.';
import { Box, ChakraProvider } from '@chakra-ui/react';

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
          placeholder="Autocomplete"
        />
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
