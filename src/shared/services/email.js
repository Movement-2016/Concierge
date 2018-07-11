import bellman from './bellman';

const stage = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = () => bellman(stage,'email');
