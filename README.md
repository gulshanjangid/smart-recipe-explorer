# Smart Recipe Explorer (MERN + GenAI)

This project is a MERN stack application that allows users to explore recipes, filter them, and get AI-powered suggestions and simplifications using the Groq API (Llama 3.1).

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Groq API (Llama-3.1-8b-instant)




## Project Structure
- `smart-recipe-helper/`: React Frontend (Vite)
- `backend/`: Node.js + Express Backend + MongoDB

## Prerequisites
- Node.js
- MongoDB (running locally on port 27017)
- Groq API Key

## Setup & Running

### 1. Backend Setup
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in `backend/` and add your keys:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/smart-recipe-explorer
    GROQ_API_KEY=your_groq_api_key_here
    ```
4.  Seed the database:
    ```bash
    node seed.js
    ```
5.  Start the server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd smart-recipe-helper
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## API Usage
- **GET /api/recipes**: List all recipes. Supports query params: `search`, `cuisine`, `isVegetarian`, `maxPrepTime`, `difficulty`, `tags`.
- **POST /api/ai/suggest**: Get recipe suggestions based on ingredients. Body: `{ "ingredients": ["a", "b"] }`.
- **POST /api/ai/simplify**: Simplify instructions. Body: `{ "recipeName": "...", "instructions": "..." }`.

## Testing
A simple test script is provided in `backend/test_basic.js`. Run it while the server is active:
```bash
node test_basic.js
```
