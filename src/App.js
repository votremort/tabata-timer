import { useEffect, useState } from 'react';
import './App.css';
import * as SC from "./styles";

import { Container } from './components/UI/Container';

import { ProgramForm } from './components/ProgramForm';
import { Timer } from './components/Timer';
import { ProgramList } from './components/ProgramList';

import { loadPrograms, saveProgram, deleteProgram } from './helpers/localStorage';

function App() {
  //сохраненные программы
  const [programs, setPrograms] = useState([]);

   // Текущая активная программа (объект с id, cycles, work, rest)
  const [currentProgram, setCurrentProgram] = useState(null);
  
  // Состояние таймера запуска/остановлен/сброшен
  const [timerKey, setTimerKey] = useState(0); // служит для принудительного сброса Timer при смене программы
 
  useEffect(() => {
    // При инициализации загружаем программы из localStorage
    const savedPrograms = loadPrograms();
    setPrograms(savedPrograms);
  }, []);

  //сохранение новой программы через ProgramForm
  const handleSaveProgram = (programData) => {
    const newProgram = { ...programData, id: Date.now().toString() };
    saveProgram(newProgram);
    setPrograms(loadPrograms());
    setCurrentProgram(newProgram);
    setTimerKey((prev) => prev + 1); // сбрасываем таймер с новой программой
  }

  // Запуск выбранной программы из списка
  const handleSelectProgram = (program) => {
    setCurrentProgram(program);
    setTimerKey((prev) => prev + 1); // сброс таймера для новой программы
  };

  const refreshPrograms = () => {
    setPrograms(loadPrograms());
  };

  // Удаление программы из localStorage и обновление списка
  const handleDeleteProgram = (id) => {
    if (window.confirm('Удалить программу?')) {
      deleteProgram(id);
      refreshPrograms();
    }

    // Если удалили текущую программу, сбрасываем Timer
    if (currentProgram && currentProgram.id === id) {
      setCurrentProgram(null);
      setTimerKey((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <div className="App">
        <SC.AppTitle> Tabata - timer</SC.AppTitle>
        <SC.TimerAndListWrapper>
          <SC.Section>
            {currentProgram ? (
              <Timer
                key={timerKey}
                program={currentProgram}
              />
            ) : (
              <p>Выберите или создайте программу для запуска таймера</p>
            )}
          </SC.Section>
          <SC.Section>
            <ProgramList 
              programs={programs}
              setPrograms={setPrograms}
              onSelect={handleSelectProgram}
              onDelete={handleDeleteProgram}
              refreshPrograms={refreshPrograms}
            />
          </SC.Section>
        </SC.TimerAndListWrapper>
        <SC.Section>
          <ProgramForm onSave={handleSaveProgram} />
        </SC.Section>
      </div>
    </Container>
  );
}
export default App;
