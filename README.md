# Dino Archive Frontend

The Dino Archive frontend is a React application that displays dinosaur records from a Flask API and allows users to add new dinosaurs to the SQLite database.

## Technologies

- React
- Vite
- JavaScript
- CSS
- React Context API

## Features

- Display all dinosaurs
- Create new dinosaur records
- Automatically update the page after a new dinosaur is added
- Responsive earth-tone design
- Uses React Context for shared state


## How to Run

Clone the repository.

```bash
git clone YOUR-FRONTEND-REPOSITORY-URL
```

Navigate into the project.

```bash
cd dino-archive-frontend
```

Install the required packages.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://127.0.0.1:5000
```

Start the React development server.

```bash
npm run dev
```

The application will usually be available at:

```text
http://localhost:5173
```

## Application Flow

1. React loads all dinosaur records from Flask.
2. Flask retrieves the data from the SQLite database.
3. The dinosaur records are displayed on the page.
4. The user completes the form.
5. React sends a POST request to Flask.
6. Flask saves the new dinosaur in SQLite.
7. React immediately displays the newly created dinosaur without refreshing the page.

## Requirements Met

- React frontend
- Flask backend
- SQLite database
- Display stored data
- Create new records
- Form submits through Flask
- Data saved in SQL database
- React Context API
- Simple earth-tone CSS styling