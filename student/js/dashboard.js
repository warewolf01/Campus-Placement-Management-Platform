const currentStudent = authGuard();

if (currentStudent) {
    document.getElementById("welcome").textContent =
        `Welcome, ${currentStudent.name}`;

    // document.getElementById("studentEmail").textContent =
    //     currentStudent.email;
}


// Handle logout
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});