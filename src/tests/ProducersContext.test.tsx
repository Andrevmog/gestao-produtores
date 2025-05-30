import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProducersProvider, useProducers } from '../contexts/ProducersContext';

const TestComponent = () => {
  const { producers, addProducer, deleteProducer } = useProducers();
  
  return (
    <div>
      <button onClick={() => addProducer({
        documentType: 'CPF',
        document: '12345678901',
        name: 'Test Producer',
        farms: []
      })}>Add Producer</button>
      
      <button onClick={() => deleteProducer('1')}>Delete Producer</button>
      
      <div data-testid="producers-count">{producers.length}</div>
      {producers.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
};

describe('ProducersContext', () => {
  test('adds a new producer', async () => {
    render(
      <ProducersProvider>
        <TestComponent />
      </ProducersProvider>
    );
    
    expect(screen.getByTestId('producers-count')).toHaveTextContent('0');
    
    await userEvent.click(screen.getByText('Add Producer'));
    
    expect(screen.getByTestId('producers-count')).toHaveTextContent('1');
    expect(screen.getByText('Test Producer')).toBeInTheDocument();
  });

  test('deletes a producer', async () => {
    render(
      <ProducersProvider>
        <TestComponent />
      </ProducersProvider>
    );
    
    // First add a producer
    await userEvent.click(screen.getByText('Add Producer'));
    expect(screen.getByTestId('producers-count')).toHaveTextContent('1');
    
    // Then delete it
    await userEvent.click(screen.getByText('Delete Producer'));
    expect(screen.getByTestId('producers-count')).toHaveTextContent('0');
    expect(screen.queryByText('Test Producer')).not.toBeInTheDocument();
  });
});