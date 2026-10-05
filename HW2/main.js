const AudioContextClass = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContextClass();

/*
  Create a short white-noise buffer.
  This will be used for snare, hi-hat and clap sounds.
*/
function createNoiseBuffer(duration = 0.3) {
  const bufferSize = Math.floor(audioContext.sampleRate * duration);

  const buffer = audioContext.createBuffer(
    1,
    bufferSize,
    audioContext.sampleRate,
  );

  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

/* =========================
   KICK
========================= */

function playKick() {
  const now = audioContext.currentTime;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(150, now);
  oscillator.frequency.exponentialRampToValueAtTime(45, now + 0.45);

  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.45);
}

/* =========================
   SNARE
========================= */

function playSnare() {
  const now = audioContext.currentTime;

  const noise = audioContext.createBufferSource();
  const noiseFilter = audioContext.createBiquadFilter();
  const noiseGain = audioContext.createGain();

  noise.buffer = createNoiseBuffer(0.25);

  noiseFilter.type = "highpass";
  noiseFilter.frequency.value = 1000;

  noiseGain.gain.setValueAtTime(0.7, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioContext.destination);

  const oscillator = audioContext.createOscillator();
  const oscillatorGain = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.value = 180;

  oscillatorGain.gain.setValueAtTime(0.5, now);
  oscillatorGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(audioContext.destination);

  noise.start(now);
  noise.stop(now + 0.25);

  oscillator.start(now);
  oscillator.stop(now + 0.12);
}

/* =========================
   HI-HAT
========================= */

function playHiHat() {
  const now = audioContext.currentTime;

  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();

  noise.buffer = createNoiseBuffer(0.12);

  filter.type = "highpass";
  filter.frequency.value = 7000;

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);

  noise.start(now);
  noise.stop(now + 0.12);
}

/* =========================
   CLAP
========================= */

function playClap() {
  const now = audioContext.currentTime;

  const noise = audioContext.createBufferSource();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();

  noise.buffer = createNoiseBuffer(0.3);

  filter.type = "bandpass";
  filter.frequency.value = 1400;

  gain.gain.setValueAtTime(0.8, now);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);

  gain.gain.setValueAtTime(0.7, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.08);

  gain.gain.setValueAtTime(0.6, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);

  noise.start(now);
  noise.stop(now + 0.3);
}

/* =========================
   AUDIO ENGINE
========================= */

const soundPlayers = {
  kick: playKick,
  snare: playSnare,
  hihat: playHiHat,
  clap: playClap,
};

async function playSound(soundName) {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const player = soundPlayers[soundName];

  if (!player) {
    console.warn(`Unknown sound: ${soundName}`);
    return;
  }

  player();
}

/* =========================
   FIFO BEAT RECORDER
========================= */

const beatQueue = [];

let isRecording = false;
let recordingStartTime = 0;

const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const recordStatus = document.getElementById("recordStatus");

function startRecording() {
  beatQueue.length = 0;

  isRecording = true;
  recordingStartTime = performance.now();

  recordBtn.disabled = true;
  stopBtn.disabled = false;

  recordStatus.textContent = "Recorder: Recording...";
}

function stopRecording() {
  isRecording = false;

  recordBtn.disabled = false;
  stopBtn.disabled = true;

  recordStatus.textContent = `Recorder: Stopped — ${beatQueue.length} beats`;

  console.table(beatQueue);
}

function recordBeat(soundName) {
  if (!isRecording) {
    return;
  }

  const timestamp = performance.now() - recordingStartTime;

  beatQueue.push({
    sound: soundName,
    timestamp: Math.round(timestamp),
  });
}

recordBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);

/* =========================
   DRUM PAD CLICK
========================= */

const drumPads = document.querySelectorAll(".drum-pad");

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const soundName = pad.dataset.sound;

    playSound(soundName);
    recordBeat(soundName);
  });
});

/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  const pressedKey = event.key.toLowerCase();

  const pad = document.querySelector(`.drum-pad[data-key="${pressedKey}"]`);

  if (!pad) {
    return;
  }

  const soundName = pad.dataset.sound;

  playSound(soundName);
  recordBeat(soundName);
});
