import bellman from './bellman';

const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = () => {
  console.log('stage: ', stage);
  return bellman(stage,'email');
};
