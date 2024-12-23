import react from "react";
import Select from "react-select";
const SelectDropDown = ({label,selectedOption,handleChange,options,styles,selectRef}) => {
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
                styles={styles}
                isSearchable
                className="text-black custom-focus-reset  border lg:shadow-none rounded-md  mt-1 !focus:outline-none !focus:ring-0 !ring-0"
            />
        </>
    )
}
export default SelectDropDown;