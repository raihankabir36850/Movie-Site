import React, { useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFormat: React.FC<ReactDatePickerProps> = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  return <DatePicker selectsRange={true} startDate={startDate} endDate={endDate} isClearable={true} onChange={handleDateChange} dateFormat='yyyy-MM-dd' />;
};

export default DateFormat;
