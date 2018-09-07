import { PuertoRicoPage } from '../../client/components';

import service from '../services/m-service';

const PuertoRicoModel = {
  paths: ['/puertorico'],

  component: PuertoRicoPage,

  title: 'Puerto Rican Voter Project',

  model: () => service.db.then(db => ({ funds: db.funds, groups: db.groups })),
};

module.exports = PuertoRicoModel;
