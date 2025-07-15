import { render, screen } from '@testing-library/react';
import { Predictions } from '@/pages/components/ui-elements/predictions';

jest.mock('react-apexcharts', () => () => <div data-testid="mock-apexchart">Mock Chart</div>);

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ values: [1, 2], labels: ['A', 'B'] }) })
) as jest.Mock;

describe('Predictions', () => {
  it('renders buttons and chart', async () => {
    render(<Predictions model="bert" />);
    expect(await screen.findByText(/Hoy/i)).toBeInTheDocument();
  });
});
