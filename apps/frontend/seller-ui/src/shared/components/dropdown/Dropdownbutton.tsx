'use client'
import { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

// Declare props type
interface DropdownProps {
  options: string[];
  defaultValue?: string;
  onSelect?: (value: string) => void;
}

export default function Dropdown({
  options = [],
  defaultValue = "",
  onSelect = () => {},
}: DropdownProps) {
  const [selected, setSelected] = useState<string>(defaultValue || options[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setOpen(false);
    onSelect(option);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className={styles.button}>
        {selected}
        <span className={styles.arrowBox}>
          <FiChevronUp className={styles.arrow} />
          <FiChevronDown className={styles.arrow} />
        </span>
      </button>

      {open && (
        <ul className={styles.menu}>
          {options.map((option: string) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={styles.item}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
