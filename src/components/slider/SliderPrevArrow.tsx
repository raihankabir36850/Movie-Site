const SliderPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: '#120e0e' }} onClick={onClick} />;
};

export default SliderPrevArrow;
