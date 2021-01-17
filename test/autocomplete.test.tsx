import * as React from 'react'
import { Autocomplete, Option } from '../src';
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const options = [
  { value: 'javascript', label: 'Javascript' },
  { value: 'chakra', label: 'Chakra' },
  { value: 'react', label: 'React' },
  { value: 'css', label: 'CSS' },
];

const AutocompleteWrapper = () => {
  const [result, setResult] = React.useState<Option[]>([]);
  return (<Autocomplete 
    inputId="autocomplete-input" 
    options={options}
    renderBadge={(option: Option) => <div data-testid={`badge-${option.value}`}></div>}
    result={result}
    setResult={(options: Option[]) => {
      setResult(options);
    }} />)
}

describe('it', () => {
  it('renders the autocomplete input', () => {
    render(<AutocompleteWrapper/>);
    expect(screen.getByTestId('simple-autocomplete')).toBeTruthy()
  });

  it('renders the autocomplete input with a specific id', () => {
    const { container } = render(<AutocompleteWrapper/>);
    expect(container.querySelector('#autocomplete-input')).toBeTruthy()
  });

  it('should display a selected option', () => {
    const { container } = render(<AutocompleteWrapper/>);
    const input = container.querySelector('#autocomplete-input');
    if(input) {
      userEvent.type(input, 'Java')
      fireEvent.click(screen.getByText("Javascript"));
      expect(screen.getByTestId("badge-javascript")).toBeTruthy();
    }
  });

  it('should remove a selected option', () => {
    const { container } = render(<AutocompleteWrapper/>);
    const input = container.querySelector('#autocomplete-input');
    if(input) {
      userEvent.type(input, 'Java')
      fireEvent.click(screen.getByText("Javascript"));
      const badge = screen.getByTestId("badge-javascript")
      expect(badge).toBeTruthy();
      fireEvent.click(badge);
      const removedBadge = container.querySelector(`[data-testid="badge-javascript"]`)
      expect(removedBadge).toBeNull()
    }
  });

  it('should create a new option', () => {
    const { container } = render(<AutocompleteWrapper/>);
    const input = container.querySelector('#autocomplete-input');
    if(input) {
      userEvent.type(input, 'PHP')
      fireEvent.click(screen.getByTestId("create-option"));
      const badge = screen.getByTestId("badge-PHP")
      expect(badge).toBeTruthy();
    }
  });

  it('should persist a created option after unselect', () => {
    const { container } = render(<AutocompleteWrapper/>);
    const input = container.querySelector('#autocomplete-input');
    if(input) {
      userEvent.type(input, 'PHP');
      fireEvent.click(screen.getByTestId("create-option"));
      const badge = screen.getByTestId("badge-PHP")
      expect(badge).toBeTruthy();
      fireEvent.click(badge);
      const removedBadge = container.querySelector(`[data-testid="badge-PHP"]`);
      expect(removedBadge).toBeNull();
      userEvent.type(input, 'PH');
      fireEvent.click(screen.getByText("PHP"));
      expect(screen.getByTestId("badge-PHP")).toBeTruthy();
    }
  });
});
