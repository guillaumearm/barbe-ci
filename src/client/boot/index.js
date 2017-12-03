import App from 'App'
import render from './render'
import bootDev from './boot.dev';
import bootProd from './boot.prod';

if (process.env.NODE_ENV === 'production') {
  bootProd();
} else {
  bootDev();
}

render(App)
