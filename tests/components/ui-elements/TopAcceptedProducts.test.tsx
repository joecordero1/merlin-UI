import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TopAcceptedProducts } from '@/pages/components/ui-elements/TopAcceptedProducts';

const mockData = Array.from({ length: 10 }, (_, i) => ({
  name: `Producto ${i + 1}`,
  suggestedCount: (i + 1) * 5,
  src: `/img${i + 1}.jpg`,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('TopAcceptedProducts', () => {
  it('renderiza y muestra productos correctamente', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockData) })
    ) as jest.Mock;

    render(<TopAcceptedProducts model="bert" />);

    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Sugerencias/).length).toBe(5); // Primeros 5
  });

  it('cambia el filtro a "Personalizado" y muestra inputs de fecha', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    ) as jest.Mock;

    render(<TopAcceptedProducts model="bert" />);

    // Abrir el dropdown
    const toggleButtons = screen.getAllByRole('button', { name: /Hoy/i });
    const toggleBtn = toggleButtons[0];

    fireEvent.click(toggleBtn);

    // Click en opción "Personalizado"
    const customOption = screen.getByText('Personalizado');
    fireEvent.click(customOption);

    // Espera a que se muestren inputs de fecha
    await waitFor(() => {
      expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
      expect(screen.getByLabelText('Fin')).toBeInTheDocument();
    });
  });

  it('maneja respuesta no válida (no es array)', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ error: 'Invalid' }) })
    ) as jest.Mock;

    render(<TopAcceptedProducts model="bert" />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Respuesta inesperada:', { error: 'Invalid' });
    });

    consoleError.mockRestore();
  });

  it('maneja error de red en fetch', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject('Network error')) as jest.Mock;

    render(<TopAcceptedProducts model="bert" />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error en fetch:', 'Network error');
    });

    consoleError.mockRestore();
  });
});
