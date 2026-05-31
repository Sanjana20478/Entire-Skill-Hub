# Skill-to-Business Entrepreneurship Platform

A complete MERN full-stack web application that helps learners convert practical skills into sustainable micro-businesses through recommendations, roadmaps, resources, mentorship, and progress tracking.

## 1. Folder Structure

```text
EntireSkillHub/
  backend/
    src/
      config/              MongoDB connection
      controllers/         MVC controller logic
      middleware/          JWT, role authorization, errors
      models/              Mongoose schemas
      routes/              REST API routes
      seed/                Sample dummy data
      utils/               Async and token helpers
    .env.example
    package.json
    render.yaml
  frontend/
    src/
      api/                 Axios API client
      components/          Reusable UI cards/routes
      context/             Auth context
      layouts/             Auth and dashboard layouts
      pages/               Home, auth, dashboards, modules
      styles/              Tailwind entry CSS
    .env.example
    package.json
    vercel.json
  README.md
```

## 2. Backend Code

The backend uses Node.js, Express.js, JWT authentication, REST APIs, MongoDB, and Mongoose.

Important files:

- `backend/src/server.js`: Express app, middleware, route mounting, error handling.
- `backend/src/config/db.js`: MongoDB connection.
- `backend/src/middleware/authMiddleware.js`: JWT protection and role-based authorization.
- `backend/src/controllers/*`: MVC controller layer.
- `backend/src/models/*`: MongoDB schemas.
- `backend/src/seed/seed.js`: dummy data for skills, interests, ideas, roadmaps, resources, mentor sessions, and demo accounts.

## 3. Frontend Code

The frontend uses React.js, Tailwind CSS, React Router, and Axios.

Important files:

- `frontend/src/App.jsx`: route configuration and protected routes.
- `frontend/src/context/AuthContext.jsx`: login, register, logout, token storage.
- `frontend/src/api/axios.js`: Axios base client with JWT header interceptor.
- `frontend/src/layouts/AppLayout.jsx`: navbar, sidebar, footer.
- `frontend/src/pages/*`: homepage, auth pages, dashboards, recommendations, roadmaps, mentors, sessions, feedback, admin panel.

## 4. Database Schema

Collections:

- `Users`: name, email, password hash, role, profile fields, skills, interests, bookmarks.
- `Skills`: skill name and category.
- `Interests`: interest name.
- `BusinessIdeas`: idea details, category, startup cost, difficulty, matched skills/interests, tags.
- `Roadmaps`: roadmap title, linked business idea, overview, duration, phases.
- `RoadmapSteps`: ordered roadmap steps covering validation, tools, skills, cost, legal, marketing, growth.
- `Resources`: title, type, URL, category, linked idea, uploader, approval status.
- `Mentors`: linked user, expertise, approval status, mentees, Q&A.
- `MentorSessions`: mentor, mentee, topic, preferred date, mode, notes, status.
- `ProgressTracking`: user, business idea, roadmap, completed steps, percent complete.
- `Feedback`: rating, comment, linked user, idea, or mentor.

## ER Diagram Explanation

```text
Users 1..* ProgressTracking *..1 Roadmaps 1..* RoadmapSteps
Users *..* Skills
Users *..* Interests
Users *..* BusinessIdeas through bookmarks
BusinessIdeas *..* Skills through matchingSkills
BusinessIdeas *..* Interests through matchingInterests
BusinessIdeas 1..* Roadmaps
BusinessIdeas 1..* Resources
Users 1..1 Mentors for mentor accounts
Mentors *..* Users through mentees
Mentors 1..* Q&A embedded questions
Mentors 1..* MentorSessions *..1 Users
Users 1..* Feedback
```

The core relation is: a user selects skills and interests, the system scores matching `BusinessIdeas`, each idea opens a `Roadmap`, roadmap steps feed `ProgressTracking`, and mentors/resources support execution.

## 5. API Routes

Authentication:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

User module:

- `GET /api/users/profile-options`
- `PUT /api/users/profile`
- `GET /api/users/recommendations`
- `POST /api/users/bookmarks/:ideaId`

Business ideas:

- `GET /api/ideas?search=&category=&difficulty=`
- `GET /api/ideas/:id`
- `POST /api/ideas` admin
- `PUT /api/ideas/:id` admin
- `DELETE /api/ideas/:id` admin

Roadmaps:

