import { modFox, modScene } from "./ui";
import { RAIN_CHANCE, SCENES, DAY_LENGTH, NIGHT_LENGTH, getNextHungerTime, getNextDeathTime, getNextPoopTime } from "./constants";

const gameState = {
  current: 'INIT',
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  deathTime: -1,
  poopTime: -1,
  timeTillCelebrate: -1,
  tick() {
    this.clock++;
    console.log('clock: ', this.clock);

    if (this.wakeTime === this.clock) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.deathTime) {
      this.die()
    }

    return this.clock;
  },
  startGame() {
    this.current = 'HATCHING';
    this.wakeTime = this.clock + 3;
    modFox('egg');
    modScene('day');
  },
  wake() {
    this.current = 'IDLING';
    this.wakeTime = -1;
    modFox('idling');
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
  },
  sleep() {
    this.state = 'SLEEP';
    modFox('sleep');
    modScene('night');
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = 'HUNGRY';
    this.deathTime = getNextDeathTime(this.clock);
    this.hungryTime = -1;
    modFox('hungry');
  },
  die() {
    console.log('the reaper\'s embrace');
  },
  handleUserAction(icon) {
    // pet can't act in these states
    if (['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(this.current)) {
      // do nothing
      return;
    }

    if (this.current === 'INIT' || this.current === 'DEAD') {
      this.startGame();
      return;
    }

    switch (icon) {
      case 'weather':
        this.changeWeather();
        break;
      case 'poop':
        this.cleanUpPoop();
        break;
      case 'fish':
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log('changeWeather')
  },
  cleanUpPoop() {
    console.log('cleanUpPoop')
  },
  feed() {
    if (this.current !== 'HUNGRY') {
      return;
    }
    this.current = 'FEEDING';
    this.deathTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox('eating');
    this.timeTillCelebrate = this.clock + 2;
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
