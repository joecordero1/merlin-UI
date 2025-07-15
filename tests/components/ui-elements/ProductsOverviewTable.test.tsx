import { render, screen } from '@testing-library/react';
import ProductsOverviewTable from '@/pages/components/ui-elements/ProductsOverviewTable';

const products = [{ id: 1, productName: 'Producto 1', imageUrl: '/image.jpg' }];

describe('ProductsOverviewTable', () => {
  it('renders product list', () => {
    render(<ProductsOverviewTable products={products} onDeleteProduct={jest.fn()} />);
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
  });
});
