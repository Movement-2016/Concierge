import mailer from '../../shared/services/email';

import { ADMIN_EMAIL } from '../../config';

const errMsg = () => `We were unable to send your message 
                      at this time. Please try again later 
                      or email ${ADMIN_EMAIL} directly.`;

const houseParty = content => mailer().party({...content})
                                .then( () => 'Thank you! Your house party information has been sent successfuly.')
                                .catch( () => errMsg());

const emailContact = ({ profile, message }) => mailer().contact({...profile,message})
                                                .then( () => 'Thank you! Your message has been sent successfuly.')
                                                .catch( () => errMsg());

const emailPlan = ({ user, plan, db, forceConsult = false }) => {

  const DonationSchema = {
    group: { table: 'groups' }
  };

  const donations = db.denormalize( DonationSchema, plan.donations );

  forceConsult && (user = { ...user, wantsConsult: true });

  const payload = {
    ...user,
    donations,
    forceConsult
  };

  return mailer().plan(payload)
                    .then( () => 'Thank you! Your plan is on the way.' )
                    .catch( () => errMsg());
};

module.exports = {
  emailPlan,
  emailContact,
  houseParty
};
