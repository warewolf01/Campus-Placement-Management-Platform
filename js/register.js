// JavaScript for student registration page
// Follow the project's required plain-style coding conventions.

// Get references to DOM elements used by the registration logic
function getElements(){
  return {
    branchEl: document.getElementById('branch'),
    registerForm: document.getElementById('registrationForm'),
    nameEl: document.getElementById('name'),
    emailEl: document.getElementById('email'),
    passwordEl: document.getElementById('password'),
    confirmEl: document.getElementById('confirmPassword'),
    cgpaEl: document.getElementById('cgpa'),
    otherSkillEl: document.getElementById('otherSkill')
  };
}

// Show the correct skills div for the selected branch and hide others
function handleBranchChange(){
  var els = getElements();
  els.branchEl.addEventListener('change', function(){
    var val = els.branchEl.value;

    // Determine which skills div should be visible. IT uses the CSE list.
    var showId = '';
    if (val === 'CSE' || val === 'IT'){
      showId = 'skillsCSE';
    } else if (val === 'ECE'){
      showId = 'skillsECE';
    } else if (val === 'EE'){
      showId = 'skillsEE';
    } else if (val === 'ME'){
      showId = 'skillsME';
    } else if (val === 'Civil'){
      showId = 'skillsCivil';
    } else {
      showId = '';
    }

    // List of all group ids
    var all = ['skillsCSE','skillsECE','skillsEE','skillsME','skillsCivil'];
    var i;
    for (i = 0; i < all.length; i++){
      var id = all[i];
      var el = document.getElementById(id);
      if (el){
        if (id === showId){
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
    }
  });
}

// Collect selected skills from the currently visible skills div and the otherSkill input
function collectSkills(){
  var els = getElements();
  var branch = els.branchEl.value;
  var visibleId = '';
  if (branch === 'CSE' || branch === 'IT'){
    visibleId = 'skillsCSE';
  } else if (branch === 'ECE'){
    visibleId = 'skillsECE';
  } else if (branch === 'EE'){
    visibleId = 'skillsEE';
  } else if (branch === 'ME'){
    visibleId = 'skillsME';
  } else if (branch === 'Civil'){
    visibleId = 'skillsCivil';
  }

  var skills = [];
  if (visibleId){
    var group = document.getElementById(visibleId);
    if (group){
      // collect checkbox inputs inside the visible div
      var inputs = group.getElementsByTagName('input');
      var j;
      for (j = 0; j < inputs.length; j++){
        var inp = inputs[j];
        if (inp.type === 'checkbox' && inp.checked){
          skills.push(inp.value);
        }
      }
    }
  }

  // include other skill if provided
  var other = els.otherSkillEl.value;
  if (other){
    // trim whitespace — use simple approach to remain ES5-compatible
    var trimmed = other.replace(/^\s+|\s+$/g, '');
    if (trimmed !== ''){
      skills.push(trimmed);
    }
  }

  return skills;
}

// Handle the form submission: validate and save student to localStorage
function handleRegister(){
  var els = getElements();
  els.registerForm.addEventListener('submit', function(e){
    e.preventDefault();

    var name = els.nameEl.value;
    var email = els.emailEl.value;
    var password = els.passwordEl.value;
    var confirm = els.confirmEl.value;
    var branch = els.branchEl.value;
    var cgpaRaw = els.cgpaEl.value;

    // Basic validations: required fields
    if (!name || !email || !password || !confirm || !branch || cgpaRaw === ''){
      alert('Please fill all required fields.');
      return;
    }

    // password match check
    if (password !== confirm){
      alert('Password and Confirm Password do not match.');
      return;
    }

    // parse cgpa as number
    var cgpa = parseFloat(cgpaRaw);
    if (isNaN(cgpa)){
      alert('CGPA must be a valid number.');
      return;
    }

    // load existing students
    var studentsRaw = localStorage.getItem('students');
    var students = [];
    if (studentsRaw){
      try{
        students = JSON.parse(studentsRaw);
      } catch (ex){
        students = [];
      }
    }

    // duplicate email check using .find()
    var dup = students.find(function(s){ return s.email === email; });
    if (dup){
      alert('An account with this email already exists.');
      return;
    }

    // collect skills from visible group + other skill
    var skills = collectSkills();

    // build student object with exact required shape
    var student = {
      name: name,
      email: email,
      password: password,
      branch: branch,
      cgpa: cgpa,
      skills: skills
    };

    // save to localStorage under "students"
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // redirect to login.html on success
    window.location.href = 'login.html';
  });
}

// Initialize page behavior when script loads
function init(){
  handleBranchChange();
  handleRegister();
}

// Run initialization
init();
