import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyLoadProps {
  src: string;
  className: string;
  alt: string;
}

export const Img = ({ src, className, alt }: LazyLoadProps) => {
  return <LazyLoadImage effect='blur' src={src} alt={alt} className={`${className}`} />;
};

export default Img;
