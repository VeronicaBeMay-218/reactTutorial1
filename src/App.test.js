import { render, screen } from '@testing-library/react'; //Se importan las librerias que vamos a usar
import App from './App';

test('renders learn react link', () => { //ejecuta el juego por medio de react
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
