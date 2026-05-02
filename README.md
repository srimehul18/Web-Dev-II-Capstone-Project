# HealthDashboard

HealthDashboard is a modern healthcare web application that enables users to discover doctors, manage appointments, and track healthcare activity through a clean, responsive, and user-friendly interface.

## Live Demo
https://web-dev-ii-capstone-project-zeta.vercel.app/

## Screenshots

### Dashboard
<img width="1918" height="883" alt="image" src="https://github.com/user-attachments/assets/c6744920-f058-4277-9538-3d1dd9eb9377" />


### Doctors Page
<img width="1918" height="907" alt="image" src="https://github.com/user-attachments/assets/0ce30b34-1574-465d-a1fa-2b81ed3eaf8b" />


### Appointments Page
<img width="1919" height="795" alt="image" src="https://github.com/user-attachments/assets/2730edf1-75e8-49ec-8978-05122efcea0d" />

### Home Page
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/18b2d1ac-1932-4530-9bcf-9b601dbd5d0d" />

### Dark Mode
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/33c89924-4aa3-4703-8bd0-82a9161198cb" />




## Features

### Core Features
- Search doctors by specialization
- Browse top recommended doctors
- Filter doctors by availability and rating
- Book appointments with selected doctors
- View, update, and delete appointments
- Responsive design for desktop and mobile

### Dashboard Features
- Upcoming appointment highlight
- Today’s appointments
- Total appointments
- Doctors consulted
- Most visited doctor
- Appointments this week
- Recent appointments with status tags
- Dynamic alerts and insights

### UI/UX Features
- Clean and modern dashboard layout
- Dark mode support
- Smooth micro-interactions
- Context-aware UI

## Key Concepts Implemented
- React Hooks (useState, useEffect, custom hooks)
- Context API for global state management
- Debounced search (1000ms delay)
- Pagination for efficient rendering
- Conditional rendering and dynamic UI
- API integration using Axios
- Derived data and dashboard insights

## Advanced Features
- Debounced search optimization
- Search, filter, and pagination
- Dynamic dashboard insights
- Context-based state management
- API-driven CRUD operations
- Dark mode toggle

## Main Pages

### Home
Introduces the healthcare dashboard and provides navigation to doctors, appointments, and activity.

### Doctors
Allows users to search specialists, browse doctors, filter results, and book appointments.

### Appointments
Enables appointment management:
- Add new appointments
- Update appointment details
- Delete appointments

### Dashboard
Provides an overview of healthcare activity:
- Upcoming appointment highlight
- Today’s appointments
- Total appointments
- Doctors consulted
- Most visited doctor
- Appointments this week
- Recent appointments
- Dynamic alerts

## APIs Used
- MockAPI – Appointment data storage  
- Wikipedia API – Doctor search suggestions  
- RandomUser API – Doctor profile data  

## API Configuration

Base URL:
https://69f320eabd2396bf530f71f6.mockapi.io

Supported Operations:
- GET /Appointments
- POST /Appointments
- PUT /Appointments/:id
- DELETE /Appointments/:id

## Installation

Clone the repository:
git clone <your-repository-url>

Navigate to the project folder:
cd HealthDashboard

Install dependencies:
npm install

Run the development server:
npm run dev

## Key Functionalities

### Appointment Management
- Create, update, and delete appointments
- Store data via API

Fields include:
- Doctor name
- Specialization
- Patient name
- Primary complaint
- Date
- Time

### Doctor Search
- Search by specialization
- Filter by availability and rating
- Debounced input for performance

### Dashboard Insights
- Most visited doctor
- Appointments this week
- Upcoming appointments today
- Next appointment timing
- Recent appointment status

### Dark Mode
- Implemented using Context API
- Tailwind CSS dark mode support

### Responsive Design
- Works across mobile, tablet, and desktop

## Deployment
This project is ready to deploy on Vercel and includes configuration support.

## Future Improvements
- Authentication (login/signup)
- Protected routes
- Role-based access
- Patient profile management
- Appointment status tracking
- Backend database integration
- Notifications (email/SMS)
- Improved accessibility and validation

## Project Purpose
This project was developed as a final semester web development capstone project. It demonstrates frontend development, routing, API integration, CRUD operations, state management, responsive design, and dashboard-based data presentation.

## Author
Mehul Srivastava
