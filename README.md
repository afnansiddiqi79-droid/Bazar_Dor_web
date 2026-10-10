# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a responsive Bangladeshi market-price tracking web application that helps users explore everyday essential products, check price changes, browse product categories, and compare market prices.

🌐 **Live Website:** https://bazar-dor-web-phi.vercel.app/

📦 **GitHub Repository:** https://github.com/afnansiddiqi79-droid/Bazar_Dor_web

---

## 📖 About the Project

বাজার দর (BazarDor) হলো একটি market-price tracking web application, যেখানে ব্যবহারকারীরা নিত্যপ্রয়োজনীয় পণ্যের দাম সহজে দেখতে পারেন। পণ্যের category অনুযায়ী দাম খোঁজা, দাম বাড়া-কমার তথ্য দেখা এবং বিস্তারিত product information দেখার সুবিধা রয়েছে।

The goal of BazarDor is to make everyday market-price information easier to explore through a clean, user-friendly, and responsive interface.

---

## ✨ Key Features

- 📊 **Market Price Tracking:** Explore prices of everyday essential products.
- 📈 **Price Change Highlights:** Identify products whose prices have increased or decreased.
- 🗂️ **Category-Based Browsing:** Browse products by category.
- ↕️ **Price Sorting:** Sort products by default order, lowest price, or highest price.
- 🔎 **Product Details:** View detailed information and price comparisons for individual products.
- 🔐 **Authentication:** Sign up and sign in using supported authentication methods.
- 🌐 **Social Login:** Sign in with Google and GitHub.
- 👤 **User Profile:** Access the user's profile and available account-management features.
- 📱 **Responsive Design:** Designed for mobile, tablet, and desktop screens.
- ⏳ **Loading and Error States:** Provide feedback while data loads and when something goes wrong.
- 🚫 **404 Page:** Show a friendly page for unknown routes.
- 🔔 **Toast Notifications:** Display relevant feedback for supported user actions.

---

## 🛠️ Technologies Used

- **Next.js** — Application framework and routing
- **React** — User interface components
- **JavaScript** — Application logic and types
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication
- **MongoDB** — Database
- **Vercel** — Deployment
- **Git and GitHub** — Version control and source code hosting

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js and npm
- Git
- Required database and authentication credentials

### 1. Clone the repository

```bash
git clone https://github.com/afnansiddiqi79-droid/Bazar_Dor_web.git
```

### 2. Navigate to the project folder

```bash
cd Bazar_Dor_web
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by the application.

Example:

```env
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string

# Add the Google and GitHub OAuth variables
# using the exact names required by your auth configuration.
```

**Important:** Replace the example values with your own credentials. Never commit real passwords, database connection strings, OAuth secrets, or other sensitive values to GitHub.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Authentication Setup

To enable social login locally:

1. Configure the required Google OAuth credentials.
2. Configure the required GitHub OAuth credentials.
3. Set the correct callback URLs in the respective provider dashboards.
4. Add the required environment variables to `.env.local`.
5. Restart the development server after changing environment variables.

Use the callback URLs and variable names that match the project's actual authentication configuration.

---

## 🌍 Deployment

The application is deployed on Vercel.

**Live URL:** https://bazar-dor-web-phi.vercel.app/

For production deployment, configure the required environment variables in the Vercel project settings and deploy the latest code from GitHub.

---

## 📌 Project Information

- **Project Name:** বাজার দর (BazarDor)
- **Project Type:** Market-Price Tracking Web Application
- **Assignment:** Programming Hero — Batch 14, Assignment 07
- **Deployment Platform:** Vercel
- **Repository:** [Bazar_Dor_web](https://github.com/afnansiddiqi79-droid/Bazar_Dor_web)

---

## 👨‍💻 Author

**Afnan Siddiqi**

GitHub: [@afnansiddiqi79-droid](https://github.com/afnansiddiqi79-droid)

---

*সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়.*re details.
