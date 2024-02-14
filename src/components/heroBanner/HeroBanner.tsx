import DateFormat from '../datePicker/Dateformat';
import './HeroBanner.scss';

const HeroBanner = () => {
  return (
    <div className='heroBanner'>
      <div className='wrapper'>
        <div className='heroBannerContent'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>Search your favoutite movies by selecting your certain dates </span>
          <div className='datePicker'>
            <DateFormat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