- `GET /api/roadmaps?idea=:ideaId`
- `GET /api/roadmaps/:id`
- `POST /api/roadmaps` admin
- `PUT /api/roadmaps/:id` admin
- `DELETE /api/roadmaps/:id` admin

Resources:

- `GET /api/resources`
- `POST /api/resources` mentor/admin
- `PUT /api/resources/:id` mentor/admin
- `DELETE /api/resources/:id` admin

Mentors:

- `GET /api/mentors`
- `GET /api/mentors/me` mentor/admin
- `POST /api/mentors/profile`
- `PATCH /api/mentors/:id/approve` admin
- `POST /api/mentors/:id/connect` user
- `POST /api/mentors/:id/questions` user
- `PATCH /api/mentors/questions/:questionId/answer` mentor

Mentor sessions:

- `GET /api/sessions` user/mentor/admin
- `POST /api/sessions/mentors/:mentorId` user
- `PATCH /api/sessions/:id/status` mentor/admin

Progress and feedback:

- `GET /api/progress`
- `POST /api/progress`
- `PUT /api/progress/:id`
- `POST /api/feedback`
- `GET /api/feedback` admin
- `PATCH /api/feedback/:id/status` admin
- `GET /api/admin/stats` admin

## Recommendation Logic

The backend compares the learner profile with each business idea:

- matching skill = 2 points
- matching interest = 1 point
- ideas are sorted by highest score

Examples included in seed data:

- Cooking -> Home Bakery Business
- Tailoring -> Boutique Alteration Studio
- Digital Skills -> Freelance Digital Services
- Handicrafts -> Handmade Store

## 6. Deployment Steps

Backend on Render/Railway:

1. Create a MongoDB Atlas database.
2. Deploy the `backend` folder as a Node.js service.
3. Set environment variables from `backend/.env.example`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Run `npm run seed` once after deployment if sample data is needed.

Frontend on Vercel:

1. Deploy the `frontend` folder.
2. Set `VITE_API_URL=https://your-backend-url/api`.
3. Build command: `npm run build`
4. Output directory: `dist`

## 7. Testing Instructions

Local setup:

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

In another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

Demo accounts after seeding:

- Admin: `admin@skillbiz.com` / `admin123`
- Learner: `user@skillbiz.com` / `user123`
- Mentor: `mentor@skillbiz.com` / `mentor123`

Manual test checklist:

- Register and login as learner.
- Select skills and interests.
- View recommended business ideas.
- Save/bookmark an idea.
- Open a roadmap and start progress tracking.
- View resources and mentors.
- Request a mentor session and submit feedback.
- Login as mentor and upload a resource.
- Login as mentor and accept/complete session requests.
- Login as admin and manage users, mentors, ideas, roadmaps, resources, sessions, reports, and feedback.

## 8. Final Project Explanation

This platform follows a clean full-stack architecture. The frontend provides a responsive beginner-friendly interface with role-based dashboards. The backend follows MVC with secure JWT authentication, role authorization, reusable controllers, and MongoDB schemas for all required collections.

The learner flow starts at the homepage, moves through registration/login, profile selection, recommendation, roadmap access, resource learning, progress tracking, mentor connection, session request, and feedback submission. Mentors can manage expertise, upload resources, monitor mentee engagement, answer Q&A, and accept or complete sessions. Admins can monitor KPIs, approve mentors and resources, manage business ideas and roadmaps, handle sessions, and review reports/feedback.

## Viva Explanation

Short answer:

The project is a MERN platform that recommends micro-business ideas based on a user's skills and interests. It uses JWT for authentication, role-based access for users, mentors, and admins, Mongoose schemas for database collections, and React with Tailwind for the UI. The main innovation is skill-to-business mapping with structured roadmaps and progress tracking.

Key points to explain:

- JWT keeps protected APIs secure.
- Role middleware separates learner, mentor, and admin permissions.
- Recommendation scoring uses selected skills and interests.
- Roadmap steps standardize business launch planning.
- Progress tracking stores completed steps and completion percentage.
- Mentor sessions record guidance requests and statuses.
- Admin dashboard gives platform management, resource approval, feedback handling, and KPI analytics.

## Future Enhancements

- AI-powered recommendation explanations.
- Calendar integration and automated reminders for mentor sessions.
- Payment integration for premium mentorship.
- Certificate generation after roadmap completion.
- Regional legal registration guidance.
- Multi-language support.
- Advanced analytics for mentor impact and learner success.
