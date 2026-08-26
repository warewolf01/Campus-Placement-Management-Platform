// Admin dashboard: live statistics from localStorage + student block / unblock.

// ---------- localStorage helpers ----------

function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
}

function saveStudents(list) {
    localStorage.setItem("students", JSON.stringify(list));
}

// Older student records may not have the property at all, so missing counts as not blocked.
function isBlocked(student) {
    return student.blocked === true;
}

// ---------- statistics ----------

function showStats() {
    const students = getStudents();
    const jobList = JSON.parse(localStorage.getItem("jobs")) || [];
    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    // keep a company name only the first time it appears
    const companies = jobList.map(function (job) {
        return job.company;
    }).filter(function (name, index, all) {
        return all.indexOf(name) === index;
    });

    const cards = [
        { label: "Registered Students", value: students.length },
        { label: "Jobs Posted", value: jobList.length },
        { label: "Companies", value: companies.length },
        { label: "Applications", value: applications.length }
    ];

    document.getElementById("statsRow").innerHTML = cards.map(function (card) {
        return '<div class="stat-card"><h4>' + card.label + "</h4><p>" + card.value + "</p></div>";
    }).join("");
}

function showBranchTable() {
    const students = getStudents();
    const body = document.getElementById("branchBody");
    const empty = document.getElementById("branchEmpty");

    // turn the student list into { CSE: 4, ECE: 2, ... }
    const counts = students.reduce(function (result, student) {
        const branch = student.branch || "Not set";
        result[branch] = (result[branch] || 0) + 1;
        return result;
    }, {});

    const branches = Object.keys(counts).sort();

    body.innerHTML = branches.map(function (branch) {
        const count = counts[branch];
        const share = Math.round((count / students.length) * 100);
        return "<tr><td>" + branch + "</td><td>" + count + "</td><td>" + share + "%" +
            '<div class="bar-track"><span class="bar-fill" style="width:' + share + '%"></span></div>' +
            "</td></tr>";
    }).join("");

    empty.style.display = students.length === 0 ? "block" : "none";
}

// ---------- student management ----------

function showStudents() {
    const students = getStudents();
    const body = document.getElementById("studentsBody");
    const empty = document.getElementById("studentsEmpty");

    body.innerHTML = students.map(function (student) {
        const blocked = isBlocked(student);

        const status = blocked
            ? '<span class="badge badge-blocked">Blocked</span>'
            : '<span class="badge badge-active">Active</span>';

        const button = blocked
            ? '<button type="button" class="btn btn-outline btn-small" data-email="' + student.email + '">Unblock</button>'
            : '<button type="button" class="btn btn-danger btn-small" data-email="' + student.email + '">Block</button>';

        return '<tr class="' + (blocked ? "row-blocked" : "") + '">' +
            "<td>" + student.name + "</td>" +
            "<td>" + student.email + "</td>" +
            "<td>" + student.branch + "</td>" +
            "<td>" + student.cgpa + "</td>" +
            "<td>" + status + "</td>" +
            '<td class="actions">' + button + "</td>" +
            "</tr>";
    }).join("");

    empty.style.display = students.length === 0 ? "block" : "none";
}

// Email is used as the identifier because students have no id field.
function toggleBlock(email) {
    const students = getStudents();

    const student = students.find(function (item) {
        return item.email === email;
    });

    if (!student) {
        return;
    }

    student.blocked = !isBlocked(student);
    saveStudents(students);
    showStudents();
}

// ---------- page start ----------


