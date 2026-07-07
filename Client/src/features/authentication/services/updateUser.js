const BASE_URL = "http://127.0.0.1:8000/api";

export const updateUser = async (userData) => {
    const payload = {
        user_id: userData.user_id,
        role: userData.role,
        full_name: userData.name,
        email: userData.email,
        phone: userData.phone,
        employee_id: userData.employeeId,
        company_name: userData.companyName || "",
        department: userData.department,
        designation: userData.designation,
        location: userData.officeLocation,
        join_date: userData.join_date,
        is_active: userData.is_active
    };
    try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${BASE_URL}/auth/update_user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            let errorMsg = "Failed to update user";
            if (Array.isArray(data.detail)) {
                errorMsg = data.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ');
            } else if (data.detail) {
                errorMsg = data.detail;
            } else if (data.message) {
                errorMsg = data.message;
            }
            throw new Error(errorMsg);
        }

        return data;

    } catch (error) {
        console.error("Update User Error:", error.message);
        throw error;
    }
};
