import React     from 'react';

const ContributeButton = props => {
    let { 
      urlGive,
      amount, 
    } = props;

    urlGive += '?refcode=worksheet';
    amount && (urlGive += '&amount=' + amount);

    return urlGive
            ? <a className="group-link contribute" href={urlGive} target="_blank"><i className="material-icons">star_border</i>Contribute</a>
            : <span />;
};

module.exports = ContributeButton;


