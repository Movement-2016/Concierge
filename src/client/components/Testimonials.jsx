import React from 'react';
import sanitizeHtml from 'sanitize-html';

const TestimonialButton = ({ index, focus, handleClick, label }) => (
  <a
    className={'testimonial-button' + (focus ? ' focused' : '')}
    onClick={() => handleClick(index)}
  >
    {label}
  </a>
);

const Testimonial = ({ focus, title, image, authorName, authorTitle, body, authorImage }) => (
  <div className={'testimonial' + (focus ? ' focused' : '')}>
    <div className="testimonial-image">
      <img src={image} />
    </div>
    <div className="testimonial-text">
      <div className="testimonial-title">{title}</div>
      <div className="testimonial-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }} />
      <div className="testimonial-footer">
        <img className="testimonial-author-image" src={authorImage} />
        <div className="testimonial-meta">
          <div className="testimonial-author-name">{authorName}</div>
          <div className="testimonial-author-title">{authorTitle}</div>
        </div>
      </div>
    </div>
  </div>
);

class Testimonials extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      focusIndex: 0,
    };
  }

  componentDidMount() {
    this.setHeight();
    this.initTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setHeight = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    let maxHeight = 0;
    for (var t of testimonials) {
      if (t.offsetHeight > maxHeight) {
        maxHeight = t.offsetHeight;
      }
    }
    document.querySelector('.testimonial-list').style.minHeight = maxHeight;
  };

  initTimer = () => {
    this.interval = setInterval(this.cycleFocus, this.props.timeInterval);
  };

  cycleFocus = () => {
    const nextFocus = (this.state.focusIndex + 1) % this.props.testimonials.length;
    this.setState({ focusIndex: nextFocus });
  };

  handleButtonClick = index => {
    this.setState({ focusIndex: index });
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="testimonial-area">
        <div className="testimonial-buttons">
          {this.props.testimonials.map((t, i) => (
            <TestimonialButton
              key={i}
              index={i}
              focus={i === this.state.focusIndex}
              handleClick={this.handleButtonClick}
              label={t.title}
            />
          ))}
        </div>
        <div className="testimonial-list container">
          {this.props.testimonials.map((t, i) => (
            <Testimonial key={i} focus={i === this.state.focusIndex} {...t} />
          ))}
        </div>
      </div>
    );
  }
}

module.exports = Testimonials;
