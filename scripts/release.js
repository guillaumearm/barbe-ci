const { execSync } = require('child_process');
const conventionalRecommendedBump = require('conventional-recommended-bump');

const options = {
  preset: 'angular',
};

const execNpmVersion = releaseType => (
  execSync(`npm version ${releaseType}`, { stdio: [0, 1, 2] })
);

conventionalRecommendedBump(options, (err, result) => {
  if (err) {
    throw err;
  }
  execNpmVersion(result.releaseType);
});
