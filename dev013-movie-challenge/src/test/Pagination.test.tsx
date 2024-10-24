import { render, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  test('renders pagination buttons correctly', () => {
    const { getByText } = render(
      <Pagination totalPages={5} currentPage={1} setCurrentPage={() => {}} />
    );

    // Verificar que los botones de página se renderizan correctamente
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('...')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });
  test('navigates to the next page', () => {
    const setCurrentPage = jest.fn(); // Mock de la función para setCurrentPage

    const { getByRole } = render(
      <Pagination totalPages={5} currentPage={1} setCurrentPage={setCurrentPage} />
    );

    // Simular un clic en el botón de siguiente
    fireEvent.click(getByRole('button', { name: '' }));

    // Verificar que setCurrentPage fue llamado con el nuevo valor
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });
  test('navigates to the previous page', () => {
    const setCurrentPage = jest.fn();
  
    const { getByRole } = render(
      <Pagination totalPages={5} currentPage={2} setCurrentPage={setCurrentPage} />
    );
  
    // Simular un clic en el botón de anterior
    fireEvent.click(getByRole('button', { name: '' }));
  
    // Verificar que setCurrentPage fue llamado con el nuevo valor
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
  test('disables next button on last page', () => {
    const { getByRole } = render(
      <Pagination totalPages={5} currentPage={5} setCurrentPage={() => {}} />
    );
  
    // Verificar que el botón de siguiente está deshabilitado
    expect(getByRole('button', { name: '' })).toBeDisabled();
  });
  test('disables previous button on first page', () => {
    const { getByRole } = render(
      <Pagination totalPages={5} currentPage={1} setCurrentPage={() => {}} />
    );
  
    // Verificar que el botón de anterior está deshabilitado
    expect(getByRole('button', { name: '' })).toBeDisabled();
  });
});