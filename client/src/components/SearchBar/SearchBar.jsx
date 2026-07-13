import {
  FiSearch,
  FiRotateCcw,
} from "react-icons/fi";

import "../../styles/searchbar.css";

function SearchBar({
  searchTerm,
  setSearchTerm,
  vendor,
  setVendor,
  contractType,
  setContractType,
  owner,
  setOwner,
  status,
  setStatus,
  resetFilters,
}) {
  return (
    <div className="filter-container">
      {/* Search */}
      <div className="search-input">
        <FiSearch />

        <input
          type="text"
          placeholder="Search contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Vendor */}
      <select
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      >
        <option value="">Vendor</option>
        <option value="Microsoft">Microsoft</option>
        <option value="Amazon AWS">Amazon AWS</option>
        <option value="Salesforce">Salesforce</option>
        <option value="Adobe">Adobe</option>
      </select>

      {/* Contract Type */}
      <select
        value={contractType}
        onChange={(e) => setContractType(e.target.value)}
      >
        <option value="">Contract Type</option>
        <option value="Cloud Service">Cloud Service</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software">Software</option>
      </select>

      {/* Owner */}
      <select
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      >
        <option value="">Owner</option>
        <option value="Sarah Chen">Sarah Chen</option>
        <option value="David Lee">David Lee</option>
        <option value="John Smith">John Smith</option>
        <option value="Emily">Emily</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Status</option>
        <option value="Active">Active</option>
        <option value="Review">Review</option>
        <option value="Draft">Draft</option>
      </select>

      {/* Reset */}
      <button
        className="reset-btn"
        onClick={resetFilters}
      >
        <FiRotateCcw />
        Reset
      </button>
    </div>
  );
}

export default SearchBar;