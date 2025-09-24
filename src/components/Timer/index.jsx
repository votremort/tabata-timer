import React, { useEffect, useRef, useState } from "react";
import { playBeep } from "../../helpers/playSound";
const PHASES = {
  WORK: 'Работа',
  REST: 'Отдых',
  FINISHED: 'Завершено',
};

export const Timer = ({ program }) => {
  const [phase, setPhase] = useState(PHASES.WORK);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(program ? program.workDuration : 0);
  const [isRunning, setIsRunning] = useState(false);

  const timerId = useRef(null);

  //Запуск / пауза таймера
  const toggleRunning = () => {
    setIsRunning((r) => !r)
  };

  // Сброс таймера на начальное состояние программы
  const reset = () => {
    setIsRunning(false);
    setPhase(PHASES.WORK);
    setCurrentCycle(1);
    setTimeLeft(program ? program.workDuration : 0);
  };

  //Тикает каждую секунду
  useEffect(() => {
    if (!isRunning) {
      if (timerId.current) clearInterval(timerId.current);
      return
    }

    timerId.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [isRunning]);

  //Отслеживаем переходы фаз
  useEffect(() => {
    if (timeLeft <= 0) {
      playBeep();

      if (phase === PHASES.WORK) {
        //переход к отдыху
        if (program.restDuration > 0) {
          setPhase(PHASES.REST);
          setTimeLeft(program.restDuration);
        } else {
          //если отдыха нет, сразу след цикл или конец
          if (currentCycle >= program.cycles) {
            setPhase(PHASES.FINISHED);
            setIsRunning(false);
          } else {
            setCurrentCycle((c) => c + 1);
            setTimeLeft(program.workDuration);
          }
        }
      } else if (phase === PHASES.REST) {
        //после отдыха след цикл или конец
        if (currentCycle >= program.cycles) {
          setPhase(PHASES.FINISHED);
          setIsRunning(false);
        } else {
          setCurrentCycle((c) => c + 1);
          setPhase(PHASES.WORK);
          setTimeLeft(program.workDuration);
        }
      }
    }
  }, [timeLeft, phase, currentCycle, program]);

  //Если меняется программа — сбросить таймер под неё
  useEffect(() => {
    if (program) {
      setPhase(PHASES.WORK);
      setCurrentCycle(1);
      setTimeLeft(program.workDuration);
      setIsRunning(false);
    }
  }, [program]);

  if (!program) return <div>Выберите программу для запуска таймера</div>;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  return(
    <div>
      <h3>Таймер</h3> 
      <p>Текущая фаза: <b>{phase}</b></p>
      <p>
        Цикл: {currentCycle} из {program.cycles}
      </p>
      <p>Осталось времени: {formatTime(timeLeft)}</p>
      <button onClick={toggleRunning}>{isRunning ? 'Пауза' : 'Старт'}</button>
      <button onClick={reset}>Сброс</button>
      {phase === PHASES.FINISHED && <p><b>Программа завершена!</b></p>}
    </div>
  )
}
