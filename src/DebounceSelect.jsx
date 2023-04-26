import React, { useEffect, useState, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { CircularProgress } from "@mui/material";
import useQuery from "../../hooks/useQuery";
import styles from "./styles/DebounceSelect.module.scss";

/**
 * A debounce input select API function that returns a component with an input box and a dynamic dropdown menu that is populated with data retrieved from a specified API endpoint when an input value is selected.
 *
 * @param {Function} onchange - A function to be called when the selected input value changes.
 * @param {Function} apiFunc - The API function to call when an input value is selected.
 * @param {string} [url_prefix] - The prefix for the API endpoint URL with "deb_select" as default value
 * @param {string} placeholder - The placeholder text to display in the input select field.
 * @param {string} optionkey - The key in the API response JSON object to be used as the option label.
 * @param {string} optionValue - The key in the API response JSON object to be used as the option value.
 *
 * @returns {React.Component} A React component with an input box and a dropdown menu that is populated with data retrieved from the specified API endpoint.
 */

const DebounceSelect = ({
  onchange,
  apiFunc,
  url_prefix = "deb_select",
  placeholder,
  optionkey,
  optionValue,
}) => {
  const rootRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [isIntLoading, setIntLoading] = useState(true);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);
  const urlPrefixSelected = `${url_prefix}_grade`;
  const rootClassName = `${url_prefix}_select_deb_root`;

  useEffect(() => {
    let isMounted = true;
    apiFunc(searchText)
      .then((data) => setSuggestions(data))
      .then(() => {
        if (isMounted) {
          setIntLoading(false);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleWindowClick = useCallback((event) => {
    if (!event.target.closest("." + rootClassName)) {
      setIsDropDownVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, []);

  useEffect(() => {
    const toMatch = query[urlPrefixSelected];
    // console.log('urlPrefixSelected', toMatch);
    if (!isIntLoading && toMatch) {
      const suggestion = suggestions.find((data, index) =>
        optionkey ? data[optionkey] == toMatch : index == toMatch
      );
      if (suggestion) {
        setSelectedKey(toMatch);
        setSearchText((optionValue && suggestion[optionValue]) || suggestion);
      }
    }
  }, [isIntLoading, query[urlPrefixSelected]]);

  const handleDebounceFn = (keyword) => {
    apiFunc(keyword).then((data) => setSuggestions(data));
    setIsLoading(false);
  };

  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);
  function handleInputChange(event) {
    setIsLoading(true);
    setSearchText(event.target.value);
    setQuery({ ...query, [urlPrefixSelected]: "" });
    setSelectedKey(null);
    debounceFn(event.target.value);
    onchange?.(null);
  }

  const handleSuggestionClick = (suggestion, index) => {
    const selectedItem = optionkey ? suggestion[optionkey] : index;
    if (selectedItem === selectedKey) {
      setQuery({ ...query, [urlPrefixSelected]: "" });
      setSelectedKey(null);
      setSearchText("");
      onchange?.(null);
    } else {
      setSelectedKey(selectedItem);
      setSearchText((optionValue && suggestion[optionValue]) || suggestion);
      setQuery({ ...query, [urlPrefixSelected]: selectedItem });
      onchange?.(suggestion);
    }
  };

  return (
    <div ref={rootRef} className={`${styles.autocomplete} ${rootClassName}`}>
      <label style={{ width: "100%" }}>
        <input
          type="text"
          value={searchText}
          onFocus={() => {
            setIsDropDownVisible(true);
          }}
          onChange={handleInputChange}
          // onBlur={() => {
          //   setTimeout(() => setIsDropDownVisible(false), 300);
          // }}
          placeholder={placeholder}
        />
      </label>

      {isDropDownVisible ? (
        <div className={styles.suggestionsOverlay}>
          <div className={styles.suggestionBody}>
            {isLoading && (
              <div className={styles.loading}>
                <CircularProgress />
              </div>
            )}
            {searchText && !isLoading && suggestions.length == 0 && (
              <div className={styles.noData}>No result found!</div>
            )}
            <div className={styles.result}>
              {suggestions.map((suggestion, index) => {
                const isSelected = optionkey
                  ? suggestion[optionkey] == selectedKey
                  : index === selectedKey;
                return (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion, index)}
                    className={`${styles.item} ${
                      (isSelected && styles.suggestionActive) || ""
                    }`}>
                    <span>
                      {(optionValue && suggestion[optionValue]) || suggestion}
                    </span>
                    {isSelected && (
                      <i
                        className="ri-check-line"
                        style={{ marginLeft: "8px" }}></i>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DebounceSelect;
