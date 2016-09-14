/* eslint no-console:"off" */
var GMail = require('./gmail');
var M2016 = require('./m2016-service'); 
var path = require('jspath');

const mailer = new GMail();

let orgs = null;

function commaize(value) {
  if( value === 0 || value === '0' ) {
      return '0';
  } else if( value ) {
      var regex = /([0-9]+)(([0-9]{3})($|,))/g;
      var str;
      var commaized = (value.string || value) + '';

      do {
          str = commaized;
          commaized = str.replace(regex,'$1,$2');
      } while( str !== commaized );

      return commaized;
  }
}

function init () {
  console.log( 'starting mail init');
  process.nextTick( () => {
    M2016.getOrgs().then( o => {
      orgs = o;
      console.log('mail init done');
    }).catch( err => {
      console.log( err );
    });
  });
  console.log( 'starting mail init (2)');
}

const planFormatter = ({name,urlWeb,urlGive,amount}) => `
${name} - $${amount} ${urlWeb && `\nWebsite: ${urlWeb}`} ${urlGive && `\nDonation: ${urlGive}`}
-----------------------------------------------------
`;

const mailHeader = ({fname,lname,email,phone}) => `
Hi ${fname}!

Here is your giving plan that you created at movement2016.org and requested be mailed to you.

Your info:
${fname} ${lname}
${email}
${phone}
Created ${new Date() + ''}

`;

const mailFooter = (total) => `

Your total contribution amount: $${commaize(total)}

Thank you so much for your generosity!

Movement 2016

`;

const adminHeader = `

/---------------------------------------/
  ADMIN NOTE: This person has requested 
  assistence - please contact them at 
  the information provided.
/---------------------------------------/


`;

function mailPlan (req, res) {
  
  const { fname, lname, addr, phone, email, items } = req.body;
  
  if( !items || !email ) {
    res.status( 500 ).json({});
  }

  let mail = mailHeader({fname,lname,email,phone});
  let total = 0;
  items.forEach( item => {
    const { id, amount } = item;
    const group = path(`..{.id==${id}}`,orgs)[0];
    total += amount;
    mail += planFormatter(Object.assign({},group,{amount}));
  });
  mail += mailFooter(total);

  email === addr && (mail += adminHeader);

  const payload = {
    to: addr,
    subject: 'Your Movement 2016 Giving Plan',
    message: mail
  };

  mailer.send( payload )
    .then( result => { console.log(result); res.status( 200 ).json(result); } )
    .catch( err => { console.log('error', err ); res.status( 500 ).json( err ); } );
}

module.exports = {
  mailPlan,
  init
};