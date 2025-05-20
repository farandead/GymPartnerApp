import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../../../utils/test-utils';
import { EmailScreen } from '../EmailScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('EmailScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderScreen = () => renderWithProviders(<EmailScreen />);

  it('renders correctly', () => {
    renderScreen();
    expect(screen.getByText('Can we get your email?')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('handles valid email input and navigates', () => {
    renderScreen();

    const { getByPlaceholderText, getByTestId } = renderScreen();
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    const continueButton = getByTestId('continue-button');

    // Button should be enabled
    expect(continueButton.props.accessibilityState.disabled).toBe(false);

    fireEvent.press(continueButton);
    expect(mockNavigate).toHaveBeenCalledWith('GymMode');
  });

  it('disables continue button with invalid email', () => {
    renderScreen();

    fireEvent.changeText(screen.getByPlaceholderText('Enter your email'), 'invalid-email');    const continueButton = screen.getByTestId('continue-button');

    expect(continueButton.props.accessibilityState.disabled).toBe(true);
  });

  it('allows skipping email input', () => {
    renderScreen();
    fireEvent.press(screen.getByText('Skip'));
    expect(mockNavigate).toHaveBeenCalledWith('GymMode');
  });
});
