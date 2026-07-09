import {
  FiSearch,
  FiRotateCcw
} from "react-icons/fi";

import "../../styles/searchbar.css";

function SearchBar() {

  return (

    <div className="filter-container">

      {/* Search */}

      <div className="search-input">

        <FiSearch />

        <input
          type="text"
          placeholder="Search contracts..."
        />

      </div>

      {/* Vendor */}

      <select>

        <option>

          Vendor

        </option>

        <option>

          Microsoft

        </option>

        <option>

          Amazon

        </option>

        <option>

          Salesforce

        </option>

      </select>

      {/* Type */}

      <select>

        <option>

          Contract Type

        </option>

        <option>

          Cloud

        </option>

        <option>

          Software

        </option>

        <option>

          Services

        </option>

      </select>

      {/* Owner */}

      <select>

        <option>

          Owner

        </option>

        <option>

          Sarah Chen

        </option>

        <option>

          David Lee

        </option>

      </select>

      {/* Status */}

      <select>

        <option>

          Status

        </option>

        <option>

          Active

        </option>

        <option>

          Renewal

        </option>

        <option>

          Draft

        </option>

      </select>

      <button className="reset-btn">

        <FiRotateCcw />

        Reset

      </button>

    </div>

  );

}

export default SearchBar;