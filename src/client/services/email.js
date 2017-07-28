import axios from 'axios';

const ADVISOR_EMAIL = 'advisor@movementvote.org';

const _do_email = ({payload, url, successMsg,}) => {

    const opts = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      data: payload
    };

    const errMsg = `We were unable to send your message at this time. Please try again later or email ${ADVISOR_EMAIL} directly.`;

    return axios(`${location.origin}/${url}`, opts)
      .then( response => {
        const resp = response.data;
        // this is a gmail api thing
        if( resp.labelIds && resp.labelIds.includes('SENT') ) {
          return successMsg;
        } else {
          throw new Error(errMsg);
        }
      }).catch( () => {
          throw new Error(errMsg);
      });

};

const houseParty = (content) => {

  const payload = {
    ...content,
    advisorEmail: ADVISOR_EMAIL,
  };

  const args = {
    payload,
    url: 'api/houseparty',
    successMsg: 'Thank you! Your house party information has been sent successfuly.'
  };

  return _do_email(args);
};

const emailContact = ({ user, message }) => {
  const payload = {
    ...user,
    advisorEmail: ADVISOR_EMAIL,
    message
  };

  const args = {
    payload,
    url: 'api/contact',
    successMsg: 'Thank you! Your message has been sent successfuly.'
  };

  return _do_email(args);
};

const emailPlan = ({ user, plan, forceConsult = false }) => {
  let {
      donations: items,
      total: planTotal
    } = plan;

  forceConsult && (user = { ...user, wantsConsult: true });

  const payload = {
    ...user,
    advisorEmail: ADVISOR_EMAIL,
    items,
    planTotal
  };

  const args = {
    payload,
    url: 'api/plan/send',
    successMsg: 'Thank you! Your plan is on the way.'
  };

  return _do_email( args );
};

module.exports = {
  emailPlan,
  emailContact,
  houseParty
};
