export function playBeep() {
  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ac = new AudioContext();
    const oscillator = ac.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 440; // нота Ля - 440 Гц
    oscillator.connect(ac.destination);
    oscillator.start();
    oscillator.stop(ac.currentTime + 0.2);
    oscillator.onended = () => ac.close();
  } catch (e) {
    console.warn('AudioContext not supported or blocked', e);
  }
}
