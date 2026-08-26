function getCurrentAdmin() {

    const adminData = localStorage.getItem("currentAdmin");

    if (!adminData) {
        return null;
    }

    return JSON.parse(adminData);
}