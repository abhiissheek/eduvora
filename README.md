# 📚 Eduvora – AI-Powered Learning Platform  

**Intelligent, Interactive, and Personalized Education for Everyone**  

<p align="center">  
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>  
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>  
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>  
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>  
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>  
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>  
  <img src="https://img.shields.io/badge/AI-Recommendation_System-blue?style=for-the-badge&logo=ai"/>  
  <img src="https://img.shields.io/badge/Auth-JWT%20|%20OAuth-orange?style=for-the-badge"/>  
</p>  

---

## 📝 Project Summary  

**Eduvora** is an AI-driven learning companion designed to make education more **interactive, adaptive, and personalized**. By combining intelligent recommendations, curated resources, and collaboration features, Eduvora transforms the way students learn and engage with knowledge.  

---

## 🎯 Objectives  

- Deliver **personalized learning paths** based on a student’s strengths and weaknesses.  
- Provide **AI-curated resources** (notes, videos, quizzes) tailored to individual goals.  
- Encourage **collaborative learning** through study groups and peer recommendations.  
- Enable educators to **track progress** with dashboards and analytics.  

---

## ✨ Key Features  

### 1. Smart Recommendations 🎯  
- AI suggests learning material (lectures, PDFs, problem sets).  
- Tracks user activity and adapts content in real time.  

### 2. Collaborative Learning 👥  
- Study groups and peer-to-peer discussions.  
- Share resources and track collective progress.  

### 3. Progress Tracking 📊  
- Personalized dashboards with goals, achievements, and insights.  
- Reports for both students and educators.  

### 4. Gamified Experience 🏆  
- Badges, leaderboards, and challenges to boost motivation.  

---

## ⚙️ Technology Stack  

| Tier        | Technologies |
|-------------|--------------|
| Frontend    | Next.js + TypeScript, React, TailwindCSS 🎨 |  
| Backend     | Node.js + Express.js ⚡ |  
| Database    | MongoDB 🍃 |  
| AI/ML       | Recommendation Systems, NLP 🤖 |  
| Auth        | JWT & OAuth 🔐 |  

---

## 🚀 Getting Started  

1. **Clone the repo**  
   ```bash
   git clone https://github.com/abhiissheek/eduvora.git
   cd eduvora
2. **Install dependencies**
   ```bash
   npm install
3. **Set up environment variables**  

   - Database URL  
   - JWT Secret  
   - API Keys (if any)  

5. **Run the development server**
   ```bash
   npm run dev

   App will be available at: http://localhost:3000

🔑 Key Files  

**Frontend**  
- `components/CreateCompanionForm.tsx` – Companion creation UI  
- `app/companions/create/page.tsx` – Page shell  
- `app/api/auth/signin/route.ts` – Issues auth token  
- `app/api/companions/route.ts` – Forwards API calls  

**Backend**  
- `backend/middleware/auth.js` – JWT verification middleware  
- `backend/routes/companions.js` – REST routes  
- `backend/controllers/companionController.js` – Business logic + schema  
- `backend/config/db.js` – MongoDB connection  

🌍 **Potential Impact**  
Eduvora empowers learners by making study personalized, engaging, and collaborative.  
With AI-driven insights, it bridges the gap between traditional education and modern adaptive learning—helping both students and educators achieve better outcomes.  

🤝 **Contribution**  
Contributions welcome! Please follow coding guidelines, submit clear pull requests, and include tests where possible.  
! Please follow coding guidelines, submit clear pull requests, and include tests where possible.
   
   
