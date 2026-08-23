const currentStudent = authGuard(); // protect page access without login
const allJobs = getAllJobs(); // jobs from localstorage --> and it is an array

function isEligible(student, job) {
    const branchEligible = job.branches.includes(student.branch);
    const cgpaEligible = student.cgpa >= job.minCGPA;

    return branchEligible && cgpaEligible;
}


function calculateSkillMatch(student,job){
    let matchedSkills = 0;
    job.requiredSkills.forEach(function(skill){
        if(student.skills.includes(skill)){
            matchedSkills++;
        }
    });

    return Math.round((matchedSkills / job.requiredSkills.length) * 100);
}

function createApplication(student, job) {
    return {
        id: Date.now(),
        studentEmail: student.email,
        jobId: job.id,
        company: job.company,
        role: job.role,
        status: "Applied",
        appliedAt: new Date().toLocaleDateString()
    };
}

function saveApplication(application) {
    const applications = getAllApplications();

    applications.push(application);

    localStorage.setItem("applications",JSON.stringify(applications));
}

function hasAlreadyApplied(student, job) {
    const applications = getAllApplications();

    return applications.some(function(application) {
        return application.studentEmail === student.email &&
               application.jobId === job.id;
    });
}


function renderJobs() {
    const jobsContainer = document.getElementById("jobsContainer");

    allJobs.forEach(function (job) {
        const eligible = isEligible(currentStudent, job);
        const skillMatch = calculateSkillMatch(currentStudent, job);

        const statusClass = eligible ? "status-eligible" : "status-not-eligible";

        const statusText = eligible ? "Eligible" : "Not Eligible";

        const jobCard = document.createElement("article");

        jobCard.className = "job-card";
        jobCard.innerHTML = `
            <div class="job-card-header">
                <div>
                    <h3 class="job-company">${job.company}</h3>
                    <p class="job-role">${job.role}</p>
                </div>

                <span class="status-badge ${statusClass}">
                    <span class="status-dot" aria-hidden="true"></span>
                    ${statusText}
                </span>
            </div>

            <div class="job-meta-row">
                <span class="job-meta-item">
                    📍 ${job.location}
                </span>

                <span class="job-meta-item job-salary">
                    💰 ${job.salary}
                </span>
            </div>

            <hr class="job-divider">

            <div class="job-details">
                <div class="job-detail-row">
                    <span class="detail-label">Min. CGPA</span>
                    <span class="detail-value">${job.minCGPA}</span>
                </div>

                <div class="job-detail-row">
                    <span class="detail-label">Branches</span>
                    <div class="branch-tags">
                        ${job.branches
                            .map(function (branch) {
                                return `<span class="branch-tag">${branch}</span>`;
                            })
                            .join("")}
                    </div>
                </div>
            </div>

            <div class="job-skills">
                <div class="job-skills-label">Required Skills</div>

                <div class="skill-tags">
                    ${job.requiredSkills
                .map(function (skill) {
                    return `<span class="skill-tag">${skill}</span>`;
                })
                .join("")}
                </div>
            </div>
            
            <div class="skill-match-section">
                <div class="skill-match-header">
                    <span class="skill-match-label">Skill Match</span>
                    <span class="skill-match-value">${skillMatch}%</span>
                </div>

                <div
                    class="skill-match-bar"
                    role="progressbar"
                    aria-valuenow="${skillMatch}"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Skill match percentage"
                >
                    <div
                        class="skill-match-fill"
                        style="width: ${skillMatch}%"
                    ></div>
                </div>
            </div>

            <div class="job-card-footer">
                <span class="job-deadline">
                    Deadline: ${job.deadline}
                </span>

                <button type="button" class="btn-apply">
                    Apply Now
                </button>
            </div>
        `;

        jobsContainer.appendChild(jobCard);

        const applyButton = jobCard.querySelector(".btn-apply");
        applyButton.addEventListener("click",function(){
            if (!isEligible(currentStudent, job)) {
                // console.log("Student is not eligible for this job.");
                alert("Student is not eligible for this job.");
                return;
            }

            if(hasAlreadyApplied(currentStudent,job)){
                alert("Already Applied");
                return;
            }
            const application = createApplication(currentStudent,job);
            saveApplication(application);
        });
    });
}

renderJobs();


// ${job.requiredSkills.map(function(skill) {
//     const matched = currentStudent.skills.includes(skill);

//     const skillClass = matched
//         ? "skill-tag matched"
//         : "skill-tag unmatched";

//     return `<span class="${skillClass}">${skill}</span>`;
// }).join("")}