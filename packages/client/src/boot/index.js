import App from 'App';
import render from './render';
import bootDev from './boot.dev';
import bootProd from './boot.prod';

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

if (isProduction || isTest) {
  bootProd();
} else {
  bootDev();
}

render(App);
