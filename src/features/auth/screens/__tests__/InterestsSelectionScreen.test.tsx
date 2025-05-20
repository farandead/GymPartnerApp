import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../../../utils/test-utils';
import { InterestsSelectionScreen } from '../InterestsSelectionScreen';

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

describe('InterestsSelectionScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderScreen = () => renderWithProviders(<InterestsSelectionScreen />);

  it('renders correctly', () => {
    renderScreen();

    expect(screen.getByText("Choose 5 things you're really into")).toBeTruthy();
    expect(screen.getByPlaceholderText('What are you into?')).toBeTruthy();
    expect(screen.getByText('0/5 selected')).toBeTruthy();
  });

  it('allows searching for interests', () => {
    renderScreen();

    const searchInput = screen.getByPlaceholderText('What are you into?');
    fireEvent.changeText(searchInput, 'yoga');

    expect(screen.getByText('🧘')).toBeTruthy();
    expect(screen.getByText('Yoga')).toBeTruthy();
  });

  it('allows selecting up to 5 interests', () => {
    renderScreen();

    const interests = [
      'Yoga',
      'Running',
      'Boxing',
      'Swimming',
      'Basketball',
      'CrossFit',
    ];

    interests.forEach((label) => {
      const button = screen.queryByText(label);
      if (button) fireEvent.press(button);
    });

    expect(screen.getByText('5/5 selected')).toBeTruthy();
  });

  it('handles deselecting interests', () => {
    renderScreen();

    const interest = screen.getByText('Yoga');
    fireEvent.press(interest);
    expect(screen.getByText('1/5 selected')).toBeTruthy();

    fireEvent.press(interest);
    expect(screen.getByText('0/5 selected')).toBeTruthy();
  });

it('enables continue button when at least one interest is selected', () => {
  const { getByText, getByTestId } = renderScreen();
  const continueButton = getByTestId('continue-button');
  expect(continueButton.props.accessibilityState?.disabled).toBe(true);

  const interest = getByText('Yoga');
  fireEvent.press(interest);

  expect(continueButton.props.accessibilityState?.disabled).toBe(false);
});

it('navigates to PersonalQuestions screen on continue', () => {
  const { getByText, getByTestId } = renderScreen();
  fireEvent.press(getByText('Yoga'));
  fireEvent.press(getByTestId('continue-button'));

  expect(mockNavigate).toHaveBeenCalledWith('PersonalQuestions');
});;

  it('allows skipping interest selection', () => {
    renderScreen();

    fireEvent.press(screen.getByText('Skip'));
    expect(mockNavigate).toHaveBeenCalledWith('PersonalQuestions');
  });
});
