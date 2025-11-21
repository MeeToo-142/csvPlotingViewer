import { useEffect, useRef } from "react";
import "../../index.css";
import "./DropDown.css";
import type { DropdownProps } from "../../Constants";



export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  id,
  openId,
  setOpenId,
  selectedItems,
  setSelectedItems,
  multiSelect = true,
}) => {
  const isOpen = openId === id;
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpenId(isOpen ? null : id);

  const handleCheckboxChange = (item: string) => {
    if (multiSelect) {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter(i => i !== item));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    } else {
      setSelectedItems([item]);
      setOpenId(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenId]);

  return (
    <div ref={containerRef} className={`plotselection-box ${isOpen ? "open" : ""}`}>
      <button className="ddropdown-boxbtn" onClick={toggle}>
        {label} <span className={`arrow ${isOpen ? "open" : ""}`} />
      </button>
      {isOpen && (
        <ul className="ddropdown-itemsbox">
          {items.map((item, index) => (
            <li key={index} className="ddropdown-item">
              <label
                className="ddropdown-label"
                onMouseDown={(e) => e.stopPropagation()}
              >
                {multiSelect && (
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(String(item))}
                    onChange={() => handleCheckboxChange(String(item))}
                  />
                )}
                <span onClick={() => !multiSelect && handleCheckboxChange(String(item))}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
