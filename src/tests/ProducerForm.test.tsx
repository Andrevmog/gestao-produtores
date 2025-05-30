import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ProducerForm } from '../components/organisms//ProducerForm/ProducerForm';
import { ProducersProvider } from '../contexts/ProducersContext';

describe('ProducerForm Component', () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<ProducersProvider>{ui}</ProducersProvider>);
  };

  test('renders the form with all fields', () => {
    renderWithProvider(<ProducerForm />);
    
    expect(screen.getByText('Cadastrar Produtor Rural')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de Documento:')).toBeInTheDocument();
    expect(screen.getByLabelText('Documento:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do Produtor:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome da Fazenda:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade:')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado:')).toBeInTheDocument();
    expect(screen.getByLabelText('Área Total (ha):')).toBeInTheDocument();
    expect(screen.getByLabelText('Área Agricultável (ha):')).toBeInTheDocument();
    expect(screen.getByLabelText('Área de Vegetação (ha):')).toBeInTheDocument();
  });

  test('validates document length based on document type', async () => {
    renderWithProvider(<ProducerForm />);
    const user = userEvent.setup();

    await user.selectOptions(screen.getByLabelText('Tipo de Documento:'), 'CPF');
    const docInput = screen.getByLabelText('Documento:');
    
    await user.type(docInput, '1234567890');
    fireEvent.blur(docInput);
    expect(screen.queryByText('Documento inválido')).toBeNull();

    await user.type(docInput, '1');
    fireEvent.blur(docInput);
    expect(screen.queryByText('Documento inválido')).toBeNull();

    // Test CNPJ validation
    await user.selectOptions(screen.getByLabelText('Tipo de Documento:'), 'CNPJ');
    await user.clear(docInput);
    await user.type(docInput, '1234567890123'); 
    fireEvent.blur(docInput);
    expect(screen.queryByText('Documento inválido')).toBeNull();

    await user.type(docInput, '1'); 
    fireEvent.blur(docInput);
    expect(screen.queryByText('Documento inválido')).toBeNull();
  });

  test('validates that arable + vegetation area does not exceed total area', async () => {
    renderWithProvider(<ProducerForm />);
    const user = userEvent.setup();

    const totalAreaInput = screen.getByLabelText('Área Total (ha):');
    const arableAreaInput = screen.getByLabelText('Área Agricultável (ha):');
    const vegetationAreaInput = screen.getByLabelText('Área de Vegetação (ha):');

    await user.type(totalAreaInput, '100');
    await user.type(arableAreaInput, '60');
    await user.type(vegetationAreaInput, '50');

    fireEvent.submit(screen.getByRole('button', { name: /Cadastrar Produtor/i }));
    
    await waitFor(() => {
      expect(screen.getByText('A soma das áreas agricultável e de vegetação não pode ser maior que a área total')).toBeInTheDocument();
    });
  });

  test('allows adding and removing crops', async () => {
    renderWithProvider(<ProducerForm />);
    const user = userEvent.setup();

    const cropTypeSelect = screen.getByRole('combobox', { name: '' });
    const harvestYearInput = screen.getByPlaceholderText('Ano da safra');
    const addButton = screen.getByRole('button', { name: /Adicionar/i });

    await user.selectOptions(cropTypeSelect, 'Soja');
    await user.type(harvestYearInput, '2023');
    await user.click(addButton);

    expect(screen.getByText('Soja - 2023')).toBeInTheDocument();

    await user.selectOptions(cropTypeSelect, 'Milho');
    await user.clear(harvestYearInput);
    await user.type(harvestYearInput, '2024');
    await user.click(addButton);

    expect(screen.getByText('Milho - 2024')).toBeInTheDocument();


    const removeButtons = screen.getAllByRole('button', { name: /Remover/i });
    await user.click(removeButtons[0]);

    expect(screen.queryByText('Soja - 2023')).not.toBeInTheDocument();
    expect(screen.getByText('Milho - 2024')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    const mockAddProducer = jest.fn();
    jest.mock('../../../contexts/ProducersContext', () => ({
      useProducers: () => ({
        addProducer: mockAddProducer,
      }),
    }));

    renderWithProvider(<ProducerForm />);
    const user = userEvent.setup();


    await user.selectOptions(screen.getByLabelText('Tipo de Documento:'), 'CPF');
    await user.type(screen.getByLabelText('Documento:'), '12345678901');
    await user.type(screen.getByLabelText('Nome do Produtor:'), 'João Agricultor');
    await user.type(screen.getByLabelText('Nome da Fazenda:'), 'Fazenda Feliz');
    await user.type(screen.getByLabelText('Cidade:'), 'Agrovila');
    await user.selectOptions(screen.getByLabelText('Estado:'), 'SP');
    await user.type(screen.getByLabelText('Área Total (ha):'), '100');
    await user.type(screen.getByLabelText('Área Agricultável (ha):'), '60');
    await user.type(screen.getByLabelText('Área de Vegetação (ha):'), '40');

   
    await user.selectOptions(screen.getByRole('combobox', { name: '' }), 'Soja');
    await user.type(screen.getByPlaceholderText('Ano da safra'), '2023');
    await user.click(screen.getByRole('button', { name: /Adicionar/i }));

    
    await user.click(screen.getByRole('button', { name: /Cadastrar Produtor/i }));

    await waitFor(() => {
      expect(mockAddProducer).toHaveBeenCalledWith({
        documentType: 'CPF',
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
              {
                type: 'Soja',
                harvestYear: '2023',
              },
            ],
          },
        ],
      });
    });
  });
});