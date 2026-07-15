import React from "react";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";

function UserRow({ user }) {
  return (
    <tr className="user-row">
      <td>
        <div className="user-info">
          <div className="user-avatar">
            {user.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>

          <div>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
        </div>
      </td>

      <td>{user.role}</td>

      <td>{user.department}</td>

      <td>
        <StatusBadge status={user.status} />
      </td>

      <td>{user.lastActive}</td>

      <td>
        <div className="action-buttons">
          <button className="icon-btn">
            <Pencil size={16} />
          </button>

          <button className="icon-btn delete">
            <Trash2 size={16} />
          </button>

          <button className="icon-btn">
            <MoreVertical size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;