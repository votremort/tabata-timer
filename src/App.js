import { useState } from 'react';
import './App.css';

import { ProgramForm } from './components/ProgramForm';
import { loadPrograms, saveProgram } from './helpers/localStorage';

function App() {
  //сохраненные программы
  const [programs, setPrograms] = useState([]);

   // Текущая активная программа (объект с id, cycles, work, rest)
  const [currentProgram, setCurrentProgram] = useState(null);
  
  // Состояние таймера запуска/остановлен/сброшен
  const [timerKey, setTimerKey] = useState(0); // служит для принудительного сброса Timer при смене программы
 
  //сохранение новой программы через ProgramForm
  const handleSaveProgram = (programData) => {
    const newProgram = { ...programData, id: Date.now().toString() };
    saveProgram(newProgram);
    setPrograms(loadPrograms());
    setCurrentProgram(newProgram);
    setTimerKey((prev) => prev + 1); // сбрасываем таймер с новой программой
  }
  return (
    <div className="App">
      <h1>tabata timer</h1>
      <section>
        <h2>Создать программу</h2>
        <ProgramForm onSave={handleSaveProgram} />
      </section>
      
    </div>
  );
}

export default App;
