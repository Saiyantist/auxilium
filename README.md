# 🎟️ Auxilium - Helpdesk and Ticketing System

A learning project built with:

- **Backend:** Ruby on Rails 7.1.5.2 (API only)
- **Frontend:** React 19 + Vite 7.1.7 + Typescript + TailwindCSS 3.4
- **Database:** MySQL

---

## ⚙️ Setup (Local)

### 1️⃣ Prerequisites
- Ruby >= 3.1.0  
- Rails 7.1.5.2  
- MySQL 8+  
- Node.js >= 18  
- Yarn or npm

### 2️⃣ Clone & Install
```bash
git clone https://github.com/<your-username>/auxilium.git
cd auxilium
```

### 3️⃣ Run
1. Frontend
   - Install dependencies, then run server.
   ```bash
    cd frontend && npm install
    npm run dev
   ```

2. Backend
   - Install dependencies.
   ```bash
    cd backend
    bundle config set --local path 'vendor/bundle'
    bundle install
   ```
   - Setup configurations.
   ```bash
    VISUAL="code --wait" bin/rails credentials:edit
    # Input secret key in devise_jwt_secret_key
   ```
   - Prepare the database.
   ```bash
    bin/rails db:prepare
   ```
   - Run the server.
   ```bash
    bin/rails server
   ```
