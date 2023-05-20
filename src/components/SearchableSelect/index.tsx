import React, { useEffect, useRef, useState } from "react";
import { OptionType } from "../../types";
import styles from "./SearchableSelect.module.css";

interface SearchableSelectProps {
  options: OptionType[];
  fieldlabel: string;
  selectedOption: OptionType | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionType | null>>;
  addHandler: (option: OptionType | null) => void;
}

const SeachableSelect: React.FC<SearchableSelectProps> = ({
  options,
  fieldlabel,
  addHandler,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: OptionType) => {
    setIsOpen(false);
    setSearchQuery("");
    addHandler(option);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-100">
      <label>{fieldlabel}</label>
      <div className={styles.selectContainer} ref={selectRef}>
        <div
          className={`${styles.selectHeader} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="text"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Product ABC"
          />
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            <ul className={styles.optionsList}>
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={styles.option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeachableSelect;
