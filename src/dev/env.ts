import type { SCRIPTS_ENV } from 'global';

const ENV_LOCALSTORAGE_ID = 'jsEnv';
const ENV_NAMES = {
  dev: 'Development',
  prod: 'Production',
};

window.SCRIPTS_ENV = getENV();

window.setScriptsENV = (env: SCRIPTS_ENV) => {
  if (env !== 'dev' && env !== 'prod') {
    console.error('Invalid environment. Pass `dev` or `prod`');
    return;
  }

  localStorage.setItem(ENV_LOCALSTORAGE_ID, env);
  window.SCRIPTS_ENV = env;

  console.log(`Environment successfully set to ${ENV_NAMES[env]}`);
  if ('prod' === env) {
    console.log(
      'To switch to dev mode and serve files from localhost, run `window.setScriptsENV("dev")` in the console'
    );
  }
};

function getENV(): SCRIPTS_ENV {
  const localStorageItem = localStorage.getItem(ENV_LOCALSTORAGE_ID) as SCRIPTS_ENV;
  return localStorageItem || 'prod';
}

export {};
