import React from 'react';

import OrgsMenuPage from './OrgsMenuPage.jsx';
import OrgsPageDesktop from './OrgsPageDesktop.jsx';

const OrgsEntryPage = ({ mobile }) =>
  mobile ? <OrgsMenuPage mobile={mobile} /> : <OrgsPageDesktop mobile={mobile} />;

module.exports = OrgsEntryPage;
