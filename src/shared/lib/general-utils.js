const clone = (object) => JSON.parse( JSON.stringify(object) );

module.exports = { clone };
