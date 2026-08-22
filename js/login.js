// ------------------------------------------
// ADMIN AUTH (TODO - build after student portal is complete)
// This file (or a separate admin-login.js) will later check if the
// logging-in user is an admin, and redirect to admin/dashboard.html
// instead of student/dashboard.html
// ------------------------------------------

// NOTE: No functional changes requested for login logic per instructions.
const loginbtn  = document.getElementById("loginBtn");

loginbtn.addEventListener("click",function(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find(function (student) {
        return student.email === email;
    });

    if (!student) {
        alert("Invalid User");
        return;
    }

    if (student.password !== password) {
        alert("Incorrect password");
        return;
    }

    localStorage.setItem("currentStudent", JSON.stringify(student));

    window.location.href = "student/dashboard.html";

})