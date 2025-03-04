# Project Setup and Launch Instructions

## Prerequisites
- Python (version 3.8 or higher)
- Node.js and npm

---

## 1. Clone the Repository
```bash
git clone <repository_url>
cd frontend-task
```

---

## 2. Backend Setup (Flask Server)
### Navigate to Backend Directory
```bash
cd pyrest
```

### Create and Activate a Virtual Environment
```bash
python -m venv venv
# Activate on Windows
.\venv\Scripts\activate
# (For macOS/Linux)
# source venv/bin/activate
```

### Install Dependencies
```bash
pip install flask
```

### Run the Flask Server
```bash
python app.py
```
Server should be running at `http://127.0.0.1:5000`

---

## 3. Frontend Setup (Vite Project)
### Navigate to Frontend Directory
```bash
cd ..
```

### Install Dependencies
```bash
npm install
```

### Run the Frontend Server
```bash
npm run dev
```
The site should be running at the address provided by Vite, usually `http://localhost:5173`

---

## 4. Summary
- Backend: Flask server at `http://127.0.0.1:5000`
- Frontend: Vite app at `http://localhost:5173`

