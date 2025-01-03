import React, { useEffect } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { PROVIDER_OPTIONS, SORT_OPTIONS } from "./GAMES_FILTERS_DATA";

const GamesCategoryFilters = ({ selectedProviderFilter, setSelectedProviderFilter, selectedSortByFilter, setSelectedSortByFilter }) => {
  const location = useLocation();
  console.log(selectedSortByFilter, "selectedSortByFilter");
  return (
    <>
      {location.pathname !== "/casino" ? (
        <div className="relative flex items-center justify-end gap-3 md:w-[400px] w-full">
          {/* PROVIDERS FILTER */}
          {location.pathname !== "/providers" && location.pathname !== "/pragmatic" ? (
            <Listbox as="div" className="lg:flex-none flex-1" value={selectedProviderFilter} onChange={setSelectedProviderFilter}>
              <ListboxButton
                className={clsx(
                  "w-full lg:w-[200px] relative block rounded-lg bg-white py-2 pr-8 pl-5 text-left text-sm/6 text-primary-dark",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              >
                Provider: {selectedProviderFilter ? selectedProviderFilter.label : PROVIDER_OPTIONS[0].label}
                <ChevronDownIcon className="group pointer-events-none absolute top-2 right-2.5 size-5 fill-primary-dark" aria-hidden="true" />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom-end"
                transition
                className={clsx(
                  "mt-2 rounded-[20px] border-2 border-white bg-primary-dark px-5 focus:outline-none min-w-[200px] h-[200px] overflow-y-auto",
                  "transition duration-100 ease-in scroll-smooth no-scrollbar"
                )}
              >
                {PROVIDER_OPTIONS.map((item) => (
                  <ListboxOption
                    key={item.value}
                    value={item}
                    className="text-white text-sm group flex cursor-pointer items-center gap-2 py-2 select-none hover:text-primary-yellow border-b boder-b-[#62616b] "
                  >
                    {item.label}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          ) : null}

          {/* SORT BY FILTER */}

          <Listbox as="div" className="lg:flex-none flex-1" value={selectedSortByFilter} onChange={setSelectedSortByFilter}>
            <ListboxButton
              className={clsx(
                "w-full lg:w-[200px] relative block rounded-lg bg-white py-2 pr-8 pl-5 text-left text-sm/6 text-primary-dark",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            >
              Sort By: {selectedSortByFilter ? selectedSortByFilter.label : SORT_OPTIONS[0].label}
              <ChevronDownIcon className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-primary-dark" aria-hidden="true" />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom-end"
              transition
              className={clsx(
                "mt-2 rounded-[20px] border-2 border-white bg-primary-dark px-5 focus:outline-none min-w-[200px] overflow-y-auto",
                "transition duration-100 ease-in scroll-smooth no-scrollbar"
              )}
            >
              {SORT_OPTIONS.map((item) => (
                <ListboxOption
                  key={item.value}
                  value={item}
                  className="text-white text-sm group flex cursor-pointer items-center gap-2 py-2 select-none hover:text-primary-yellow border-b boder-b-[#62616b] last-of-type:border-0"
                >
                  <div className="text-sm/6 text-white">{item.label}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      ) : null}
    </>
  );
};

export default GamesCategoryFilters;
