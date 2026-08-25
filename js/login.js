const loginbtn  = document.getElementById("loginBtn");

loginbtn.addEventListener("click",function(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;


    // ------------------------------------------
    // ADMIN AUTHENTICATION
    // ------------------------------------------

    const ADMIN_EMAIL = "admin@hub.com";
    const ADMIN_PASSWORD = "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

        const admin = {
            email: ADMIN_EMAIL,
            role: "admin"
        };

        localStorage.setItem("currentAdmin", JSON.stringify(admin));

        window.location.href = "admin/admin-dashboard.html";

        return;
    }

    // STUDENT AUTHENTICATION
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