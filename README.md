# Cafe Web App

A full-stack application for managing cafes and their employees, built with FastAPI (backend) and a modern JavaScript frontend.

##  Main Features

- **Cafe & Employee Management:** Easily add, edit, and delete cafes and employees.
- **Search Tool:**  
  - Filter cafes by location.
  - Filter employees by cafe name.  
  *(New in v1.0!)*
- Simple and intuitive UI for efficient management.

---

##  Installation & Local Deployment
### 1. Prepare the Backend

Follow the instructions in the [backend repository](https://github.com/arnavbajpai/Cafe-web-app/) to set up the FastAPI backend and database.

### 2. Clone This Repository

```bash
git clone https://github.com/arnavbajpai/Cafe-web-app-frontend.git
cd Cafe-web-app-frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Frontend

```bash
npm run dev
```

> **Note:**  
> The application runs on [http://localhost:5173](http://localhost:5173) by default.  
> If you wish to use a different port, ensure it is also listed in the backend middleware configuration (`main.py`).

---

## TBDs
---

1. **Dockerise Backend** 



2. **To be deployed on AWS.** 



3. **Add db trigger to auto delete employees when cafe is deleted.** 

---


## 🤝 Contributing

Pull requests and feature suggestions are welcome! Please open an issue to discuss potential changes.

---


*For any issues or questions, please contact [arnavbajpai](https://github.com/arnavbajpai).*
