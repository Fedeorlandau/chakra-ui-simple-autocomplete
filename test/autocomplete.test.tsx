import * as React from 'react';
import { Autocomplete, Option } from '../src';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const options = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

interface AutocompleteWrapperProps {
  allowCreation?: boolean;
}

const AutocompleteWrapper = ({
  allowCreation = true,
}: AutocompleteWrapperProps) => {
  const [result, setResult] = React.useState<Option[]>([]);
  return (
    <Autocomplete
      id="autocomplete-input"
      options={options}
      renderBadge={(option: Option) => (
        <div data-testid={`badge-${option.value}`}></div>
      )}
      result={result}
      allowCreation={allowCreation}
      setResult={(options: Option[]) => {
        setResult(options);
      }}
    />
  );
};

const WithCustomCheckIcon = () => {
  const [result, setResult] = React.useState<Option[]>([]);
  return (
    <Autocomplete
      id="autocomplete-input"
      options={options}
      result={result}
      renderCheckIcon={(option) => (
        <div data-testid="custom-check-icon">{option.label}</div>
      )}
      setResult={(options: Option[]) => {
        setResult(options);
      }}
    />
  );
};

const WithCustomCreateIcon = () => {
  const [result, setResult] = React.useState<Option[]>([]);
  return (
    <Autocomplete
      id="autocomplete-input"
      options={options}
      result={result}
      renderCreateIcon={() => {
        return <div>Create now</div>;
      }}
      setResult={(options: Option[]) => {
        setResult(options);
      }}
    />
  );
};

const WithRef = () => {
  const [result, setResult] = React.useState<Option[]>([]);
  const [value, setValue] = React.useState<string>();
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div data-testid="ref-container">{value}</div>
      <Autocomplete
        id="autocomplete-input"
        options={options}
        result={result}
        setResult={(options: Option[]) => {
          setValue(ref?.current?.value);
          setResult(options);
        }}
        ref={ref}
      />
    </>
  );
};

describe('it', () => {
  it('renders the autocomplete input', () => {
    render(<AutocompleteWrapper />);
    expect(screen.getByTestId('simple-autocomplete')).toBeTruthy();
  });

  it('renders the autocomplete input with a specific id', () => {
    const { container } = render(<AutocompleteWrapper />);
    expect(container.querySelector('#autocomplete-input')).toBeTruthy();
  });

  it('should display a selected option', () => {
    const { container } = render(<AutocompleteWrapper />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'Java');
      fireEvent.click(screen.getByText('Javascript'));
      expect(screen.getByTestId('badge-javascript')).toBeTruthy();
    }
  });

  it('should remove a selected option', () => {
    const { container } = render(<AutocompleteWrapper />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'Java');
      fireEvent.click(screen.getByText('Javascript'));
      const badge = screen.getByTestId('badge-javascript');
      expect(badge).toBeTruthy();
      fireEvent.click(badge);
      const removedBadge = container.querySelector(
        `[data-testid="badge-javascript"]`
      );
      expect(removedBadge).toBeNull();
    }
  });

  it('should create a new option', () => {
    const { container } = render(<AutocompleteWrapper />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'PHP');
      fireEvent.click(screen.getByTestId('create-option'));
      const badge = screen.getByTestId('badge-PHP');
      expect(badge).toBeTruthy();
    }
  });

  it('should persist a created option after unselect', () => {
    const { container } = render(<AutocompleteWrapper />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'PHP');
      fireEvent.click(screen.getByTestId('create-option'));
      const badge = screen.getByTestId('badge-PHP');
      expect(badge).toBeTruthy();
      fireEvent.click(badge);
      const removedBadge = container.querySelector(`[data-testid="badge-PHP"]`);
      expect(removedBadge).toBeNull();
      userEvent.type(input, 'PH');
      fireEvent.click(screen.getByText('PHP'));
      expect(screen.getByTestId('badge-PHP')).toBeTruthy();
    }
  });

  it('should display Not found if no options are present', () => {
    const { container } = render(<AutocompleteWrapper allowCreation={false} />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'PHP');
      expect(screen.getByTestId('not-found')).toBeTruthy();
    }
  });

  it('should render a custom check icon', () => {
    const { container } = render(<WithCustomCheckIcon />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'Java');
      fireEvent.click(screen.getByText('Javascript'));
      userEvent.type(input, 'Java');
      expect(screen.getByTestId('custom-check-icon')).toBeTruthy();
    }
  });

  it('should render a custom create icon', () => {
    const { container } = render(<WithCustomCreateIcon />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'PHP');
      expect(screen.getByText('Create now')).toBeTruthy();
    }
  });

  it('should forward a ref into the input', () => {
    const { container } = render(<WithRef />);
    const input = container.querySelector('#autocomplete-input');
    if (input) {
      userEvent.type(input, 'Java');
      fireEvent.click(screen.getByText('Javascript'));
      expect(screen.getByText('Java')).toBeTruthy();
    }
  });
});
