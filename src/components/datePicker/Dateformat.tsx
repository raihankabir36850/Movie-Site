import React, { useEffect, useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import type { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { getDate } from '../../store/moviesDetails';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateRange, formatDate } from '../../utils/dateFormat';

const DateFormat: React.FC<ReactDatePickerProps> = () => {
  const { date } = useSelector((state: RootState) => state.home);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
    const storedStartDate = date?.startDate ? new Date(date.startDate) : null;
    const storedEndDate = date?.endDate ? new Date(date.endDate) : null;

    return [storedStartDate, storedEndDate];
  });
  const [startDate, endDate] = dateRange;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!startDate && !endDate) {
      const [firstDate, lastDate] = getDateRange(2);
      if (firstDate && lastDate) {
        setDateRange([firstDate, lastDate]);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      const date = {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      };
      dispatch(getDate(date));
    }
  }, [startDate, endDate, dispatch]);

  return (
    <DatePicker
      selectsRange={true}
      closeOnScroll={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      dateFormat='yyyy-MM-dd'
      placeholderText='Select your date range'
    />
  );
};

export default DateFormat;
