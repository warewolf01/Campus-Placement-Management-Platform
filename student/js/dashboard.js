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
        
function isEligible(student, job) {        //--> to check the eligibility of the student
    const branchEligible = job.branches.includes(student.branch);
    const cgpaEligible = student.cgpa >= job.minCGPA;
            
    return branchEligible && cgpaEligible;
}


const eligibleJobs = allJobs.filter(function(job) {

    return isEligible(currentStudent, job);

});

const eligibleJobCount = eligibleJobs.length;

const eligibilitySnapshot = document.getElementById("eligibilitySnapshot");

eligibilitySnapshot.innerHTML = `
    <h4>Placement Eligibility</h4>
    <p>Eligible for ${eligibleJobCount} of ${allJobs.length} postings</p>
`;

const appliedjobId = myApplications.map(function(application){
    return application.jobId;
});


const availableJob = allJobs.filter(function(job){

    const notApplied = !appliedjobId.includes(job.id);
    const eligible = isEligible(currentStudent, job);

    return notApplied && eligible;
});

availableJob.sort(function(a, b) {
    return new Date(a.deadline) - new Date(b.deadline);
});

const upcomingJobs = availableJob.slice(0, 3);

const upcomingDeadlines = document.getElementById("upcomingDeadlines");

upcomingJobs.forEach(function(job) {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <h4>${job.company}</h4>
    <p>${job.role}</p>
    <p>Deadline: ${job.deadline}</p>`;

    upcomingDeadlines.appendChild(card);
});

// Handle logout
document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});