import React, { useEffect, useState } from "react";
import { enUS } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../../assets/styles/css/react-range-picker.min.css";
import { addDays } from "date-fns";

const CustomDateRangePicker = ({ dateRangeState, setDateRangeState, months = 3, ...props }) => {
  const [isMobile, setIsMobile] = useState(window?.innerWidth <= 640);
  const [isTablet, setIsTablet] = useState(window?.innerWidth <= 991);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      setIsTablet(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(dateRangeState[0], "dateRangeState");
  return (
    <DateRangePicker
      {...props}
      locale={enUS}
      direction="horizontal"
      calendarFocus="backwards"
      ranges={dateRangeState}
      onChange={(item) => setDateRangeState([item.selection])}
      rangeColors={["#f2c41a"]}
      // minDate={addDays(new Date(), -90)}
      maxDate={addDays(new Date(), 0)}
      months={isMobile ? 1 : isTablet ? 2 : months}
      showSelectionPreview={false}
      preventSnapRefocus={true}
      moveRangeOnFirstSelection={false}
      showMonthAndYearPickers={false}
      showDateDisplay={false}
    />
  );
};

export default CustomDateRangePicker;
