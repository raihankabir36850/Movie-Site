import React from 'react';

const SliderNextArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />;
};

export default SliderNextArrow;
