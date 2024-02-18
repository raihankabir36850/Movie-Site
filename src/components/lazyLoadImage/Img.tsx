import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Img = ({ src, className, alt }) => {
  return <LazyLoadImage effect='blur' src={src} alt={alt} className={`${className}`} />;
};

export default Img;
