/* eslint no-console:"off" */
var GMail    = require('./gmail');
var apiModel = require('../shared/models/api');
var path     = require('jspath');
var Entities = require('html-entities').AllHtmlEntities;
var commaize = require('commaize');

const SUBJECT_HEAD = '[Movement Vote]';

const entities = new Entities();

const mailer = new GMail();

let orgs = null;

function init (app) {

  return apiModel.model().then( model => {
    orgs = model.orgs;
    app.post( '/api/plan/send',  mailPlan );
    app.post( '/api/houseparty', houseParty );
    app.post( '/api/contact',    contactEmail );
    console.log('Ready to use email');
  });
}

const planFormatter = ({name,urlWeb,urlGive,amount}) => `
${name} - $${amount} ${urlWeb && `\nWebsite: ${urlWeb}`} ${urlGive && `\nDonation: ${urlGive}`}
-----------------------------------------------------
`;

const planMailHeader = ({fname,lname,email,phone,wantsConsult}) => `
Hi ${fname}!

Here is your giving plan that you created at movementvote.org and requested be mailed to you.

Your info:
${fname} ${lname}
${email}
${phone}
Created ${new Date() + ''}

${wantsConsult
  ? 'We noticed that you requested a consultation with a donation advisor. One will be in touch with you shortly!'
  : 'We noticed that you declined a consultation with a donation advisor. If you have any questions please reply to this email and will get in touch shortly!'}

`;

const planMailFooter = (total) => `

Your total contribution amount: $${commaize(total)}

Thank you so much for your generosity!

Movement Vote

`;

const contactFormat = ({fname,lname,email,phone,message}) => `

First Name: ${fname}
Last Name: ${lname}
Email: ${email}
Phone: ${phone}

Message: "${message}"

`;

const partyFormat = ({
        hostParty,
        learnMore,
        fname,
        lname,
        email,
        phone,
        city,
        state,
        affiliation,
        message
      }) => `

First Name: ${fname}
Last Name: ${lname}
City: ${city + (state ? ', ' + state : '')}
Email: ${email}
Phone: ${phone}
${affiliation ? 'Affiliation: ' + affiliation : ''}

Checkboxes:
Can host party: ${hostParty ? 'YES' : 'NO'}
Wants to learn more: ${learnMore ? 'YES' : 'NO'}

${message ? 'Message: "' + message + '"' : ''}

`;

function houseParty (req, res) {

  console.log( req.body );

  const {
        email,
        phone,
      } = req.body;

  if( !email || !phone ) {
    res.status( 500 ).json({});
  }

  const mail = partyFormat(req.body);

  const payload = {
    to: 'advisor@movementvote.org',
    subject: SUBJECT_HEAD + ' New house party form submission from ' + email,
    message: entities.decode(mail)
  };

  mailer.send( payload )
    .then( result => { console.log(email,result); res.status( 200 ).json(result); } )
    .catch( err => { console.log('error', err ); res.status( 500 ).json( err ); } );

}

function contactEmail (req, res) {

  console.log( req.body );

  const {
      email,
      advisorEmail
    } = req.body;

  if( !email ) {
    res.status( 500 ).json({});
  }

  const mail = contactFormat(req.body);

  const payload = {
    to: advisorEmail,
    subject: SUBJECT_HEAD + ' New contact form submission from ' + email,
    message: entities.decode(mail)
  };

  mailer.send( payload )
    .then( result => { console.log(email,result); res.status( 200 ).json(result); } )
    .catch( err => { console.log('error', err ); res.status( 500 ).json( err ); } );

}

function mailPlan (req, res) {

  const {
    fname,
    lname,
    phone,
    email,
    advisorEmail,
    wantsConsult,
    items
  } = req.body;

  if( !items || !email ) {
    res.status( 500 ).json({});
  }

  let mail = planMailHeader({fname,lname,email,phone,wantsConsult});
  let total = 0;
  items.forEach( item => {
    const { id, amount } = item;
    const group = path(`..{.ID==${id}}`,orgs)[0];
    console.log(item);
    total += Number(amount);
    const {
      post_title: name,
      fields: {
        website: urlWeb,
        c4_donate_link: urlC4,
        c3_donate_link: urlC3
      }
    } = group;
    const urlGive = urlC3 || urlC4;
    mail += planFormatter({name,urlWeb,urlGive,amount});
  });
  mail += planMailFooter(total);

  const payload = {
    to: advisorEmail,
    subject: SUBJECT_HEAD + ' Your Giving Plan',
    message: entities.decode(mail)
  };

  mailer.send( payload )
    .then( result => {
      console.log(email,result);
      const userPayload = Object.assign({},payload,{to:email});
      return mailer.send( userPayload );
    })
    .then(  result => { console.log( email,   result); res.status( 200 ).json(result); })
    .catch( err    => { console.log('error', err   ); res.status( 500 ).json( err );  });
}

module.exports = init;
