// Web Audio API Synthesizer for Cyber Crate Unboxing & UI Sounds
let audioCtx = null;

let isAudioMuted = typeof window !== 'undefined' 
  ? localStorage.getItem('ignis_audio_muted') === 'true' 
  : false;

export function getAudioMuted() {
  return isAudioMuted;
}

export function setAudioMuted(muted) {
  isAudioMuted = Boolean(muted);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('ignis_audio_muted', isAudioMuted ? 'true' : 'false');
      window.dispatchEvent(new CustomEvent('ignis_audio_muted_change', { detail: isAudioMuted }));
    } catch (e) {}
  }
  return isAudioMuted;
}

export function toggleAudioMuted() {
  return setAudioMuted(!isAudioMuted);
}

function getAudioContext() {
  if (isAudioMuted) return null;
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    return null;
  }
}

/**
 * Play an authentic mechanical click/tick as cards spin past the needle
 */
export function playReelTick(pitchMultiplier = 1) {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 * pitchMultiplier, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.018);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.019);
  } catch (e) {
    // Ignore audio errors
  }
}

/**
 * Deep mechanical unboxing hydraulic hiss / unlock sound
 */
export function playCrateUnlock() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    // Sub bass drop
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);

    // High tech chirp
    const chirp = ctx.createOscillator();
    const chirpGain = ctx.createGain();
    chirp.type = 'sawtooth';
    chirp.frequency.setValueAtTime(1200, ctx.currentTime);
    chirp.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.15);

    chirpGain.gain.setValueAtTime(0.08, ctx.currentTime);
    chirpGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    chirp.connect(chirpGain);
    chirpGain.connect(ctx.destination);
    chirp.start();
    chirp.stop(ctx.currentTime + 0.16);
  } catch (e) {}
}

/**
 * Triumphant fanfare when unboxing completes based on tier
 */
export function playWinSound(rarity = 'rare') {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const chords = {
      common: [440, 554],
      rare: [523.25, 659.25, 783.99], // C major
      epic: [587.33, 739.99, 880.0, 1174.66], // D major chord
      legendary: [659.25, 830.61, 987.77, 1318.51, 1661.22], // E major shimmering
      godtier: [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98] // Grand harmonic
    };

    const notes = chords[rarity] || chords.rare;
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = rarity === 'godtier' || rarity === 'legendary' ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      const startTime = ctx.currentTime + idx * 0.08;
      const duration = 0.5 + idx * 0.1;

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });
  } catch (e) {}
}
