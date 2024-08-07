import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBarView2 from '../components/SearchBarView2';

describe('SearchBarView2 Component', () => {
  test('renders correctly', () => {
    render(<SearchBarView2 onFetchWeather={jest.fn()} />);

    expect(screen.getByPlaceholderText('Enter city')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('handles user input and submit', () => {
    const mockFetchWeather = jest.fn();
    render(<SearchBarView2 onFetchWeather={mockFetchWeather} />);

    const input = screen.getByPlaceholderText('Enter city');
    const button = screen.getByText('Search');

    // Simulate user typing
    fireEvent.change(input, { target: { value: 'New York' } });
    expect(input.value).toBe('New York');

    // Simulate form submission
    fireEvent.click(button);
    expect(mockFetchWeather).toHaveBeenCalledWith('New York');
  });
});