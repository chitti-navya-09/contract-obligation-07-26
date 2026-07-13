import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

import "../../styles/addContract.css";

function AddContract() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [contract, setContract] = useState({
    id: "",
    company: "",
    contract: "",
    category: "",
    value: "",
    owner: "",
    status: "Draft",
    compliance: 0,
    renewal: "",

    start_date: "",
    end_date: "",
    days_remaining: 0,
    priority: "Medium",
    description: "",

    paid_amount: "",
    outstanding: "",
    currency: "USD",
    payment_progress: 0,

    renewal_type: "Manual",
    notice_period: "30 Days",
    auto_renewal: "Disabled",

    created_on: "",
    effective_date: "",
    expiry_date: "",
    renewal_reminder: "",

    documents: 0,
    obligations: 0,
    tasks: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContract((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchContract = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://127.0.0.1:8000/contracts/${id}`
        );

        if (!response.ok) {
          throw new Error("Contract not found");
        }

        const data = await response.json();

        setContract(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isEditMode
        ? `http://127.0.0.1:8000/contracts/${id}`
        : "http://127.0.0.1:8000/contracts";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contract),
      });

      if (!response.ok) {
        throw new Error("Failed to save contract");
      }

      alert(
        isEditMode
          ? "Contract updated successfully!"
          : "Contract added successfully!"
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="add-layout">
      <Sidebar />

      <div className="add-main">
        <Header />

        <div className="add-container">

          <div className="page-title">
            <h1>
              {isEditMode
                ? "Edit Contract"
                : "Add New Contract"}
            </h1>

            <p>
              {isEditMode
                ? "Update contract information."
                : "Create a new contract."}
            </p>
          </div>
            <form
                className="contract-form"
                onSubmit={handleSubmit}
            >
                <div className="form-grid">

                    <div className="form-group">
                        <label>Contract Name</label>
                        <input
                        type="text"
                        name="contract"
                        value={contract.contract}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Company</label>
                    <input
                        type="text"
                        name="company"
                        value={contract.company}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={contract.category}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="form-group">
                    <label>Owner</label>
                    <input
                        type="text"
                        name="owner"
                        value={contract.owner}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="form-group">
                     <label>Contract Value</label>
                    <input
                        type="text"
                        name="value"
                        value={contract.value}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="form-group">
                        <label>Status</label>

                        <select
                         name="status"
                             value={contract.status}
                        onChange={handleChange}
                    >
                         <option value="Draft">Draft</option>
                         <option value="Active">Active</option>
                         <option value="Review">Review</option>
                         <option value="Expired">Expired</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Priority</label>

                        <select
                            name="priority"
                            value={contract.priority}
                            onChange={handleChange}
                    >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Start Date</label>

                    <input
                        type="date"
                        name="start_date"
                        value={contract.start_date}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="form-group">
                        <label>End Date</label>

                        <input
                            type="date"
                            name="end_date"
                            value={contract.end_date}
                            onChange={handleChange}
                    />
                    </div>

                    <div className="form-group full-width">
                    <label>Description</label>

                    <textarea
                        rows="5"
                        name="description"
                        value={contract.description}
                        onChange={handleChange}
                    />
                    </div>

                </div>

                <div className="form-buttons">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-btn"
                    >
                        {isEditMode
                            ? "Update Contract"
                            : "Save Contract"}
                    </button>

                </div>
            </form>

                        </div>
                    </div>
                </div>
                );
            }

            export default AddContract;
