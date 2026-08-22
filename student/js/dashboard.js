const currentStudent = localStorage.getItem("currentStudent");

if (!currentStudent) {
    alert("You are not logged in. Redirecting to login page.");
    window.location.href = "../login.html";
}

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentStudent');
    window.location.href = '../index.html';
});