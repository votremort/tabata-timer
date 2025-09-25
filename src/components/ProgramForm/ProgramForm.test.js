import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgramForm } from './index';

describe('ProgramForm', () => {
  const setup = (onSave = jest.fn()) => {
    render(<ProgramForm onSave={onSave} />);
  };

  test('renders form inputs and submit button', () => {
    setup();
    expect(screen.getByLabelText(/Количество циклов/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Продолжительность работы/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Длительность отдыха/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Сохранить программу/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /Сохранить программу/i }));

    expect(screen.getByText(/Введите положительное число циклов/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите положительную длительность работы/i)).toBeInTheDocument();
    expect(screen.getByText(/Введите положительную длительность отдыха/i)).toBeInTheDocument();
  });

  test('calls onSave with correct data on valid submit', () => {
    const onSave = jest.fn();
    setup(onSave);

    fireEvent.change(screen.getByLabelText(/Количество циклов/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Продолжительность работы/i), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText(/Длительность отдыха/i), { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: /Сохранить программу/i }));

    expect(onSave).toHaveBeenCalledWith({
      cycles: 5,
      workDuration: 20,
      restDuration: 10
    });

    // После успешного submit поля очищаются
    expect(screen.getByLabelText(/Количество циклов/i)).toHaveValue(null);
  });
});