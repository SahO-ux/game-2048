# 🧩 2048 Game

A modern and responsive implementation of the popular **2048 puzzle game** built using **React.js** and **Tailwind CSS**.  
The goal of the game is to combine numbered tiles to reach the **2048 tile**.

---

## 🚀 Features

- 🎮 Playable with keyboard or on-screen controls
- 📱 Supports swipe gestures on touch devices
- ⚙️ Configurable board size (3x3, 4x4, 5x5)
- 💾 Score tracking
- 🏆 Game ends automatically when:
  -> Tile value 2048 is reached (You win 🎉)
  -> No more valid moves are possible
- 🔁 Restart and Play Again functionality
- 🧱 Built with modular, easy-to-extend codebase

---

## 🧠 Gameplay Instructions

### 🎯 Objective
Combine tiles with the same number to reach the **2048 tile**.

---

### 🎮 Controls

- Keyboard's **Arrow Keys (↑ ↓ ← →)** to move tiles.  
- Additional **On-screen buttons**.  
- **Swipe** in any direction on mobile/touch screens.  

---

### ⚙️ How It Works

- When **two tiles with the same number** touch, they **merge into one**.  
- Each move **spawns a new tile** (either `2` or `4`).  

---

### 🔚 Game Ends When

- You reach **2048** → 🎉 **You Win!**  
- No moves are possible → 💀 **Game Over!**

---

## ⚡ Installation & Setup

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- (Optional) Docker ≥ 24 if running via container

---

## 🧩 Local Setup

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/SahO-ux/game-2048.git
cd game-2048
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Run locally:

```bash
npm run dev
```

- The app runs on http://localhost:5173

---

## 🐳 Run with Docker (Optional)

- Note Docker Desktop must be installed and Docker engine should be active

### Build and start container:
- Inside root directory (game-2048) run the following command:
  
```bash
docker compose up --build
```

- The app will be served at http://localhost:3000

---

## 🧩 Implementation Details

### 🧱 Tech Stack

- Frontend: React (Vite)
- Styling: TailwindCSS
- Deployment: Docker + Node Alpine
- Serving: serve (static file server)

---

## 🔍 Code Structure

```
game-2048/
│
├── src/
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile
├── .dockerignore
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 🔄 Game Logic Overview

- Board State: Represented as a 2D array (board[row][col])

### Movement:

Implemented via a single **moveBoard(board, direction)** function that:
- Rotates the board depending on direction.
- Reuses **moveRowLeft()** logic for all directions.
- Merges and updates tiles accordingly.

### Game End Check:

**isGameOver(board)** checks for:
- Existence of 2048 tile → win
- No valid moves → lose

### Random Tile Generation:

- **getRandomTile()** spawns a new tile (2 or 4) in an empty cell after every move.

---

## 🧰 Design Choices

### Functional & Modular:
- All game logic isolated inside utility functions for easy testing and extension.

### No external state library:
- Managed with React’s built-in useState and useCallback.

### Performance:
- Used useMemo for derived values (like gameOver) and useCallback for stable handlers.

### UI/UX:
- Simple, minimal, and mobile-friendly using TailwindCSS.

---

## 👨‍💻 Author

- Developed by: Sahil Akbari
- Created as part of a Full Stack Developer assessment task.
---
