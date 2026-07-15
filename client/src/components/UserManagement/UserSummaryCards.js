import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
} from "lucide-react";

const cards = [
  {
    title: "TOTAL USERS",
    value: 7,
    icon: Users,
    iconClass: "users-icon",
  },
  {
    title: "ACTIVE",
    value: 6,
    icon: UserCheck,
    iconClass: "active-icon",
  },
  {
    title: "INACTIVE",
    value: 1,
    icon: UserX,
    iconClass: "inactive-icon",
  },
  {
    title: "DEPARTMENTS",
    value: 6,
    icon: Building2,
    iconClass: "department-icon",
  },
];

function UserSummaryCards() {
  return (
    <div className="summary-cards">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div className="summary-card" key={card.title}>
            <div>
              <p className="summary-title">{card.title}</p>
              <h2>{card.value}</h2>
            </div>

            <div className={`summary-icon ${card.iconClass}`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserSummaryCards;