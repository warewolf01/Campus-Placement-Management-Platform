const currentStudent = authGuard();

const nameElement = document.getElementById("viewName");
const emailElement = document.getElementById("viewEmail");
const branchElement = document.getElementById("viewBranch");
const cgpaElement = document.getElementById("viewCgpa");
const skillsElement = document.getElementById("viewSkills");

nameElement.textContent = currentStudent.name;
emailElement.textContent = currentStudent.email;
branchElement.textContent = currentStudent.branch;
cgpaElement.textContent = currentStudent.cgpa;
skillsElement.textContent = currentStudent.skills.join(", ");

const profileView = document.getElementById("profileView");
const profileEdit = document.getElementById("profileEdit");
const editProfileBtn = document.getElementById("editProfileBtn");

const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editBranch = document.getElementById("editBranch");
const editCgpa = document.getElementById("editCgpa");
const editSkills = document.getElementById("editSkills");

editProfileBtn.addEventListener("click", function(){

    editName.value = currentStudent.name;
    editEmail.value = currentStudent.email;
    editBranch.value = currentStudent.branch;
    editCgpa.value = currentStudent.cgpa;
    editSkills.value = currentStudent.skills.join(", ");

    profileView.style.display = "none";
    profileEdit.style.display = "block";

});

const profileForm = document.getElementById("profileForm");

profileForm.addEventListener("submit", function(e){
    e.preventDefault();

    const updatedName = editName.value;
    const updatedBranch = editBranch.value;
    const updatedCgpa = editCgpa.value;
    const updatedSkills = editSkills.value.split(",")
                                    .map(skill => skill.trim())
                                    .filter(skill => skill !== "");
                                    
    const students = JSON.parse(localStorage.getItem("students"));
    const studentIndex = students.findIndex(student => student.email === currentStudent.email);  
    
    students[studentIndex].name = updatedName;
    students[studentIndex].branch = updatedBranch;
    students[studentIndex].cgpa = updatedCgpa;
    students[studentIndex].skills = updatedSkills;

    localStorage.setItem("students", JSON.stringify(students));

    const updatedStudent = students[studentIndex];

    localStorage.setItem("currentStudent",JSON.stringify(updatedStudent));
        
    //Now uptading in the view mode
    nameElement.textContent = updatedStudent.name;
    emailElement.textContent = updatedStudent.email;
    branchElement.textContent = updatedStudent.branch;
    cgpaElement.textContent = updatedStudent.cgpa;
    skillsElement.textContent = updatedStudent.skills.join(", ");
    profileEdit.style.display = "none";
    profileView.style.display = "block";
    
});

//    Cancel Button    //
const cancelEditBtn = document.getElementById("cancelEditBtn");
cancelEditBtn.addEventListener("click", function() {

    profileEdit.style.display = "none";
    profileView.style.display = "block";

});