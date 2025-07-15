import { render, screen } from '@testing-library/react';
import PredictionsTable, { Prediccion } from '@/pages/components/ui-elements/PredictionsTable';

const data: Prediccion[] = [
  { id: 1, fecha: '2025-06-01', participante: 'User A', premioSugerido: 'Premio 1' }
];

describe('PredictionsTable', () => {
  it('renders prediction rows', () => {
    render(<PredictionsTable predicciones={data} />);
    expect(screen.getByText('User A')).toBeInTheDocument();
  });
});
