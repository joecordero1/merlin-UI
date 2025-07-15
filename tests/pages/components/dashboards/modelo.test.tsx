import { render } from '@testing-library/react';
import Modelo from '@/pages/dashboards/modelo';

describe('Modelo page', () => {
  it('renders without crashing', () => {
    render(<Modelo />);
  });
});
