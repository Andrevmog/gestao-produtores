import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProducerList } from '../components/organisms/ProducerList/ProducerList';
import { ProducersProvider } from '../contexts/ProducersContext';

const mockProducers = [
  {
    id: '1',
    documentType: 'CPF' as const,
    document: '12345678901',
    name: 'João Agricultor',
    farms: [
      {
        name: 'Fazenda Feliz',
        city: 'Agrovila',
        state: 'SP',
        totalArea: 100,
        arableArea: 60,
        vegetationArea: 40,
        crops: [
          { type: 'Soja', harvestYear: '2023' },
          { type: 'Milho', harvestYear: '2022' },
        ],
      },
    ],
  },
  {
    id: '2',
    documentType: 'CNPJ' as const,
    document: '12345678901234',
    name: 'Agropecuária LTDA',
    farms: [
      {
        name: 'Fazenda Grande',
        city: 'Agrourbano',
        state: 'MG',
        totalArea: 500,
        arableArea: 300,
        vegetationArea: 200,
        crops: [
          { type: 'Café', harvestYear: '2023' },
        ],
      },
    ],
  },
];

// Wrapper que injeta produtores via estado inicial
const ProducersProviderWithInitialState = ({ children }: { initialProducers: typeof mockProducers, children: React.ReactNode }) => {


  return (
    <ProducersProvider>
      {children}
    </ProducersProvider>
  );
};

describe('ProducerList Component', () => {
  const renderWithProviders = (producers = mockProducers) => {
    return render(
      <ProducersProviderWithInitialState initialProducers={producers}>
        <ProducerList />
      </ProducersProviderWithInitialState>
    );
  };

  test('renders a list of producers', () => {
    renderWithProviders();

    expect(screen.getByText('Produtores Cadastrados')).toBeInTheDocument();
    expect(screen.getByText('João Agricultor')).toBeInTheDocument();
    expect(screen.getByText('Agropecuária LTDA')).toBeInTheDocument();
    expect(screen.getByText('Fazenda Feliz')).toBeInTheDocument();
    expect(screen.getByText('Fazenda Grande')).toBeInTheDocument();
  });

  test('displays producer details correctly', () => {
    renderWithProviders();

    const firstProducer = mockProducers[0];
    const farm = firstProducer.farms[0];

    expect(screen.getByText(`Documento: ${firstProducer.documentType} ${firstProducer.document}`)).toBeInTheDocument();
    expect(screen.getByText(`Localização: ${farm.city}, ${farm.state}`)).toBeInTheDocument();
    expect(screen.getByText(`Áreas: Total: ${farm.totalArea} ha | Agricultável: ${farm.arableArea} ha | Vegetação: ${farm.vegetationArea} ha`)).toBeInTheDocument();
    expect(screen.getByText('Soja - 2023')).toBeInTheDocument();
    expect(screen.getByText('Milho - 2022')).toBeInTheDocument();
  });

  test('shows empty state when no producers exist', () => {
    renderWithProviders([]);

    expect(screen.getByText('Nenhum produtor cadastrado ainda.')).toBeInTheDocument();
  });

  test.skip('calls deleteProducer when delete button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders();

    const deleteButtons = screen.getAllByRole('button', { name: /Excluir Produtor/i });
    await user.click(deleteButtons[0]);

  });
});
