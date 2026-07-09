// Mock user directory — TODO: replace with GET /users once the server's
// src/users controller exposes a list endpoint.
export async function getUsers() {
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: 1, name: "Arjun Mehta", email: "arjun.mehta@contractiq.com", role: "Administrator", status: "Active", lastActive: "Just now" },
    { id: 2, name: "Priya Nair", email: "priya.nair@contractiq.com", role: "Obligation Owner", status: "Active", lastActive: "2 hrs ago" },
    { id: 3, name: "Karan Shah", email: "karan.shah@contractiq.com", role: "Compliance Reviewer", status: "Active", lastActive: "5 hrs ago" },
    { id: 4, name: "Meera Rao", email: "meera.rao@contractiq.com", role: "Legal Signatory", status: "Active", lastActive: "Yesterday" },
    { id: 5, name: "Dev Anand", email: "dev.anand@contractiq.com", role: "Obligation Owner", status: "Invited", lastActive: "\u2014" },
  ];
}

export default getUsers;
