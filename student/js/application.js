    const currentStudent = authGuard();            // protect page access without login and get the current student data from localstorage
    const allApplications = getAllApplications();  //--> applications from localstorage --> and it is an array

    const myApplications = allApplications.filter(                      //-->gives the applications of the current student
        application => application.studentEmail === currentStudent.email
    );

    const container = document.getElementById("applicationsContainer");
    const template = document.getElementById("applicationCardTemplate");
    
    const emptyState = document.getElementById("emptyState");

    if (myApplications.length > 0) {
        emptyState.style.display = "none";
    }

    myApplications.forEach(application => {
        // console.log("APPLICATION:", application);
        
        const card = template.content.cloneNode(true);

        const companyElement = card.querySelector('[data-field="company"]');
        companyElement.textContent = application.company;

        const roleElement = card.querySelector('[data-field="role"]');
        roleElement.textContent = application.role;

        const locationElement = card.querySelector('[data-field="location"]');
        locationElement.textContent = application.location;
        
        const packageElement = card.querySelector('[data-field="package"]');
        packageElement.textContent = application.package;

        const appliedAtElement = card.querySelector('[data-field="appliedAt"]');
        appliedAtElement.textContent = application.appliedAt;        

        const statusElement = card.querySelector('[data-field="status"]')
        statusElement.textContent = application.status;

        container.appendChild(card);
    });  