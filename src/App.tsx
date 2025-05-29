import { ProducersProvider } from './contexts/ProducersContext';
import { Home } from './pages/HomePage/HomePage';
import './styles/main.scss';

export const App = () => {
  return (
    <ProducersProvider>
      <Home />
    </ProducersProvider>
  );
};