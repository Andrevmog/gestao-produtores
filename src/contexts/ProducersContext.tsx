import { createContext, useContext, useState, type ReactNode, useMemo } from 'react';

interface Crop {
  type: string;
  harvestYear: string;
  area?: number;
}

interface Farm {
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: Crop[];
}

interface Producer {
  id: string;
  documentType: 'CPF' | 'CNPJ';
  document: string;
  name: string;
  farms: Farm[];
}

interface ProducersContextType {
  producers: Producer[];
  addProducer: (producer: Omit<Producer, 'id'>) => void;
  editProducer: (id: string, updatedProducer: Omit<Producer, 'id'>) => void;
  deleteProducer: (id: string) => void;
  totalFarms: number;
  totalArea: number;
  statesData: { state: string; count: number }[];
  cropsData: { crop: string; count: number }[];
}

const ProducersContext = createContext<ProducersContextType | undefined>(undefined);

export const ProducersProvider = ({ children }: { children: ReactNode }) => {
  const [producers, setProducers] = useState<Producer[]>([]);


  const addProducer = (producer: Omit<Producer, 'id'>) => {
    setProducers(prev => [...prev, { ...producer, id: Date.now().toString() }]);
  };

  const deleteProducer = (id: string) => {
    setProducers(prev => prev.filter(p => p.id !== id));
  };

  const editProducer = (id: string, updatedProducer: Omit<Producer, 'id'>) => {
    setProducers(prev =>
      prev.map(producer =>
        producer.id === id ? { ...updatedProducer, id } : producer
      )
    );
  };


  const { totalFarms, totalArea, statesData, cropsData } = useMemo(() => {
    const totalFarms = producers.reduce((sum, producer) => sum + producer.farms.length, 0);
    
    const totalArea = producers.reduce(
      (sum, producer) => sum + producer.farms.reduce((farmSum, farm) => farmSum + farm.totalArea, 0),
      0
    );

    const statesMap = new Map<string, number>();
    const cropsMap = new Map<string, number>();

    producers.forEach(producer => {
      producer.farms.forEach(farm => {
        // Contagem por estado
        statesMap.set(farm.state, (statesMap.get(farm.state) || 0) + 1);
        
        // Contagem por cultura
        farm.crops.forEach(crop => {
          cropsMap.set(crop.type, (cropsMap.get(crop.type) || 0) + 1);
        });
      });
    });

    const statesData = Array.from(statesMap.entries())
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count);

    const cropsData = Array.from(cropsMap.entries())
      .map(([crop, count]) => ({ crop, count }))
      .sort((a, b) => b.count - a.count);

    return { totalFarms, totalArea, statesData, cropsData };
  }, [producers]);

  return (
    <ProducersContext.Provider 
      value={{ 
        producers, 
        addProducer, 
        editProducer, // Adicionado aqui
        deleteProducer,
        totalFarms,
        totalArea,
        statesData,
        cropsData
      }}
    >
      {children}
    </ProducersContext.Provider>
  );
};

export const useProducers = () => {
  const context = useContext(ProducersContext);
  if (!context) {
    throw new Error('useProducers must be used within a ProducersProvider');
  }
  return context;
};