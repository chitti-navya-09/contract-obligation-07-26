import { useNavigate } from "react-router-dom";

import contracts from "../../data/contracts";

import StatusBadge from "../StatusBadge/StatusBadge";
import ProgressBar from "../ProgressBar/ProgressBar";

import {
  FiMoreVertical,
  FiEye,
} from "react-icons/fi";

import "../../styles/table.css";

function ContractTable() {
  const navigate = useNavigate();

  const openContractDetails = () => {
    navigate("/contract-details");
  };

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Category</th>
            <th>Owner</th>
            <th>Value</th>
            <th>Status</th>
            <th>Compliance</th>
            <th>Renewal</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="company">
                  <div className="company-logo">
                    {item.company.charAt(0)}
                  </div>

                  <div>
                    <h4
                      onClick={openContractDetails}
                      style={{
                        cursor: "pointer",
                        color: "#5B3DF5",
                        fontWeight: "600",
                      }}
                    >
                      {item.contract}
                    </h4>

                    <p>{item.company}</p>
                  </div>
                </div>
              </td>

              <td>{item.category}</td>

              <td>
                <div className="owner">
                  <div className="owner-avatar">
                    {item.owner.charAt(0)}
                  </div>

                  {item.owner}
                </div>
              </td>

              <td>{item.value}</td>

              <td>
                <StatusBadge status={item.status} />
              </td>

              <td>
                <ProgressBar value={item.compliance} />
              </td>

              <td>{item.renewal}</td>

              <td>
                <div className="actions">
                  <FiEye
                    style={{ cursor: "pointer" }}
                    onClick={openContractDetails}
                  />

                  <FiMoreVertical />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContractTable;