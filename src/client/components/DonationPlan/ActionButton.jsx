import React from 'react';

const CLS = 'complete-button btn waves-effect waves-light';

const PlanActionButton = ({text,children,onClick}) => <button onClick={onClick} className={CLS}>{text}{children}</button>;

module.exports = PlanActionButton;
