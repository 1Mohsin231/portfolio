// Web Audio API procedural sci-fi sound synthesizer (0kb external audio dependencies)

import { useCallback, useSyncExternalStore } from "react";

class SoundFX {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;

  constructor() {
    // Audio is opt-in by default to respect visitor preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sound_fx");
      this.isEnabled = stored === "true";
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public setEnabled(val: boolean) {
    this.isEnabled = val;
    if (typeof window !== "undefined") {
      localStorage.setItem("sound_fx", val ? "true" : "false");
      window.dispatchEvent(new Event("sound_toggle"));
    }
    if (val) {
      this.initCtx();
      this.playSuccess();
    }
  }

  public toggle(): boolean {
    const next = !this.isEnabled;
    this.setEnabled(next);
    return next;
  }

  public playHover() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio error silently handled
    }
  }

  public playClick() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio error silently handled
    }
  }

  // Subtle mechanical typing click
  public playTypeKey() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = 1200 + Math.random() * 400;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Audio error silently handled
    }
  }

  // Soft low-frequency click when moving simulator slider
  public playSliderTick() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.02);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Audio error silently handled
    }
  }

  // Confetti / celebratory fanfare chord for VIP hire command
  public playFanfare() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5];

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.04, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    } catch {
      // Audio error silently handled
    }
  }

  public playSuccess() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.03, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.onended = () => {
          try {
            osc.disconnect();
            gain.disconnect();
          } catch {}
        };

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.15);
      });
    } catch {
      // Audio error silently handled
    }
  }

  public playLaser() {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // Audio error silently handled
    }
  }
}

export const sound = new SoundFX();

function subscribeSound(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("sound_toggle", callback);
  return () => window.removeEventListener("sound_toggle", callback);
}

function getSoundSnapshot(): boolean {
  return sound.getEnabled();
}

function getSoundServerSnapshot(): boolean {
  return false;
}

// React 19 useSyncExternalStore audio hook for hydration-safe micro-haptics
export function useSoundFx() {
  const soundEnabled = useSyncExternalStore(subscribeSound, getSoundSnapshot, getSoundServerSnapshot);

  const toggleSound = useCallback(() => {
    return sound.toggle();
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playHover: sound.playHover.bind(sound),
    playClick: sound.playClick.bind(sound),
    playTypeKey: sound.playTypeKey.bind(sound),
    playSliderTick: sound.playSliderTick.bind(sound),
    playFanfare: sound.playFanfare.bind(sound),
    playSuccess: sound.playSuccess.bind(sound),
    playLaser: sound.playLaser.bind(sound),
  };
}
