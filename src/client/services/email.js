import mailer from '../../shared/services/email';

import { ADMIN_EMAIL } from '../../config';

const errorMsg = () => `We were unable to send your message
                      at this time. Please email ${ADMIN_EMAIL} directly.`;

const houseParty = content =>
  mailer()
    .party({ ...content })
    .then(() => 'Success - house party message sent.');

const emailContact = ({ profile, message }) =>
  mailer()
    .contact({ ...profile, message })
    .then(() => 'Success - contact message sent.');

const emailPlan = ({ user, plan, db, forceConsult = false }) => {
  const DonationSchema = {
    group: { table: 'groups' },
  };

  const donations = db
    .denormalize(DonationSchema, plan.donations)
    .map(({ amount, group: { title, website, c4_donate_link, c3_donate_link } }) => ({
      amount,
      group: { title, website, c4_donate_link, c3_donate_link },
    }));

  const { fname, lname, email, phone, wantsConsult = forceConsult || user.wantsConsult } = user;

  const payload = {
    fname,
    lname,
    email,
    phone,
    wantsConsult,
    donations,
  };

  return mailer()
    .plan(payload)
    .then(() => 'Thank you! Your plan is on the way.')
    .catch(() => {
      throw new Error(errorMsg);
    });
};

module.exports = {
  emailPlan,
  emailContact,
  houseParty,
};
