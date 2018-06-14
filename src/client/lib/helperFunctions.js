import sanitizeHtml from 'sanitize-html';

const idFormat = str => str.replace(/\s+/g, '-').toLowerCase();

// Checks url for refcode param. Returns refcode or false
const getRefCode = () => {
  if (!global.IS_SERVER_REQUEST) {
    const urlParams = new URLSearchParams(window.location.search);
    for (const param of urlParams) {
      if (param[0] === 'refcode') return param[1];
    }
  }
  return false;
};

const cleanHtml = dirty =>
  sanitizeHtml(dirty, {
    allowedTags: ['a'],
    allowedAttributes: {
      a: ['href', 'target'],
    },
  });

module.exports = { idFormat, getRefCode, cleanHtml };
