import React from 'react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type {PieChartProps } from './types';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#A28DFF', '#FF6B6B', '#4ECDC4', '#FFA5A5'
];

export const PieChartComponent: React.FC<PieChartProps> = ({
  data,
  title,
  width = '100%',
  height = 300
}) => {
  return (
    <div style={{ width, height }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number, name: string) => [
              value.toLocaleString(),
              name
            ]}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </div>
  );
};