import React    from 'react';
import PlanForm from './PlanForm.jsx';
import Plan     from './Plan.jsx';
import Summary  from './Summary.jsx';

class Cart extends React.Component {

  render() {
    return (
      <div className="shopping-cart">
          <div className="donor-area"> 
            <PlanForm />
            <Plan />
            <Summary />
        </div>
      </div>
    );
  }
}

module.exports = Cart;

