Task Management System

A full-stack, enterprise-grade Task Management application built with Next.js for the frontend and Node.js/Express with TypeScript and MongoDB for the backend.

---

Features

* Task Operations: Create, edit, delete, and view detailed task pages.
* Status & Priority Tracking: Filter and organize tasks by status and priority levels.
* Modern UI: Built with Next.js, CSS modules/Tailwind, and modern responsive components.
* RESTful API: Clean backend architecture with modular routes, controllers, and MongoDB models.
* Type-Safe: End-to-end TypeScript integration across both frontend and backend.

---

Tech Stack

Frontend

* Framework: Next.js (App Router)
* Language: TypeScript
* Styling: CSS / Tailwind CSS
* API Client: Fetch / Axios

Backend

* Runtime: Node.js
* Framework: Express.js
* Database: MongoDB (via Mongoose)
* Language: TypeScript

---

Getting Started

Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* MongoDB instance running locally or via MongoDB Atlas

---

1. Clone the Project

Clone the repository to your local machine and navigate to the project directory:

```bash
git clone https://github.com/NethmiMandira/Task-Management-System.git
cd Task-Management-System

```

---

2. Backend Setup
3. Navigate to the backend directory:
```bash
cd backend

```


4. Install dependencies:
```bash
npm install

```


5. Create a .env file in the backend/ directory (refer to .env.example):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management

```
6.Seed the database with initial sample tasks:
```bash
npm run seed

```


7. Start the development server:
```bash
npm run dev

```


The backend API will run on http://localhost:5000.

---

3. Frontend Setup
4. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend

```


5. Install dependencies:
```bash
npm install

```


6. Start the Next.js development server:
```bash
npm run dev

```


Open http://localhost:3000 in your browser.



