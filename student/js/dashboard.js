const currentStudent = authGuard();

if (currentStudent) {
    document.getElementById("welcome").textContent =
        `Welcome, ${currentStudent.name}`;


}


// Handle logout
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});