const STORAGE_KEY = 'savedPrograms';

export function saveProgram(program) {
  const programs = loadPrograms();

  const programWithId = { ...program, id: Date.now().toString() };
  programs.push(programWithId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
  console.log('test save program')
  return programWithId;
}

//получение уже сохраненных программ
export function loadPrograms() {
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

//удаление
export function deleteProgram(id) {
  const programs = loadPrograms().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
}

//обновление
export function updateProgram(updatedProgram) {
  const programs = loadPrograms().map((p) => {
    if (p.id === updatedProgram.id) return updatedProgram;
    return p;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
}