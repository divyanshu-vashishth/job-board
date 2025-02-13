# Job Board Application

A modern job board application built with Next.js, TypeScript, Drizzle ORM, and Tailwind CSS.

## Features

**For Candidates:**

*   **Browse Job Listings:** Explore a wide range of job opportunities across different categories and locations.
*   **Filtering & Search:**
    *   Filter jobs by **category**, **location**, and **salary range** (coming soon).
    *   Utilize the **search bar** to quickly find jobs based on keywords in job titles, descriptions, or company names.
*   **Job Details:** View detailed information about each job posting, including description, company details, location, category, and number of positions.
*   **Easy Application:** Apply for jobs directly through the platform.

**For Companies:**

*   **Post New Jobs:** Create and publish job listings with detailed descriptions, categories, locations, and company information.
*   **Job Management:**
    *   **Edit** existing job posts to keep information up-to-date.
    *   **Delete** job posts that are no longer available.
    *   **View Applications:** Access a list of all applications submitted for each job posting.

**General:**

*   **Responsive Design:**  Built with **Tailwind CSS** and **shadcn/ui** components to ensure a seamless and user-friendly experience on all devices (desktops, tablets, and mobile phones).
*   **Modern UI:** Clean and intuitive user interface for both job seekers and companies.

## Technologies Used

*   **Next.js:**  React framework for building server-rendered and dynamic web applications.
*   **TypeScript:**  Superset of JavaScript that adds static typing.
*   **Drizzle ORM:**  Type-safe and efficient Object-Relational Mapper for interacting with the database.
*   **PostgreSQL:**  Relational database for storing job listings and application data.
*   **Tailwind CSS:**  Utility-first CSS framework for rapid UI development.
*   **shadcn/ui:**  Reusable UI components built with Radix UI and Tailwind CSS.
*   **Server Actions:** Next.js Server Actions for handling server-side logic and database interactions.

## Installation and Setup

Follow these steps to set up and run the Job Board application locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd job-board
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up your environment variables:**
    *   Create a `.env` file in the root directory.
    *   Copy the contents from `.env.example` into `.env` and fill in your PostgreSQL database connection details.

4.  **Generate Drizzle migration files:**
    ```bash
    pnpm db:generate
    ```

5.  **Push database schema to your PostgreSQL database:**
    ```bash
    pnpm db:push
    ```

6.  **Seed the database with initial data (optional):**
    ```bash
    pnpm db:seed
    ```

7.  **Start the development server:**
    ```bash
    pnpm dev
    ```

    The application will be accessible at `http://localhost:3000`.
