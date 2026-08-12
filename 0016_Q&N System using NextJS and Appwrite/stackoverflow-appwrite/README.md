# River Flow 🚀

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&duration=3000&pause=1000&color=F97316&center=true&vCenter=true&width=700&lines=River+Flow;Ask+Questions+%7C+Share+Answers;Learn+%7C+Build+%7C+Collaborate" alt="Typing SVG" />
</p>

<p align="center">
  A modern, full-stack Q&A platform inspired by Stack Overflow, built with <strong>Next.js</strong>, <strong>TypeScript</strong>, and <strong>Appwrite</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## ✨ About The Project

This project is a full-stack **River Flow Q&A platform** where developers can:

* ❓ Ask programming questions
* 💬 Share answers and comments
* 👍 Upvote and downvote content
* 🏷️ Organize questions using tags
* 🔎 Search for questions
* 🖼️ Upload image attachments
* 🌙 Use the application in dark mode

> Built as a learning and portfolio project to explore modern full-stack development with Next.js and Appwrite.

---

## 🚀 Features

<table>
<tr>
<td>🔐 <strong>Authentication</strong></td>
<td>❓ <strong>Questions</strong></td>
<td>💬 <strong>Answers</strong></td>
</tr>
<tr>
<td>User registration, login & sessions</td>
<td>Create, browse & search questions</td>
<td>Answer existing questions</td>
</tr>
<tr>
<td>🏷️ <strong>Tags</strong></td>
<td>👍 <strong>Voting</strong></td>
<td>💭 <strong>Comments</strong></td>
</tr>
<tr>
<td>Categorize programming questions</td>
<td>Upvote & downvote content</td>
<td>Comment on questions & answers</td>
</tr>
<tr>
<td>🔎 <strong>Search</strong></td>
<td>🖼️ <strong>Attachments</strong></td>
<td>🌙 <strong>Dark Mode</strong></td>
</tr>
<tr>
<td>Search questions by content</td>
<td>Upload images with questions</td>
<td>Responsive dark theme</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Technology             | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| ⚡ **Next.js**          | React framework & application architecture |
| 🔷 **TypeScript**      | Type-safe development                      |
| ⚛️ **React**           | UI development                             |
| ☁️ **Appwrite**        | Authentication, database & storage         |
| 🎨 **Tailwind CSS**    | Styling & responsive design                |
| 🧩 **shadcn/ui**       | Reusable UI components                     |
| 🐻 **Zustand**         | State management                           |
| ✨ **Motion**           | Animations                                 |
| 📝 **React MD Editor** | Markdown editing                           |
| 🔗 **Lucide**          | Icons                                      |

---

## 📸 Screenshots

### 🏠 Home Page

<p align="center">
  <img src="./public/screenshots/Home.png" width="850" alt="Home Page"/>
</p>

### ❓ Question Page

<p align="center">
  <img src="./public/screenshots/Questions-latest.png" width="850" alt="Question Page"/>
</p>

### ✍️ Ask Question

<p align="center">
  <img src="./public/screenshots/Ask-Question.png" width="850" alt="Ask Question"/>
</p>

### 🔐 Authentication

<p align="center">
  <img src="./public/screenshots/Login.png" width="850" alt="Login Page"/>
</p>

---

## 📂 Project Structure

```text
stackoverflow-appwrite/
│
├── public/
│   └── screenshots/
│       ├── Home.png
│       ├── Question-latest.png
│       ├── Ask-Question.png
│       └── Login.gif
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── actions/
│   └── ...
│
├── .gitignore
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── PRD.md
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ranichandnirani/Stack-overflow-clone.git
```

### 2. Navigate to the project

```bash
cd stackoverflow-appwrite
```

> If your local folder name differs, cd into the repository folder that was created by the clone command.

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Appwrite

Create an Appwrite project and configure authentication, database, collections, storage, permissions, and indexes.

Create a `.env.local` file:

```env
NEXT_PUBLIC_APPWRITE_HOST_URL=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_appwrite_api_key
```

> Use your Appwrite project endpoint, project ID, and API key from your Appwrite dashboard.

> ⚠️ Never commit real API keys or sensitive environment variables.

### 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🗄️ Appwrite Data Model

### Questions

```text
questions
├── title
├── content
├── authorId
├── tags
└── attachmentId
```

### Answers

```text
answers
├── content
├── authorId
└── questionId
```

### Comments

```text
comments
├── content
├── authorId
├── type
└── typeId
```

### Votes

```text
votes
├── userId
├── type
├── typeId
└── value
```

---

## 🔄 How It Works

```text
        👤 Register / Login
                ↓
        🏠 Browse Questions
                ↓
          🔎 Search / Filter
                ↓
          ❓ Open Question
                ↓
          💬 Read Answers
                ↓
       ✍️ Answer / Comment
                ↓
          👍 Vote Content
                ↓
       ❓ Ask Your Question
```

---

## 🎯 What I Learned

Building this project helped me understand:

* Next.js App Router
* TypeScript in a real-world application
* Appwrite authentication
* Database design & relationships
* CRUD operations
* File uploads & storage
* Authentication & authorization
* Search & pagination
* State management with Zustand
* Responsive UI development
* Reusable React components

---

## 🚀 Future Improvements

* 🔔 Real-time notifications
* 🏆 Reputation & badge system
* 🚩 Question/answer reporting
* 🛡️ Admin moderation dashboard
* 📧 Email notifications
* 👤 Advanced user profiles
* 🔖 Bookmark questions
* 🌐 Multi-language support

---

## 👩‍💻 Author

<p align="center">
  <strong>Chandni Rani</strong>
  <br/>
  Aspiring Full Stack Web Developer
</p>

<p align="center">
  <a href="https://github.com/ranichandnirani">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <a href="https://www.linkedin.com/in/chandnirani/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
  </a>
</p>

---

## ⭐ Support

If you found this project interesting, consider giving the repository a ⭐.

<p align="center">
  <strong>Code. Learn. Build. Repeat. 🚀</strong>
</p>
