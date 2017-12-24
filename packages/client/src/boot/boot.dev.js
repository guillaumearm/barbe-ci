/* eslint-disable no-console */

export default () => {
  console.log('init SDP (in dev mode)');
  if (module.hot) {
    module.hot.accept();
  }
}
