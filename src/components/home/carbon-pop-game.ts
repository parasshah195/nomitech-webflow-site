import { MOBILE_LANDSCAPE_START_BREAKPOINT } from 'src/constants';

const EL_DATA_ATTRIBUTE = 'data-carbon-pop-el';

const ATTR_VALUE_COMPONENT = 'component';
const ATTR_VALUE_MOLECULE = 'molecule';
const ATTR_VALUE_MOLECULE_POP_COUNT = 'count';
const ATTR_VALUE_INITIAL_SCREEN = 'init-screen';
const ATTR_VALUE_END_SCREEN = 'end-screen';
const ATTR_VALUE_SUCCESS_MESSAGE = 'success-message';
const ATTR_VALUE_RESET_GAME_BUTTON = 'reset';

const CSS_VAR_GRAYSCALE = '--carbon-pop-grayscale';
const CSS_VAR_ITEM_SCALE = '--carbon-pop-scale-factor';

const TOTAL_MOLECULES_COUNT = 10;
const MOLECULES_DISPLAY_COUNT = 4;

const HIDE_CLASS = 'hide';

const SUCCESS_MESSAGE_TIMEOUT_MS = 5000;

export function initCarbonPopGame() {
  const game = new CarbonPopGame();
  game.initGame();
}

/**
 * Shows 4 random carbon molecules at a time to pop, and on popping each molecule, show a success message
 * Has a reset option to re-initialize the popping game
 */
class CarbonPopGame {
  allMolecules: HTMLElement[];
  moleculesPopped: HTMLElement[];
  moleculesDisplayed: HTMLElement[];
  moleculesPending: HTMLElement[];
  allSuccessMessages: HTMLElement[];
  successMessagesShown: HTMLElement[];
  successMessagesPending: HTMLElement[];
  componentEl: HTMLElement;
  initialScreenEl: HTMLElement;
  popCountEl: HTMLElement;
  endScreenEl: HTMLElement;
  resetButtonEl: HTMLElement;

  constructor() {
    this.allMolecules = Array.from(
      document.querySelectorAll(`[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_MOLECULE}"]`)
    );
    this.moleculesPopped = [];
    this.moleculesDisplayed = [];
    this.moleculesPending = [];
    this.allSuccessMessages = Array.from(
      document.querySelectorAll(`[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_SUCCESS_MESSAGE}"]`)
    );
    this.successMessagesShown = [];
    this.successMessagesPending = [];

    this.componentEl = document.querySelector(
      `[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_COMPONENT}"]`
    ) as HTMLElement;
    this.initialScreenEl = document.querySelector(
      `[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_INITIAL_SCREEN}"]`
    ) as HTMLElement;
    this.popCountEl = document.querySelector(
      `[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_MOLECULE_POP_COUNT}"]`
    ) as HTMLElement;
    this.endScreenEl = document.querySelector(
      `[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_END_SCREEN}"]`
    ) as HTMLElement;
    this.resetButtonEl = document.querySelector(
      `[${EL_DATA_ATTRIBUTE}="${ATTR_VALUE_RESET_GAME_BUTTON}"]`
    ) as HTMLElement;

    if (!this.initialScreenEl || !this.endScreenEl || 0 === this.allMolecules.length) {
      console.error(
        'Carbon Pop Game: Unable to initialize since one or more of the required elements not found'
      );
      window.DEBUG(
        'Component',
        this.componentEl,
        'Initial screen',
        this.initialScreenEl,
        'End screen',
        this.endScreenEl,
        'Molecules',
        this.allMolecules
      );
      return;
    }

    if (window.innerWidth > MOBILE_LANDSCAPE_START_BREAKPOINT) {
      this.allMolecules.forEach((molecule) => {
        molecule.addEventListener('click', this.onMoleculePop.bind(this));
      });

      this.resetButtonEl.addEventListener('click', this.onResetButtonClick.bind(this));
    }
  }

  initGame() {
    if (window.innerWidth <= MOBILE_LANDSCAPE_START_BREAKPOINT) {
      window.DEBUG('Not initializing Carbon Pop Game for mobile screen');
      return;
    }

    this.moleculesPopped = [];
    this.moleculesDisplayed = [];
    this.moleculesPending = [...this.allMolecules];
    this.successMessagesShown = [];
    this.successMessagesPending = [...this.allSuccessMessages];

    this.allMolecules.forEach((molecule) => {
      molecule.classList.add(HIDE_CLASS);
    });

    this.updateCSSVars();
    this.updatePopCount();
    this.showInitialScreen();
    this.showRandomMolecules();
  }

  showInitialScreen() {
    this.initialScreenEl.style.display = 'block';
    this.endScreenEl.style.display = 'none';
  }

  showEndScreen() {
    this.initialScreenEl.style.display = 'none';
    this.endScreenEl.style.display = 'block';
  }

  /**
   * Shows one or more molecules from the pending list
   */
  showRandomMolecules() {
    if (this.moleculesPending.length === 0) {
      window.DEBUG('No more molecules to show', this.moleculesPending);
      return;
    }

    while (this.moleculesDisplayed.length < MOLECULES_DISPLAY_COUNT) {
      const randomIndex = this.getRandomIndex(this.moleculesPending.length);
      const moleculeEl = this.moleculesPending.splice(randomIndex, 1)[0];
      moleculeEl.classList.remove(HIDE_CLASS);
      this.moleculesDisplayed.push(moleculeEl);
    }
  }

  onMoleculePop(ev: MouseEvent) {
    const moleculeEl = ev.target as HTMLElement;
    moleculeEl.classList.add(HIDE_CLASS);

    const moleculeDisplayedIndex = this.moleculesDisplayed.indexOf(moleculeEl);
    this.moleculesDisplayed.splice(moleculeDisplayedIndex, 1);

    this.moleculesPopped.push(moleculeEl);
    this.updatePopCount();

    this.updateCSSVars();
    this.showSuccessMessage();

    if (this.moleculesPending.length === 0 && this.moleculesDisplayed.length === 0) {
      this.showEndScreen();
    } else {
      this.showRandomMolecules();
    }
  }

  showSuccessMessage() {
    const randomIndex = this.getRandomIndex(this.successMessagesPending.length);
    const successMessageEl = this.successMessagesPending.splice(randomIndex, 1)[0];
    window.gsap.to(successMessageEl, {
      display: 'flex',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      repeatDelay: SUCCESS_MESSAGE_TIMEOUT_MS / 1000,
    });
    this.successMessagesShown.push(successMessageEl);
  }

  updateCSSVars() {
    const poppedMolecules = this.getMoleculesPoppedCount();

    const grayscale = (TOTAL_MOLECULES_COUNT - poppedMolecules) * TOTAL_MOLECULES_COUNT;
    const scaleFactor = !poppedMolecules ? 0 : poppedMolecules / TOTAL_MOLECULES_COUNT;

    this.componentEl.style.setProperty(CSS_VAR_GRAYSCALE, `${grayscale}%`);
    this.componentEl.style.setProperty(CSS_VAR_ITEM_SCALE, `${scaleFactor}`);
  }

  updatePopCount() {
    this.popCountEl.innerText = this.getMoleculesPoppedCount().toString();
  }

  onResetButtonClick() {
    this.initGame();
  }

  getMoleculesPoppedCount() {
    return this.moleculesPopped.length;
  }

  getRandomIndex(poolLength: number) {
    return Math.floor(Math.random() * poolLength);
  }
}
