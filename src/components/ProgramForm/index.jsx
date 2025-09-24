import React, { useState } from "react";
import { isPositiveNumber } from "../../helpers/validators";

export const ProgramForm = ( { onSave } ) => {
  const [cycles, setCycles] = useState('');
  const [workDuration, setWorkDuration] = useState('');
  const [restDuration, setRestDuration] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!isPositiveNumber(cycles)) {
      newErrors.cycles = 'Введите положительное число циклов';
    };
     if (!isPositiveNumber(workDuration)) {
      newErrors.workDuration = 'Введите положительную длительность работы';
    };
     if (!isPositiveNumber(restDuration)) {
      newErrors.restDuration = 'Введите положительную длительность отдыха';
    };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      cycles: Number(cycles),
      workDuration: Number(workDuration),
      restDuration: Number(restDuration),
    });

    setCycles('');
    setWorkDuration('');
    setRestDuration('');
    setErrors({});
  };
  

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          Количество циклов (n):
          <input 
            type="number"
            min="1"
            step="1"
            value={cycles}
            onChange={(e) => setCycles(e.target.value)}
          />
        </label>
        { errors.cycles && <div>{errors.cycles}</div> }
      </div>
      <div>
        <label>
          Продолжительность работы (секунд):
          <input
            type="number"
            min="1"
            step="1"
            value={workDuration}
            onChange={(e) => setWorkDuration(e.target.value)}
          />
          { errors.workDuration && <div>{errors.workDuration}</div> }
        </label>
      </div>
      <div>
        <label>
          Длительность отдыха (секунд):
          <input
            type="number"
            min="1"
            step="1"
            value={restDuration}
            onChange={(e) => setRestDuration(e.target.value)}
          />
          { errors.workDuration && <div>{errors.restDuration}</div> }
        </label>
      </div>
      <button type="submit">Сохранить программу</button>
    </form>
  )
}
