import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgramList } from './index';

describe('ProgramList', () => {
  const programs = [
    { id: '1', cycles: 3, workDuration: 30, restDuration: 10 },
    { id: '2', cycles: 5, workDuration: 20, restDuration: 5 },
  ];

  test('shows message if no programs', () => {
    render(<ProgramList programs={[]} setPrograms={() => {}} refreshPrograms={() => {}} onSelect={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Нет сохраненных программ/i)).toBeInTheDocument();
  });

  test('renders list of programs with buttons', () => {
    const onSelect = jest.fn();
    const onDelete = jest.fn();
    const refreshPrograms = jest.fn();

    render(<ProgramList programs={programs} setPrograms={() => {}} refreshPrograms={refreshPrograms} onSelect={onSelect} onDelete={onDelete} />);

    expect(screen.getAllByText(/Запустить/i)).toHaveLength(2);
    expect(screen.getAllByText(/Удалить/i)).toHaveLength(2);

    fireEvent.click(screen.getAllByText(/Запустить/i)[0]);
    expect(onSelect).toHaveBeenCalledWith(programs[0]);

    fireEvent.click(screen.getAllByText(/Удалить/i)[1]);
    expect(onDelete).toHaveBeenCalledWith('2');
  });
});