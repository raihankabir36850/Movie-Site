import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Img = ({ src, classNmae }) => {
  return <LazyLoadImage alt='back-drop-image' effect='blur' src={src} />;
};

export default Img;
