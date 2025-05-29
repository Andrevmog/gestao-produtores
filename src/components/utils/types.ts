export interface PieDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieDataItem[];
  title: string;
  width?: number | string;
  height?: number | string;
}

export interface Crop {
  type: string;
  harvestYear: string;
  area?: number;
}

export interface Farm {
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: Crop[];
}

export interface Producer {
  id: string;
  documentType: 'CPF' | 'CNPJ';
  document: string;
  name: string;
  farms: Farm[];
}

export type ProducerInput = Omit<Producer, 'id'>;