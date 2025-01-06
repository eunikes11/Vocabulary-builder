<<<<<<< HEAD

# Vocabulary-builder

# Empower young minds with a fun and engaging vocabulary builder designed just for kids! This kid-friendly app helps children learn new words with their meanings, origins, examples, synonyms, and fun activities. Safe, interactive, and educational, it ensures a wholesome learning experience while promoting curiosity and language development.

# Kids Vocabulary Builder 🦄🌟

Empower young minds with a fun and engaging vocabulary builder designed just for kids! This kid-friendly app helps children learn new words with their meanings, origins, examples, synonyms, and fun activities. Safe, interactive, and educational, it ensures a wholesome learning experience while promoting curiosity and language development

---

## Features 🎉

### 📚 **Comprehensive Word Details**

- **Meaning:** Simplified definitions for better understanding.
- **Root/Origin:** Learn where words come from.
- **Phonetic Pronunciation:** Understand how to pronounce words.
- **Part of Speech:** Categorize words (noun, verb, adjective, etc.).
- **Syllable Breakdown:** Helps kids sound out words easily.
- **Synonyms and Antonyms:** Build a stronger word bank.

### ✨ **Creative Additions**

- **Fun Sentence:** See the word used in an exciting context.
- **Examples with Reasons:** Real-life examples that explain the importance of the word.
- **Word Family and Rhyming Words:** Explore related and rhyming words.
- **Emoji Representation:** Fun and relatable emojis for each word.

### 📝 **Engaging Activities**

- Suggests creative activities like drawing, storytelling, or using the word in real-life scenarios.

### 🔒 **Safe for Kids**

- Utilizes a robust filtering mechanism to block inappropriate words.
- Integrates OpenAI Moderation API and custom bad-word filters to ensure a safe and secure experience.

---

## Tech Stack 🛠️

### **Frontend:**

- **React.js**: For building a responsive and user-friendly interface.
- **Axios**: For handling API requests to the backend.

### **Backend:**

- **Node.js**: For server-side logic.
- **Express.js**: For creating RESTful APIs.
- **OpenAI API**: For generating vocabulary details and validating content.
- **Bad-Words Library**: To filter out inappropriate words.

## 🛠️ Installation and Setup Guide

### **1. Prerequisites**

- **Node.js**: Download and install Node.js from [Node.js Official Website](https://nodejs.org/).
- **VS Code**: Download and install Visual Studio Code from [Visual Studio Code Website](https://code.visualstudio.com/).
- **Git**: Install Git from [Git Official Website](https://git-scm.com/).
- **OpenAI API Key**: Sign up at [OpenAI](https://platform.openai.com/) and generate an API key.

---

### **2. Clone the Repository**

- Open a terminal in your desired folder and run:

  git clone https://github.com/your-username/kid-vocabulary-builder.git
  cd kid-vocabulary-builder

### **3. Setting Up the Backend (Node.js)**

cd server
npm install

- add OPENAI_API_KEY=your_openai_api_key to .env file
  npm start

### **4. Setting Up the Frontend (React.js)**

cd ../client
npm install
npm start

- The application will open automatically in your default browser at:http://localhost:3000

**Directory Structure**
kid-vocabulary-builder/
├── client/ # Frontend (React.js)
│ ├── public/ # Static assets
│ ├── src/ # React components and styles
│ └── package.json # Frontend dependencies
├── server/ # Backend (Node.js + Express.js)
│ ├── index.js # Main server file
│ ├── .env # Environment variables
│ └── package.json # Backend dependencies
└── README.md # Project documentation

> > > > > > > 67e79d4 (Initial commit)
