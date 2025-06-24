# ![Past Price Logo](./assets/logo.png)

# Past Price Tracker for Amazon

[![NPM Version](https://img.shields.io/npm/v/past-price-tracker.svg)](https://www.npmjs.com/package/past-price-tracker)
[![Build Status](https://img.shields.io/github/actions/workflow/status/krishiraj123/Past-Price-Tracker-For-Amazon/ci.yml?branch=main\&style=flat)](https://github.com/krishiraj123/Past-Price-Tracker-For-Amazon/actions)
[![Issues](https://img.shields.io/github/issues/krishiraj123/Past-Price-Tracker-For-Amazon)](https://github.com/krishiraj123/Past-Price-Tracker-For-Amazon/issues)

---

## 📖 Introduction

Welcome to **Past Price Tracker for Amazon**—your go-to solution for retrieving and visualizing historical pricing data on Amazon products. Empower your purchasing decisions with intuitive charts, alerts, and comparative tools that reveal pricing trends over time. Whether you're a data enthusiast, bargain hunter, or developer, Past Price provides clear insights and powerful features to track price fluctuations seamlessly.

## 🚀 Features

* **Historical Price Charts**: Visualize price history with interactive graphs.
* **Price Alerts**: Get notified when a product hits your target price.
* **Bulk Tracking**: Monitor multiple products simultaneously.
* **Export Data**: Download CSV of historical prices for offline analysis.
* **Responsive UI**: Clean, mobile-friendly interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Frontend   | React, Vite, Tailwind CSS     |
| Backend    | Node.js, Express, Axios, CORS |
| Database   | MongoDB (Mongoose)            |
| Deployment | Docker, GitHub Actions        |

## 📂 Folder Structure

```
├── assets/                # Logo, icons, images
├── client/                # React frontend code
│   ├── public/            # Static files
│   └── src/               # Components, pages, hooks, styles
├── server/                # Express backend
│   ├── config/            # Environment & DB setup
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── utils/             # Helpers and services
├── .github/               # CI/CD workflows
├── .env.example           # Example environment variables
├── docker-compose.yml     # Docker orchestration
├── Dockerfile             # Server container configuration
├── LICENSE
├── README.md
└── package.json
```

## ⚙️ Requirements

Ensure you have the following installed:

* **Node.js** v14 or higher
* **npm** v6 or higher (or **yarn**)
* **MongoDB Atlas** account or local MongoDB instance

## 💻 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/krishiraj123/Past-Price-Tracker-For-Amazon.git
   cd Past-Price-Tracker-For-Amazon
   ```
2. **Install dependencies**

   ```bash
   # Server
   cd server && npm install

   # Client
   cd ../client && npm install
   ```
3. **Configure environment**

   * Copy `.env.example` to `.env` in the `server` directory.
   * Fill in your MongoDB URI and other variables.

## 🏃‍♂️ Development

Start both frontend and backend in development mode:

```bash
# From root directory
npm run dev
```

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

## 🌐 API Endpoints

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/products/:id` | Fetch product details & history |
| POST   | `/api/track`        | Start tracking a new product    |
| DELETE | `/api/track/:id`    | Stop tracking a product         |
| GET    | `/api/price-alerts` | List all price alerts           |
| POST   | `/api/price-alerts` | Create a new price alert        |

## 🎨 Customization

* **Styling**: Modify Tailwind config and React components in `client/src`.
* **Scraping Logic**: Update scraping strategies in `server/utils/scraper.js`.
* **Notifications**: Configure email/SMS services in `server/config/notifications.js`.

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Check our [contribution guidelines](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md).

## 📞 Contact

* **Maintainer**: Krishiraj Vansia
* **Email**: [krishiraj@example.com](mailto:krishiraj@example.com)
* **GitHub**: [@krishiraj123](https://github.com/krishiraj123)

---

> *Past Price Tracker for Amazon* © 2025 Krishiraj Vansia. Feel free to contribute, modify, and share!
