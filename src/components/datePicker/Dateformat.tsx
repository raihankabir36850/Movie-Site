import React, { useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { getDate } from '../../store/moviesDetails';

import 'react-datepicker/dist/react-datepicker.css';
import { getDateRange, formatDate } from '../../utils/dateFormat';

const DateFormat: React.FC<ReactDatePickerProps> = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const dispatch = useDispatch();

  useEffect(() => {
    const [firstDate, lastDate] = getDateRange(2);
    if (firstDate && lastDate) {
      setDateRange([firstDate, lastDate]);
    }
  }, []);

  useEffect(() => {
    console.log('afterchange', startDate, endDate);
    const date = {
      startDate: startDate ? formatDate(startDate) : null,
      endDate: endDate ? formatDate(endDate) : null,
    };
    dispatch(getDate(date));
  }, [startDate, endDate, dispatch]);

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      isClearable={true}
      onChange={(update) => {
        setDateRange(update);
      }}
      dateFormat='yyyy-MM-dd'
      placeholderText='Select your date range'
    />
  );
};

export default DateFormat;

// const [startDate, endDate] = getDateRange(2);
// console.log('Start Date:', startDate);
// console.log('End Date:', endDate);
