
# EcoFoot 🌍

EcoFoot is a gamified carbon footprint tracker that transforms environmental responsibility into an engaging competition. Users earn points based on their eco-friendly activities and compete with friends and family on leaderboards.

## Features

- **User Management:**
  - Quick sign-up with name and email.
  - User profile with avatar and display name.
- **Activity Tracking:**
  - Log carbon-positive activities (e.g., vehicle travel, meat consumption) and carbon-negative activities (e.g., recycling, using public transport).
  - Pre-set common activities for quick logging.
  - Instant points calculation preview.
- **Gamification Engine:**
  - **Points System:** Earn points based on the carbon impact of your activities. Get multipliers for consistent good behavior and bonus points for streaks.
  - **Achievements:** Unlock achievements like "Green Novice", "Bus Champion", and "Recycling King".
  - **Leaderboards:** Compete on global and friends leaderboards with weekly and monthly competitions.
- **Dashboard:**
  - View your daily carbon score with a visual indicator.
  - Track your points balance and streak counter.
  - See a feed of your recent activities and achievement notifications.
- **Social Features:**
  - Add friends via username or shareable codes.
  - Compete with friends and keep each other motivated.

## Unique Selling Points

- **Gamified Motivation:** Turns sustainability into a fun and engaging competition.
- **Social Accountability:** Friends and leaderboards help keep users motivated.
- **Simple and Quick Tracking:** Designed for busy lifestyles with quick activity logging.
- **Tangible Progress:** Clear metrics, achievements, and leaderboards show users their progress.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [React Router](https://reactrouter.com/)
- **Backend:**
  - [Firebase](https://firebase.google.com/) (Authentication, Firestore)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/ecofoot.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `src/firebase/config.js` file with your Firebase configuration:
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   export default app;
   ```

### Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the development server at `http://localhost:5173`.

## Project Structure

```
ecofoot/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Footer.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── hooks/
│   │   └── useActivities.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Friends.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── LogActivity.jsx
│   │   ├── Login.jsx
│   │   └── Profile.jsx
│   ├── services/
│   │   └── firebaseService.js
│   └── utils/
│       ├── achievements.js
│       └── carbonCalculator.js
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

### Third-Party Licenses

This project uses several third-party libraries, each with its own license. The majority of these libraries are licensed under the MIT and Apache-2.0 licenses. A full list of dependencies and their licenses can be found by running `npx npm-license-crawler`.

Here are some of the main dependencies and their licenses:

- **React:** MIT License
- **Firebase:** Apache-2.0 License
- **Tailwind CSS:** MIT License
- **Vite:** MIT License
- **React Router:** MIT License
- **Lucide React:** ISC License

### Public Code Usage

The code in this project is based on publicly available documentation and open-source libraries. All third-party libraries are used in accordance with their respective licenses.
