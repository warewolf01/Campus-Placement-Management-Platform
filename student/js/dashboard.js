const currentStudent = authGuard();
const allJobs = getAllJobs();

const allApplications = getAllApplications();

const myApplications = allApplications.filter(
    application => application.studentEmail === currentStudent.email
);
const totalApplications = myApplications.length;

const shortlistedApplications = myApplications.filter(
    application => application.status === "Shortlisted"
);
const shortlistedCount = shortlistedApplications.length;

const interviewApplications = myApplications.filter(
    application => application.status === "Interview"
);
const interviewCount = interviewApplications.length;

const selectedApplications = myApplications.filter(
    application => application.status === "Selected"
);
const selectedCount = selectedApplications.length;

const statsRow = document.getElementById("statsRow");

statsRow.innerHTML = `
    <div class="card stat-card">
        <h4>Total Applications</h4>
        <p>${totalApplications}</p>
    </div>

    <div class="card stat-card">
        <h4>Shortlisted</h4>
        <p>${shortlistedCount}</p>
    </div>

    <div class="card stat-card">
        <h4>Interview</h4>
        <p>${interviewCount}</p>
    </div>

    <div class="card stat-card">
        <h4>Selected</h4>
        <p>${selectedCount}</p>
    </div>`;










