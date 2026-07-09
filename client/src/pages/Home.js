import React from "react";
import { useNavigate } from "react-router-dom";

const contracts = [
  {
    id: "CNT001",
    title: "Software Development Agreement",
    client: "ABC Pvt Ltd",
    status: "Active",
    startDate: "01-07-2026",
    endDate: "30-06-2027",
  },
  {
    id: "CNT002",
    title: "Cloud Service Agreement",
    client: "XYZ Technologies",
    status: "Pending",
    startDate: "15-07-2026",
    endDate: "14-07-2027",
  },
  {
    id: "CNT003",
    title: "Maintenance Contract",
    client: "Global Solutions",
    status: "Completed",
    startDate: "10-01-2026",
    endDate: "09-07-2026",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Contract Repository</h1>

      <input
        type="text"
        placeholder="Search Contract..."
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Title</th>
            <th>Client</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.title}</td>
              <td>{contract.client}</td>
              <td>{contract.status}</td>
              <td>{contract.startDate}</td>
              <td>{contract.endDate}</td>
              <td>
                <button
                  onClick={() => navigate("/contract-details")}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;