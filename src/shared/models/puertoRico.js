import { ActionPage } from '../../client/components';

import service from '../services/m-service';

const PuertoRicoModel = {
  paths: ['/puertorico'],

  component: ActionPage,

  title: 'Puerto Rico Voter Project',

  model: () => service.getPage('puertorico').then(page => ({ page })),
};

module.exports = PuertoRicoModel;
