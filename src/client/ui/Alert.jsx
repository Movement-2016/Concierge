import React from 'react';

class Alert extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      ...this.props,
      showing: true
    };
    this._toggleShow = this._toggleShow.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState( { ...props, showing: true } );
  }

  _toggleShow(e) {
    e.preventDefault();
    this.setState({showing:false});
  }

  render() {
    const {
      showing,
      type = 'warning',
      msg,
      className
    } = this.state;

    return showing && msg && (
        <div className={`alert alert-${type} ${className}`}>
          <a href="#" className="close" onClick={this._toggleShow}  dangerouslySetInnerHTML={{__html:'&times;'}} />
          {msg}
        </div>
      );
  }
}

Alert.INFO = 'info';
Alert.SUCCESS = 'success';
Alert.WARNING = 'warning';
Alert.DANGER = 'danger';

module.exports = Alert;