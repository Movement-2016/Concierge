
const ADVISOR_EMAIL = 'advisor@movementvote.org';


const _do_email = ({payload,url,onDone,onError,successMsg}) => {

    onDone(''); // clear error messages
    onError('');

    const opts = {
      method: 'post',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify (payload),
    };

    const errMsg = `'Error: We were unable to send your message at this time. Please try again later or email ${ADVISOR_EMAIL} directly.'`;

    fetch (`${location.origin}/${url}`, opts)
      .then( resp => resp.json() )
      .then( resp => {
        // this is a gmail api thing
        if( resp.labelIds && resp.labelIds.includes('SENT') ) {
          onDone(successMsg);
        } else {
          onError(errMsg);
        }
      }).catch( () => onError(errMsg) );

};

const emailContact = ({ storeState, onError, onDone, message }) => {

    const payload = {
      ...storeState.user,
      advisorEmail: ADVISOR_EMAIL,
      message
    };

    const args = {
      onError,
      onDone,
      payload,
      url: 'api/contact',
      successMsg: 'Thank you! Your message has been sent successfuly.'
    };

    _do_email(args);

};

// const emailHouseParty = ({ storeState, onError, onDone, message }) => {

//   const payload = {
//     ...storeState.user,

//     advisorEmail: ADVISOR_EMAIL,
//     message
//   };

// };

const emailPlan = ({ storeState, onError, onDone, forceConsult = false }) => {

    let {
      groups:{
        plan: items,
        planTotal
      },
      user
    } = storeState;

    forceConsult && (user = { ...user, wantsConsult: true });

    const payload = {
      ...user,
      advisorEmail: ADVISOR_EMAIL,
      items,
      planTotal
    };

    const args = {
      onError,
      onDone,
      payload,
      url: 'api/contact',
      successMsg: 'Thank you! Your plan is on the way.'
    };

    _do_email( args );
};

module.exports = {
  emailPlan,
  emailContact
};
