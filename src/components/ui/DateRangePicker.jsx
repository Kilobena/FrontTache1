import React, { useEffect, useState } from "react";
import { enUS } from "date-fns/locale";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../../assets/styles/css/react-range-picker.min.css";

const CustomDateRangePicker = ({
  dateRangeState,
  setDateRangeState,
  months = 3,
  ...props
}) => {
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
  return (
    <DateRangePicker
      {...props}
      locale={enUS}
      direction="horizontal"
      ranges={dateRangeState}
      onChange={(item) => setDateRangeState([item.selection])}
      rangeColors={["#f2c41a", "#f2c41a", "#f2c41a"]}
      months={isMobile ? 1 : isTablet ? 2 : months}
      showSelectionPreview={false}
      moveRangeOnFirstSelection={false}
      showMonthAndYearPickers={false}
      showDateDisplay={false}
      staticRanges={[]}
      inputRanges={[]}
    />
  );
};

export default CustomDateRangePicker;
