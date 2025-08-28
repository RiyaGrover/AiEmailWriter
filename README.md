# AiEmailWriter

✉️ AI Email Writer – Chrome Extension with Spring Boot Backend

An AI-powered Chrome extension that helps you write professional email replies instantly.
It integrates a Spring Boot backend with AI (OpenAI/Gemini API) to generate context-aware responses directly inside Gmail.

🚀 Features

🧠 AI-powered email generation (professional, concise, or casual tone).

📩 Seamless Gmail integration via Chrome extension.

⚡ Spring Boot backend for API handling and AI integration.

🎨 Customizable responses with different tones & lengths.

🔒 Secure API communication between extension & backend.

🛠️ Tech Stack
Frontend (Chrome Extension)

JavaScript (Manifest v3)

HTML + CSS

Chrome Extension APIs

Backend (Spring Boot)

Java 17+

Spring Boot

REST API

OpenAI/Gemini API Integration

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/RiyaGrover/AiEmailWriter.git
cd AiEmailWriter

2️⃣ Backend (Spring Boot) Setup

Navigate to the backend folder:

cd backend


Add your API key (OpenAI/Gemini) in application.properties:

ai.api.key=YOUR_API_KEY
server.port=8080


Run the backend:

mvn spring-boot:run


Backend will start at: http://localhost:8080

3️⃣ Frontend (Chrome Extension) Setup

Go to chrome://extensions/ in Chrome.

Enable Developer Mode (toggle top right).

Click Load unpacked → select the extension/ folder.

Pin the extension and open Gmail → AI Email Writer will appear.

📌 Usage

Open Gmail and click AI Email Writer Extension.

Choose tone (Professional, Friendly, Short, Detailed).

Click AI Reply → The backend AI generates a response.

Insert into Gmail with one click.

📜 License

This project is licensed under the MIT License – you’re free to use, modify, and distribute with proper attribution.

👩‍💻 Author

Riya Grover
