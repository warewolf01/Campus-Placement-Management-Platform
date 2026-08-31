# 🎓 Campus Placement Management Platform

A web-based campus placement management platform designed to simplify the placement process for students and placement administrators.

The platform provides a centralized interface where students can create their placement profile, explore job opportunities, check eligibility, apply for jobs, and track their applications. Administrators can monitor registered students, view placement statistics, and manage student account access.

> **Current Status:** Phase 1 — Frontend prototype with browser-based data storage.

---

## 📌 Problem Statement

Campus placement activities are often managed using scattered spreadsheets, forms, emails, and manual communication.

This can make it difficult for students to:

- Find relevant placement opportunities
- Understand whether they are eligible for a job
- Keep track of submitted applications
- Monitor application statuses
- Maintain updated academic and skill information

Placement administrators also need a simple way to monitor students and placement-related data.

This project aims to bring these activities together into one centralized platform.

---

## 💡 Solution

**Campus Placement Management Platform** provides separate interfaces for students and administrators.

### 👨‍🎓 Student Portal

Students can:

- Register and create their placement profile
- Log in securely within the application
- View and edit their profile
- Add academic information and skills
- Browse available placement opportunities
- Check eligibility based on branch and CGPA
- View skill-match percentages for jobs
- Apply for eligible jobs
- Prevent duplicate applications
- Track submitted applications
- View application statuses
- View application statistics on the dashboard
- See upcoming eligible job deadlines

### 🧑‍💼 Admin Portal

Administrators can:

- Log in through the admin account
- View dashboard statistics
- View the number of registered students
- View the number of jobs posted
- View the number of companies
- View total applications
- View branch-wise student distribution
- View registered students
- Block and unblock student accounts

---

## ✨ Key Features

### Authentication

- Student registration
- Student login
- Admin login
- Authentication guards for protected pages
- Student account blocking
- Logout functionality

### Student Dashboard

The dashboard provides:

- **Application Overview**
  - Total Applications
  - Shortlisted
  - Interview
  - Selected

- **Eligibility Snapshot**
  - Shows how many available postings the student is eligible for

- **Upcoming Deadlines**
  - Shows eligible jobs
  - Excludes jobs already applied for
  - Sorts jobs by deadline
  - Displays the three nearest deadlines

### Job Management

Students can:

- Browse available jobs
- View company and role information
- View location and salary
- View minimum CGPA
- View eligible branches
- View required skills
- View skill-match percentage
- Check eligibility
- Apply for eligible jobs

### Profile Management

Students can:

- View personal information
- View academic information
- View skills
- Edit their profile
- Update branch and CGPA
- Update their skills
- Cancel profile editing

### Application Tracking

Students can view:

- Company
- Job role
- Location
- Package
- Application date
- Application status

### Admin Dashboard

Administrators can view:

- Registered student count
- Job count
- Company count
- Application count
- Branch-wise student distribution
- Student account status

Administrators can also:

- Block students
- Unblock students

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Data Storage

- Browser `localStorage`

### Development

- Git
- GitHub
- VS Code
- Live Server

---

## 📁 Project Structure

```text
Campus-Placement-Management-Platform/
│
├── admin/
│   ├── admin-dashboard.html
│   ├── css/
│   │   └── admin.css
│   └── js/
│       ├── admin-common.js
│       └── admin-dashboard.js
│
├── css/
│   └── style.css
│
├── js/
│   ├── login.js
│   └── register.js
│
├── student/
│   ├── applications.html
│   ├── dashboard.html
│   ├── jobs.html
│   ├── profile.html
│   │
│   ├── css/
│   │   ├── jobs.css
│   │   └── student.css
│   │
│   └── js/
│       ├── application.js
│       ├── common.js
│       ├── dashboard.js
│       ├── data.js
│       ├── jobs.js
│       └── profile.js
│
├── index.html
├── login.html
└── register.html
