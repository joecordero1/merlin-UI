// tests/components/ui-elements/InfoCard.test.tsx
import { render, screen } from '@testing-library/react'
import InfoCard from '@/pages/components/ui-elements/InfoCard'

describe('InfoCard', () => {
  it('muestra contenido correctamente', () => {
    render(<InfoCard title="Ventas" value="45" />)
    expect(screen.getByText(/ventas/i)).toBeInTheDocument()
    expect(screen.getByText("45")).toBeInTheDocument()
  })
})
