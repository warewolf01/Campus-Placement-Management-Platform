function getCurrentStudent(){
    const studentData = localStorage.getItem("currentStudent");

    if(!studentData){
        return null;
    }
    return JSON.parse(studentData);
}

//protect Student pages
function authGuard() {
    const student = getCurrentStudent();

    if (!student) {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = "../login.html";
    }

    return student;
}


// Log Out
function logout() {
    localStorage.removeItem("currentStudent");
    window.location.href = "../index.html";
}

//Get all Jobs 
function getAllJobs(){
    const jobsData = localStorage.getItem("jobs");

    if(!jobsData){
        return [];
    }
    return JSON.parse(jobsData);
}

//Get all Applications
function getAllApplications(){
    const applicationaData = localStorage.getItem("applications");

    if(!applicationaData){
        return [];
    }
    return JSON.parse(applicationaData);
}