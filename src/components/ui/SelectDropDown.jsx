import react from "react";
import Select from "react-select";
const SelectDropDown = ({
  label,
  selectedOption,
  handleChange,
  options,
  styles,
  selectRef,
  isSearchable = false,
  disabled,
  ...props
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "gray" : "black",
      borderRadius: "0.3rem",
      "&:hover": {
        borderColor: "gray", // Optional: set border color on hover
      },
    }),
  };
  return (
    <>
      <label
        htmlFor="user-select"
        className="block text-md ml-3  text-[#242424]"
      >
        {label}
      </label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Type 3+ letters"
        ref={selectRef}
        isDisabled={disabled}
        styles={customStyles}
        className="text-black custom-focus-reset  border lg:shadow-none rounded-md !focus:outline-none !focus:ring-0 !ring-0"
        isSearchable
        {...props}
      />
    </>
  );
};
export default SelectDropDown;
