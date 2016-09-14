import React    from 'react';
import PlanForm from './PlanForm.jsx';
import Plan     from './Plan.jsx';

class Cart extends React.Component {

  render() {
    return (
      <div className="shopping-cart">
          <div className="donor-area"> 
            <PlanForm />
            <Plan />
        </div>
      </div>
    );
  }
}

module.exports = Cart;

