import GMail    from './gmail';
import path     from 'jspath';
import commaize from 'commaize';

import { AllHtmlEntities as Entities } from 'html-entities';

import apiModel from '../shared/models/api';
import reqJSON  from './req-json';

import {
  SITE_TITLE,
} from '../config'; // <-- App config (not ./server);

const SUBJECT_HEAD = `[${SITE_TITLE}]`;

const entities = new Entities();

const mailer = new GMail();

let orgs = null;

function init (app) {

  return apiModel.model().then( model => {
    orgs = model.orgs;
    app.post( '/api/plan/send',  mailPlan );
    app.post( '/api/houseparty', houseParty );
    app.post( '/api/contact',    contactEmail );
    console.log('Ready to use email'); // eslint-disable-line
  });
}

// express polyfills-ish

const setStatus = (res,status) => { res.statusCode = status; return res;  };

const jsonPolyfill = res => { res.json = obj => res.end(JSON.stringify(obj));  };

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

  reqJSON(req).then( json => {
    const {
        email,
        advisorEmail,
      } = json;

    if( !email ) {
      return setStatus( res,  500 ).end();
    }

    const mail = partyFormat(json);

    const payload = {
      to: advisorEmail,
      subject: SUBJECT_HEAD + ' New house party form submission from ' + email,
      message: entities.decode(mail)
    };

    jsonPolyfill(res);

    return mailer.send( payload )
      .then( result => { console.log(email,result); setStatus( res,  200 ).json(result); } ); // eslint-disable-line no-console

  }).catch( err => {
    console.error( err ); // eslint-disable-line no-console
    setStatus( res, 500 ).end( err.message );
  });
}

function contactEmail (req, res) {

  reqJSON(req).then( json => {
    const {
        email,
        advisorEmail
      } = json;

    if( !email ) {
      return setStatus( res,  500 ).end();
    }

    const mail = contactFormat(json);

    const payload = {
      to: advisorEmail,
      subject: SUBJECT_HEAD + ' New contact form submission from ' + email,
      message: entities.decode(mail)
    };

    jsonPolyfill(res);

    return mailer.send( payload )
      .then ( result => { console.log(email,result); setStatus( res,  200 ).json(result); } ); // eslint-disable-line no-console

  }).catch( err => {
    console.error( err ); // eslint-disable-line no-console
    setStatus( res, 500 ).end( err.message );
  });
}

function mailPlan (req, res) {

  reqJSON(req).then( json => {
    const {
      fname,
      lname,
      phone,
      email,
      advisorEmail,
      wantsConsult,
      items
    } = json;

    if( !email ) {
      return setStatus( res, 500).end();
    }

    let mail = planMailHeader({fname,lname,email,phone,wantsConsult});
    let total = 0;
    items && items.forEach( item => {
      const { id, amount } = item;
      const group = path(`..{.ID==${id}}`,orgs)[0];
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

    jsonPolyfill(res);

    return mailer.send( payload )
      .then( () => mailer.send( { ...payload, to: email }) )
      .then( result => { console.log( email, result); setStatus( res, 200 ).json(result); } ) ; // eslint-disable-line no-console

  }).catch( err => {
    console.error( err ); // eslint-disable-line no-console
    setStatus( res, 500 ).end( err.message );
  });
}

module.exports = init;
