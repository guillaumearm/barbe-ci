const puppeteer = require('puppeteer');

module.exports = ({ SERVER_PORT }) => ['get index.html', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${SERVER_PORT}`);

  const bodyHandle = await page.$('body div#root-container');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  expect(html).toBeTruthy();

  await browser.close();
}, 30 * 1000]
