import { render } from '@testing-library/react';
import Historial from '@/pages/dashboards/historial';

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve([]) })
) as jest.Mock;

describe('Historial page', () => {
  it('renders without crashing', () => {
    render(<Historial />);
  });
});
