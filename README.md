# 🐾 Milo — Lost & Found App

> A React web application for reporting and discovering lost & found items within a community.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Firebase](https://img.shields.io/badge/Firebase-Backend-FFCA28?logo=firebase) ![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=reactrouter)

---

## 📖 Overview

Milo lets users post lost items and report found ones within their community. It features user authentication, a browsable home feed, and a photo-enabled post creation form — all backed by Firebase.

---

## 📁 Project Structure

```
Milo/
├── .vscode/
│   └── settings.json           # VSCode workspace settings
├── public/
│   └── images/                 # Static assets
│       ├── favicon/icon        # Browser tab icon
│       └── image1.png                 # Login & Register page icons
├── src/
│   ├── App.js                  # Root component with route definitions
│   ├── App.css                 # Global splash screen styles
│   ├── index.js                # React DOM entry point
│   ├── index.css               # Base body/font styles
│   ├── firebase.js             # Firebase initialization & config
│   ├── reportWebVitals.js      # Performance monitoring
│   ├── setupTests.js           # Jest / testing-library setup
│   ├── CreatePost/
│   │   ├── CreatePost.js       # Create lost/found post form
│   │   └── CreatePost.css      # Styles for the post creation page
│   └── Pages/
│       ├── Login/
│       │   └── Login.js        # Login page
│       ├── Register/
│       │   └── Register.js     # Registration page
│       └── Home/
│           └── Home.js         # Home feed page
├── .gitignore                  # Files and folders ignored by Git
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Locked dependency tree
└── README.md                   # Project documentation
```

---

## 🚦 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Login` | Default route — login form for returning users |
| `/register` | `Register` | Registration form for new users |
| `/home` | `Home` | Main feed of all lost & found posts |
| `/create-post` | `CreatePost` | Form to submit a new lost or found item |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- A Firebase project (already configured in `firebase.js`)

### Installation

```bash
git clone <repo-url>
cd Milo
npm install
npm start
```

The app will open at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run in development mode |
| `npm test` | Launch the test runner |
| `npm run build` | Build for production |

---

## 🔥 Firebase Setup

Firebase is initialized in `src/firebase.js`. To enable Auth, Firestore, and Storage, add the following exports:

```js
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

> **⚠️ Security:** Restrict the Firebase API key in [Google Cloud Console](https://console.cloud.google.com/) under **APIs & Services → Credentials** before going to production.

---

## 📝 CreatePost Component

`src/CreatePost/CreatePost.js` manages the item submission form.

**State**

| State | Type | Description |
|-------|------|-------------|
| `type` | `string` | `'lost'` or `'found'` |
| `title` | `string` | Item name |
| `description` | `string` | Detailed item description |
| `location` | `string` | Where the item was lost or found |
| `photo` | `File` | Uploaded image file |
| `preview` | `string` | Object URL for image preview |

**Functions**
- `handlePhoto(e)` — reads the selected file and generates a preview URL
- `handleSubmit()` — validates required fields, then navigates to `/home`

> **TODO:** Wire up `handleSubmit()` to persist posts to Firestore and upload images to Firebase Storage.

---

## 🗺️ Roadmap

- [ ] Firebase Authentication in Login & Register pages
- [ ] Persist posts to Firestore in `CreatePost`
- [ ] Upload images to Firebase Storage
- [ ] Fetch and display posts on the Home feed
- [ ] Real-time listeners for live post updates
- [ ] Search and filter by lost / found type
- [ ] User profile & "my posts" view
- [ ] Unit tests for form validation

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | Core UI library |
| `react-dom` | DOM rendering |
| `react-router-dom` | Client-side routing (v6) |
| `firebase` | Auth, Firestore, Storage, Analytics |
| `web-vitals` | Performance metrics |
| `@testing-library/react` | Component testing utilities |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

<p align="center">Made with ❤️ — Milo Lost & Found</p>
