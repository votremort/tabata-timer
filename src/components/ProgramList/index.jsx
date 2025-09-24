import React, { useEffect } from "react";
import * as SC from "./styles"
import { Typo } from "../UI/Typo";
import { Button } from "../UI/Button";

export const ProgramList = ({ onSelect, programs, setPrograms, refreshPrograms, onDelete }) => {

  useEffect(() => {
    refreshPrograms();
  }, []);

  return (
    <div>
      <Typo>Сохраненные программы</Typo>
      {programs.length === 0 && <p>Нет сохраненных программ</p>}
      <SC.List>
        {programs.map((program) => (
          <SC.ListItem key={program.id}>
            <div>
              <b>Циклы: </b> {program.cycles}, <b>Работа (сек): </b> {program.workDuration}, {' '}
              <b>Отдых (сек):</b> {program.restDuration}
            </div>
            <SC.ButtonWrapper>
              <Button onClick={() => onSelect(program)} text='Запустить' />
              <Button onClick={() => onDelete(program.id)} text='Удалить' />
            </SC.ButtonWrapper>
          </SC.ListItem>
        ))}
      </SC.List>
    </div>
  )
}