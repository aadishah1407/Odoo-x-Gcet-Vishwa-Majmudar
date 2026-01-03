# Odoo-x-Gcet-Vishwa-Majmudar
# video link in the Repository it self so donwload the video and check it 
# Dayflow - Human Resource Management System (HRMS)

Dayflow HRMS is a comprehensive Human Resource Management System designed to streamline HR operations for businesses. It features an employee dashboard for individual management and an admin dashboard for overall HR control, covering aspects like attendance, leave, payroll, and user management.

## Features

-   **Employee Dashboard:**
    -   View and edit personal profile.
    -   Check in/out for attendance, view attendance records.
    -   Apply for leave and check leave status.
    -   View payroll details.
    -   Dynamic display of today's attendance status (Present, Inactive, Not Checked In).
-   **Admin Dashboard:**
    -   Manage users (employees and admins).
    -   Approve/Reject leave requests.
    -   View and update payroll for all employees.
    -   View overall attendance records.
-   **User Authentication:** Secure login for both employees and administrators.
-   **Email Notifications:** For leave request approvals/rejections and admin notifications for new leave requests.

## Technologies Used

-   **Frontend:** React.js, Tailwind CSS
-   **Backend:** Node.js, Express.js
-   **Database:** MySQL
-   **Other:** Nodemon (for backend development), Nodemailer (for email functionality)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js & npm:** (LTS version recommended)
-   **MySQL Server:** (e.g., MySQL Community Server)
-   A MySQL client (e.g., MySQL Workbench, `mysql` command-line client)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dayflow-hrms.git
    cd dayflow-hrms
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**
    The `npm install` command in the root directory will install both frontend and backend dependencies.

## Database Setup

1.  **Start your MySQL Server.**

2.  **Configure Database Credentials:**
    -   Open `db.js` in the project's root directory.
    -   Update the `host`, `user`, `password`, and `database` fields with your MySQL server's credentials.
    -   **Important:** Replace `password: ''` with your actual MySQL `root` password, or credentials for a dedicated user.

    ```javascript
    // db.js
    const mysql = require('mysql');

    const db = mysql.createConnection({
      host: 'localhost', // Your MySQL host
      user: 'root',      // Your MySQL username
      password: '',      // Your MySQL password
      database: 'dayflow_hrms' // The database name
    });

    // ... rest of the file
    ```

3.  **Execute the Schema:**
    -   Open your preferred MySQL client (e.g., MySQL Workbench, `mysql` command-line tool).
    -   Connect to your MySQL server using the credentials configured above.
    -   Execute the SQL script located at `dayflow_hrms_schema.sql`. This script will create the `dayflow_hrms` database, all necessary tables (users, leaves, attendance, payroll), and populate them with initial data (including admin and employee users).

    Example using MySQL command-line client:
    ```bash
    mysql -u your_username -p
    # Enter your password when prompted
    SOURCE /path/to/your/dayflow-hrms/dayflow_hrms_schema.sql;
    ```
    (Replace `your_username` and `/path/to/your/dayflow-hrms/dayflow_hrms_schema.sql` accordingly.)

## Running the Application

1.  **Start the Backend Server:**
    Open a terminal in the project's root directory and run:
    ```bash
    npm run server
    ```
    This will start the Express.js server, typically on `http://localhost:3001`.

2.  **Start the Frontend Application:**
    Open a **new terminal** in the project's root directory and run:
    ```bash
    npm start
    ```
    This will start the React development server, usually opening the application in your browser at `http://localhost:3000`.

## Login Credentials (Initial Data)

The `dayflow_hrms_schema.sql` populates the database with the following default users:

-   **Admin User:**
    -   Email: `admin@company.com`
    -   Password: `password`
-   **Employee User:**
    -   Email: `john@company.com`
    -   Password: `password`

You can use these credentials to log in and test the application.
