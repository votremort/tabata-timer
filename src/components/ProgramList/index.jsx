import React, { useEffect, useState } from "react";
import { loadPrograms, deleteProgram, updateProgram } from "../../helpers/localStorage";

export const ProgramList = ({ onSelect, programs, setPrograms, refreshPrograms, onDelete }) => {
  // const [programs, setPrograms] = useState([]);

  // const refreshPrograms = () => {
  //   setPrograms(loadPrograms());
  // };

  useEffect(() => {
    refreshPrograms();
  }, []);

  //  const handleDelete = (id) => {
  //   if (window.confirm('Удалить программу?')) {
  //     deleteProgram(id);
  //     refreshPrograms();
  //   }
  // };

  return (
    <div>
      <h3>Сохраненные программы</h3>
      {programs.length === 0 && <p>Нет сохраненных программ</p>}
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <div>
              <b>Циклы: </b> {program.cycles}, <b>Работа (сек): </b> {program.workDuration}, {' '}
              <b>Отдых (сек):</b> {program.restDuration}
            </div>
          <button onClick={() => onSelect(program)}>Запустить</button>{'  '}
          <button onClick={() => onDelete(program.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  )
}