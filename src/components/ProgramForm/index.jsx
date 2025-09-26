import React, { useState } from "react";
import { isPositiveNumber } from "../../helpers/validators";
import * as SC from "./styles"
import { Typo } from "../UI/Typo";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

export const ProgramForm = ( { onSave } ) => {
  const [cycles, setCycles] = useState('');
  const [workDuration, setWorkDuration] = useState('');
  const [restDuration, setRestDuration] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!isPositiveNumber(cycles)) {
      newErrors.cycles = 'Введите положительное и/или целое число циклов';
    };
     if (!isPositiveNumber(workDuration)) {
      newErrors.workDuration = 'Введите положительную и/или целое длительность работы';
    };
     if (!isPositiveNumber(restDuration)) {
      newErrors.restDuration = 'Введите положительную и/или целое длительность отдыха';
    };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      cycles: parseInt(cycles),
      workDuration: parseInt(workDuration),
      restDuration: parseInt(restDuration),
    });

    setCycles('');
    setWorkDuration('');
    setRestDuration('');
    setErrors({});
  };
  

  return (
    <div>
      <Typo>Создать программу</Typo>
      <SC.Form onSubmit={handleSubmit} noValidate>
        <div>
          <label>
            <SC.LabelText>Количество циклов (n): </SC.LabelText>
            <Input 
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
            <SC.LabelText>Продолжительность работы (секунд): </SC.LabelText>
            <Input
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
            <SC.LabelText>Длительность отдыха (секунд): </SC.LabelText>
            <Input
              type="number"
              min="1"
              step="1"
              value={restDuration}
              onChange={(e) => setRestDuration(e.target.value)}
            />
            { errors.restDuration && <div>{errors.restDuration}</div> }
          </label>
        </div>
        <Button type="submit" text='Сохранить программу' />
      </SC.Form>
    </div>
  )
}
