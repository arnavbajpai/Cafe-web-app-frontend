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
### 1. Setup backend and database
Refer to README of the [backend repo](https://github.com/arnavbajpai/Cafe-web-app/)

### 2. Clone the Repository and navigate to frontend repository

```bash
git clone https://github.com/arnavbajpai/Cafe-web-app-frontend.git
cd Cafe-web-app-frontend
```

### 3. Fetch module dependencies
Run the following command

```bash
npm install
```

### 3. Start the application
```bash
npm run dev
```
Note: Ensure that the application starts up at local port 5173, any other port must be first listed under the middleware
Add this line to [main.py](https://github.com/arnavbajpai/Cafe-web-app/main.py) in your local repo:


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
