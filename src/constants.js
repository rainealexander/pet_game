export const TICK_RATE = 3000;
export const ICONS = ['fish', 'poop', 'weather'];
export const RAIN_CHANCE = 0.25;
export const SCENES = ['day', 'rain'];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 5;

export const getNextHungerTime = (clock) => {
  return Math.floor(Math.random() * 3) + 5 + clock;
};

export const getNextDeathTime = (clock) => {
  return Math.floor(Math.random() * 4) + 3 + clock;
};

export const getNextPoopTime = (clock) => {
  return Math.floor(Math.random() * 3) + 4 + clock;
};
