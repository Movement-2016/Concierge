import { PuertoRicoPage } from '../../client/components';

import service from '../services/m-service';

const PuertoRicoModel = {
  paths: ['/puertorico'],

  component: PuertoRicoPage,

  title: 'Puerto Rican Voter Project',

  model: () => service.getPage('puertorico').then(page => ({ page })),
};

module.exports = PuertoRicoModel;
