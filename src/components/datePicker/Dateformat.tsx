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
    const date = {
      startDate: startDate ? formatDate(startDate) : null,
      endDate: endDate ? formatDate(endDate) : null,
    };
    dispatch(getDate(date));
  }, [startDate, endDate, dispatch]);

  return (
    <DatePicker
      selectsRange={true}
      closeOnScroll={(e) => e.target === document}
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
