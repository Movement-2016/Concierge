import React     from 'react';

class CartLine extends React.Component {

  render() {
    const {
      name,
      urlGive
    } = this.props;

    return (
        <div className="shopping-cart-line">
          <span className="name" dangerouslySetInnerHTML={{__html:name}} />
          <a href={urlGive} className="give-link"><img src="/images/ic_star_border_red_24dp.png" alt="" /> <span>{"Contribute"}</span></a>
        </div>
      );
  }
}

module.exports = CartLine;
