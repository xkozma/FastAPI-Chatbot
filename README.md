# Full-Stack Application with FastAPI and Vanilla JS

This application is a simple full-stack example using FastAPI for the backend and vanilla JavaScript for the frontend. It demonstrates how to serve a JavaScript application using FastAPI, all running on the same port.

## Description

The application serves a basic HTML page with a JavaScript file. The backend, built with FastAPI, likely provides API endpoints that the JavaScript application can consume.

## Setup

### Prerequisites

-   Python 3.6+
-   Node.js and npm (Node Package Manager)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Set up the backend (FastAPI):**

    -   Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    -   Create a virtual environment (recommended):

        ```bash
        python -m venv venv
        ```

    -   Activate the virtual environment:

        -   On Windows:

            ```bash
            .\venv\Scripts\activate
            ```

        -   On macOS and Linux:

            ```bash
            source venv/bin/activate
            ```

    -   Install the backend dependencies:

        ```bash
        pip install -r requirements.txt
        ```

3.  **Set up the frontend (JavaScript):**

    -   Navigate to the `fullstack-app` directory:

        ```bash
        cd fullstack-app
        ```

## Usage

### Starting the Application

1.  **Start the FastAPI backend:**

    -   From the `backend` directory, run the FastAPI application using Uvicorn:

        ```bash
        uvicorn app.main:app --reload
        ```

        *Note: Replace `main:app` with the actual file and app name if different.*

    -   The `--reload` flag enables automatic reloading upon code changes.

2.  **Access the application:**

    -   Open your web browser and navigate to `http://localhost:8000` (or the appropriate port if configured differently).

## Project Structure

-   `backend/`: Contains the FastAPI backend code.
    -   `main.py`: Main application file.
    -   `static/`: Contains static files (HTML, CSS, JavaScript).
        -   `index.html`: Main HTML file.
        -   `index.js`: Main JavaScript file.
        -   `styles/`: CSS files.
    -   `requirements.txt`: Lists the Python dependencies.
-   `fullstack-app/`: Contains the frontend code (HTML, CSS, JavaScript).

## Further Development

-   Modify the `index.html`, `index.js`, and CSS files in the `static/` directory to change the frontend.
-   Update the FastAPI backend in `main.py` to add API endpoints and functionality.
