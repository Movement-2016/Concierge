/* eslint no-console:"off" */
var GMail = require('./gmail');
var M2016 = require('../client/m2016-service'); // ugh
var path = require('jspath');

const mailer = new GMail();

let orgs = null;

function init () {
  M2016.getOrgs().then( o => orgs = o );
}

const planFormatter = ({name,urlWeb,urlGive,amount}) => `
${name} - ${amount} ${urlWeb && `\nWebsite: ${urlWeb}`} ${urlGive && `\nDonation: ${urlWeb}`}
-----------------------------------------------------
`;

const mailHeader = ({fname,lname,email,phone}) => `
Hi ${fname}!

Here is your giving plan that you created at movement2016.org and requested be mailed to you.

Your info:
${fname} ${lname}
${email}
${phone}
Created o${new Date() + ''}

`;

const mailFooter = `

Thank you so much for your generosity!

Movement 2016

`;

function mailPlan (req, res) {
  
  const { fname, lname, addr, phone, email, plan } = req.body;
  
  if( !plan || !email ) {
    res.status( 500 ).json({});
  }

  let mail = mailHeader({fname,lname,email,phone});
  plan.items.forEach( item => {
    const { id, amount } = item;
    const group = path(`..{.id==${id}}`,orgs)[0];
    mail += planFormatter(Object.assign({},group,{amount}));
  });
  mail += mailFooter;

  const payload = {
    to: addr,
    subject: 'Your Movement 2016 Giving Plan',
    message: mail
  };

  mailer.send( payload )
    .then( result => res.status( 200 ).json(result) )
    .catch( err => res.status( 500 ).json( err ) );
}

module.exports = {
  mailPlan,
  init
};