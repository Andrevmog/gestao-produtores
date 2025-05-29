import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Typography/Heading';

type ProducerCardProps = {
  producer: {
    id: string;
    name: string;
    document: string;
    farmName: string;
  };
  onDelete: (id: string) => void;
};

export const ProducerCard = ({ producer, onDelete }: ProducerCardProps) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
      <Heading level={3}>{producer.name}</Heading>
      <p>Documento: {producer.document}</p>
      <p>Fazenda: {producer.farmName}</p>
      <Button variant="secondary" onClick={() => onDelete(producer.id)}>
        Excluir
      </Button>
    </div>
  );
};