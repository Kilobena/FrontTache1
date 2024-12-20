import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';
import Auth from "../../service/Auth";
import { useAuth } from "../../providers/AuthContext";
import { FaUserCircle } from "react-icons/fa";
const RegisterPage = () => {


    const [showPassword, setShowPassword] = useState(false);
    const [profil, setProfil] = useState({ username: "", password: "", role: "Select Role" });
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // success or error
    const [countryCode, setCountryCode] = useState("+92");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const auth = new Auth();
    const { user, updateUser } = useAuth();

    const getAvailableRoles = () => {
        if (user?.role === "Owner") {
            return ["Partner", "SuperAgent", "Agent", "User"];
        } else if (user?.role === "Partner") {
            return ["SuperAgent"];
        } else if (user?.role === "SuperAgent") {
            return ["Agent"];
        } else {
            return ["User"];
        }
    };

    const roles = getAvailableRoles();

    const handleRegister = async () => {
        if (!user || !user._id) {
            setMessage("User ID is not available. Please try again.");
            setModalType("error");
            setIsModalOpen(true);
            return;
        }

        try {
            // Validate username
            const usernameRegex = /^[a-zA-Z0-9._-]{4,16}$/; // Regular expression for validation
            if (!profil.username || !usernameRegex.test(profil.username)) {
                setMessage(
                    "Username must be between 4 and 16 characters, and can only contain letters, numbers, underscores (_), dots (.), and hyphens (-)."
                );
                setModalType("error");
                setIsModalOpen(true);
                return;
            }

            // Validate role selection
            if (profil.role === "Select Role") {
                setMessage("Please select a role.");
                setModalType("error");
                setIsModalOpen(true);
                return;
            }

            const updatedProfil = {
                ...profil,
                id: user._id, // ID of the currently logged-in user (creator)
            };

            console.log("Submitting Profile:", updatedProfil); // Debug log

            const response = await auth.registerUser(updatedProfil);

            console.log("Register Response:", response); // Debug log

            if (response.success && response.status === 201) {
                // Successful registration
                setMessage(response.message || "User registered successfully!");
                setModalType("success");
            } else {
                // Handle backend error responses
                setMessage(response.message || "Error occurred during registration.");
                setModalType("error");
            }

            setIsModalOpen(true); // Show the modal
        } catch (error) {
            console.error("Error during user registration:", error); // Debug log
            setMessage("Error registering user. Please try again.");
            setModalType("error");
            setIsModalOpen(true); // Show the modal
        }
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfil((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setProfil({ username: "", password: "", role: "Select Role" });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };




    const countries = [
        { code: "+1", flag: "us", name: "United States" },
        { code: "+44", flag: "gb", name: "United Kingdom" },
        { code: "+61", flag: "au", name: "Australia" },
        { code: "+91", flag: "in", name: "India" },
        { code: "+81", flag: "jp", name: "Japan" },
        { code: "+33", flag: "fr", name: "France" },
        { code: "+49", flag: "de", name: "Germany" },
        { code: "+55", flag: "br", name: "Brazil" },
        { code: "+34", flag: "es", name: "Spain" },
        { code: "+39", flag: "it", name: "Italy" },
        { code: "+1", flag: "ca", name: "Canada" },
        { code: "+27", flag: "za", name: "South Africa" },
        { code: "+7", flag: "ru", name: "Russia" },
        { code: "+52", flag: "mx", name: "Mexico" },
        { code: "+61", flag: "au", name: "Australia" },
        { code: "+34", flag: "es", name: "Spain" },
        { code: "+56", flag: "cl", name: "Chile" },
        { code: "+967", flag: "ye", name: "Yemen" },
        { code: "+33", flag: "fr", name: "France" },
        { code: "+81", flag: "jp", name: "Japan" },
    ];


    // Filter countries based on the search term
    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="flex h-screen w-full sm:p-2">
            <div className="w-full max-w-4xl p-2 pb-5 rounded-lg shadow-lg">
                <div className="w-full">
                    <form>
                        {/* Username Input */}
                        <div className="relative">
                            <label className="block text-[#ababab] text-md font-medium mb-1">Username</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pt-3 pl-4">
                                    <FaUserCircle className="text-primary-dark" size={20} />
                                </span>

                                <input
                                    className="text-sm  text-[#1c1c1c] bg-no-repeat bg-left appearance-none rounded-lg p-3.5 pl-12  w-full mb-4 border-0"
                                    type="text"


                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-[#ababab] text-md font-medium mb-1">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pt-2 pl-5">
                                    <i class="fa-solid fa-envelope text-black text-lg"></i>
                                </span>

                                <input
                                    className="bg-no-repeat bg-left appearance-none rounded-lg p-3 pl-12 text-sm  text-[#1c1c1c] w-full mb-4 border-0"
                                    type="text"


                                />
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="currency" class="block appearance-none text-[#ababab] border-0 text-md font-medium mb-1">Currency</label>
                            <select id="currency" class="cursor-pointer w-full p-3 text-sm  text-[#1c1c1c]  border-0 rounded-lg   focus:outline-none ">
                                <option value="">-- Select Currency --</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label for="country" class="block text-[#ababab] text-md font-medium mb-1">Country</label>
                            <select id="country" class="cursor-pointer w-full p-3 text-sm  text-[#1c1c1c]  border-0 rounded-lg   focus:outline-none ">
                                <option value="">-- Select Country --</option>
                            </select>
                        </div>

                        {/* <div class="mb-4">
              <label for="mobile" class="block text-[#ababab] text-md font-medium mb-1">Mobile Number</label>
              <div class="flex items-center bg-white border border-gray-600  rounded-lg">
                <span class="bg-white text-black pl-3 pr-2">+92</span>
                <input id="mobile" type="text" class="w-full p-2.5  text-sm  text-[#1c1c1c] focus:outline-none focus:ring-0 focus:ring-white" />
              </div>
            </div> */}

                        <div className="mb-4">
                            <label
                                htmlFor="mobile"
                                className="block text-[#ababab] text-md font-medium mb-1"
                            >
                                Mobile Number
                            </label>
                            <div className="flex items-center bg-white border border-gray-600 rounded-lg">
                                {/* Dropdown Button */}
                                <div className="relative">
                                    <button
                                        id="dropdown-button"
                                        type="button"
                                        className="flex items-center bg-white text-black pl-1 pr-4 py-2 text-sm rounded-l-lg focus:outline-none"
                                        onClick={toggleDropdown}
                                    >
                                        <img
                                            src={`https://flagcdn.com/w40/${countries[countryCode] || "pk"}.png`} // Defaulting to "us" flag
                                            alt={`${countryCode} Flag`}
                                            className="w-5 h-5 mr-2"
                                        />
                                        <span>{countryCode}</span>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div
                                            id="dropdown-menu"
                                            className="absolute p-3 mt-2 bg-[#333333] text-white shadow-lg w-72 z-10 max-h-60 overflow-y-auto"
                                        >
                                            {/* Search Bar */}
                                            <input
                                                type="text"
                                                id="dropdown-search"
                                                placeholder="Search..."
                                                value={searchTerm}
                                                onChange={handleSearch}
                                                className="w-full p-2 text-sm text-gray-700 border-b rounded-lg border-gray-300 focus:outline-none"
                                            />
                                            {/* Country Options */}
                                            <ul className="">
                                                {(filteredCountries.length > 0 ? filteredCountries : countries).map(
                                                    (country) => (
                                                        <li
                                                            key={country.code}
                                                            className="flex items-center p-2 mt-2 hover:bg-yellow-500 cursor-pointer"
                                                            onClick={() => handleCountrySelect(country)}
                                                        >
                                                            <img
                                                                src={`https://flagcdn.com/w40/${country.flag}.png`}
                                                                alt={`${country.name} Flag`}
                                                                className="w-5 h-5 mr-2"
                                                            />
                                                            <span className="text-white font-medium text-sm">
                                                                {`${country.code} ${country.name}`}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Number Input */}
                                <input
                                    id="mobile"
                                    type="text"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    placeholder="Enter your mobile number"
                                    className="w-full p-2.5 text-sm text-[#1c1c1c] focus:outline-none focus:ring-0"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="block text-[#ababab] text-md font-medium mb-1">Password</label>
                            <div className="relative">
                                <input
                                    className="bg-no-repeat bg-left appearance-none rounded-lg p-3 text-sm  text-[#1c1c1c] w-full border-0"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={profil.password}
                                    onChange={handleChange}
                                />
                                <div className="absolute top-2 right-5">

                                    <button
                                        type="button"
                                        className="ml-2 focus:outline-none"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"} text-black text-xl`} aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>



                        <div class="mt-4">
                            <label for="mobile" class="block text-[#ababab] text-md font-medium mb-1">First Name</label>
                            <div class="flex items-center bg-white border border-gray-600 rounded-lg">
                                <input
                                    id="mobile"
                                    type="text"
                                    class="w-full p-2.5 text-sm  text-[#1c1c1c] rounded-lg focus:outline-none focus:ring-0 focus:ring-white"
                                />
                            </div>
                        </div>

                        <div class="mt-4">
                            <label for="mobile" class="block text-[#ababab] text-md font-medium mb-1">Last Name</label>
                            <div class="flex items-center bg-white border border-gray-600  rounded-lg">

                                <input id="mobile" type="text" class="w-full p-2.5 text-sm  text-[#1c1c1c] rounded-lg focus:outline-none focus:ring-0 focus:ring-white" />
                            </div>
                        </div>

                        <div class="mt-4">
                            <label class="block text-[#ababab] text-md font-medium mb-1">Date of Birth</label>
                            <div class="flex gap-2">
                                <select class="w-1/3 px-3 py-2 text-sm  text-[#1c1c1c]   rounded focus:outline-none  border-0">
                                    <option>Day</option>
                                </select>
                                <select class="w-1/3 px-3 py-2 text-sm  text-[#1c1c1c]    rounded focus:outline-none  border-0">
                                    <option>Month</option>
                                </select>
                                <select class="w-1/3 px-3 py-2 text-sm  text-[#1c1c1c]    rounded focus:outline-none  border-0">
                                    <option>Year</option>
                                </select>
                            </div>
                        </div>
                        <div class="relative mb-2 mt-5">
                            <div class="flex space-x-4 rtl:space-x-reverse">
                                <label class="checkboxLabel flex items-center justify-center space-x-4 rtl:space-x-reverse text-sm font-semibold mb-2">
                                    <input type="checkbox" name="terms_accepted" class="w-3 h-3 rounded-sm focus:ring-0" value="false" />
                                    <span class="checkboxLabel text-[#ababab] text-lg font-light">I am 18 years or older and accept the <a class="text-yellow-500 cursor-pointer underline dark:text-modalSecondaryTextColorDark text-modalSecondaryTextColorLight" href="/terms-conditions">Terms and Conditions</a>
                                        - <a class="text-yellow-500 c   ursor-pointer underline dark:text-modalSecondaryTextColorDark text-modalSecondaryTextColorLight" href="/privacy-policy">Privacy Policy</a>.
                                    </span></label>
                            </div>
                        </div>
                        <div class="relative mb-2">
                            <div class="flex space-x-4 rtl:space-x-reverse">
                                <label class="checkboxLabel flex items-center justify-center space-x-4 rtl:space-x-reverse text-sm font-semibold mb-2">
                                    <input type="checkbox" name="terms_accepted" class="w-3 h-3 rounded-sm focus:ring-0 border-none" value="false" />
                                    <span class="checkboxLabel text-[#ababab] text-lg font-light">I agree to receive bonus & marketing emails.
                                    </span></label>
                            </div>
                        </div>
                        <div className="mb-2  mt-4">
                            <button
                                className="bg-yellow-500 p-2.5 hover:bg-[#f5d048] text-sm text-black rounded-lg w-full focus:outline-none"
                                type="button"
                                onClick={handleRegister}
                            >
                                REGISTER
                            </button>
                        </div>
                        <div class="flex flex-col items-center justify-center mx-7 mt-5">
                            <hr class="w-3/4  border-yellow-500" />
                            <div class="flex items-center font-extrabold justify-center space-x-2 rtl:space-x-reverse p-7 text-sm">
                                <span>Already have an account?</span>
                                <span class="cursor-pointer dark:text-modalSecondaryTextColorDark text-modalSecondaryTextColorLight text-yellow-500">Login
                                </span></div></div>
                        {/* Register and Reset Buttons */}

                    </form>
                </div>
            </div>

            {/* Modal for showing messages */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded shadow-lg max-w-xs w-full">
                        <h2
                            className={`text-xl font-bold ${modalType === "success" ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {modalType === "success" ? "Success" : "Error"}
                        </h2>
                        <p className="text-black">{message}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded w-full hover:bg-yellow-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default RegisterPage;

