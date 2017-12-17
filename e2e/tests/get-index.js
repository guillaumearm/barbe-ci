const expect = require('expect.js');

module.exports = ({ SERVER_PORT, page }) => ['get index.html', async () => {
  await page.goto(`http://localhost:${SERVER_PORT}`);

  const bodyHandle = await page.$('body div#root-container');
  const html = await page.evaluate(body => body.innerHTML, bodyHandle);
  await bodyHandle.dispose();

  expect(html).to.be.ok();

}]
