# Product Requirements Document: River Flow

---

## 1. Overview

A Stack Overflow-inspired Q&A platform called River Flow that lets users ask programming questions, answer others' questions, comment, and vote on content. Built as a full-stack learning project using **Next.js (App Router, TypeScript)** on the frontend/server layer and **Appwrite** as the backend-as-a-service (database, auth, storage).

**Problem it solves:** Developers need a focused space to ask technical questions, get community answers, and have the best answers surfaced through voting — without the overhead of a general-purpose forum.

**Primary goal of the project:** Demonstrate a production-style full-stack build (auth, relational-style data modeling, file uploads, real-time-feeling interactions) suitable for a developer portfolio.

---

## 2. Target Users

| Persona | Description | Needs |
| --- | --- | --- |
| **Question Asker** | A developer stuck on a problem | Fast way to post a well-formatted question with code, tags, and an optional screenshot |
| **Answerer** | A developer with relevant expertise | Easy way to browse open questions and submit rich-text answers |
| **Browser/Voter** | A visitor researching a problem | Ability to read questions/answers and upvote/downvote helpful content |
| **Project Reviewer** | Recruiter / instructor evaluating the portfolio piece | Needs a working, deployed, bug-free demo |

---

## 3. Core Features (Functional Requirements)

### 3.1 Authentication

- Users can sign up / sign in (email + password, and optionally OAuth — Google/Apple).
- Session persists across page reloads.
- Unauthenticated users can browse/read but not post, answer, comment, or vote.

### 3.2 Ask a Question

- Form fields: **Title** (specific, required), **Body/Details** (rich text editor, minimum 20 characters, required), **Image** (optional attachment), **Tags** (multi-tag input with suggestions).
- Validation: title and body required; body enforces minimum length; at least one tag recommended.
- On submit, creates a `questions` document in Appwrite tied to the logged-in user's `authorId`.

### 3.3 Browse & View Questions

- Question list/feed view with pagination.
- Full-text search across question titles and content.
- Individual question page showing: title, body, tags, author, vote count, answer count, timestamp.

### 3.4 Answers

- Logged-in users can submit an answer to any question via a rich-text editor.
- Answers are listed under the question, newest or highest-voted first.

### 3.5 Comments

- Users can comment on both questions and answers (single `comments` collection using a `type` + `typeId` pattern to support both).
- Comment author is recorded via `authorId`.

### 3.6 Voting

- Upvote/downvote control on questions and answers.
- One vote per user per item — voting again updates/removes the prior vote rather than stacking duplicates.
- Vote count displayed in real time (or on refresh, depending on implementation).

### 3.7 Tagging

- Tags attached at question creation; used for categorization and (optionally) filtering the question feed.

### 3.8 Image Attachments

- Optional image upload on question creation, stored in Appwrite Storage.
- Image preview rendered on the question detail page when present.

---

## 4. Non-Functional Requirements

- **Permissions model:** Collection-level Appwrite permissions should follow least-privilege — e.g., `read("any")` for public read access, `create/update/delete("users")` restricted to authenticated users, with document-level permissions scoping edit/delete to the original author.
- **Performance:** Question list should paginate (not load the entire collection at once); full-text indexes on `title` and `content` for fast search.
- **Reliability:** Backend setup (`getOrCreateDB`) should be idempotent — safe to run on every server start without duplicating collections, and should self-heal schema/permission drift (e.g. `ensureQuestionPermissions`, `ensureCommentAuthorIdAttribute`).
- **Security:** No sensitive keys exposed client-side; server actions use the appropriate Appwrite client (session-based for user actions, API-key based only for admin/setup tasks).
- **Responsiveness:** UI usable on both desktop and mobile widths.

---

## 5. Data Model (Appwrite Collections)

**`questions`**

| Field | Type | Required |
| --- | --- | --- |
| title | string (100) | Yes |
| content | string (10000) | Yes |
| authorId | string (50) | Yes |
| tags | string array (50 each) | Yes |
| attachmentId | string (50) | No |

Indexes: full-text on `title`, full-text on `content`.

**`answers`** — body content, `authorId`, reference to parent `questionId`.

**`comments`** — `content`, `authorId`, `type` (enum: question/answer), `typeId` (string) — single collection serving comments on both parent types.

**`votes`** — `userId`, `type`/`typeId` (question or answer being voted on), vote value (up/down) — one document per user per target item.

---

## 6. Tech Stack

- **Frontend/Framework:** Next.js (App Router), TypeScript, React
- **Backend-as-a-Service:** Appwrite (Database, Auth, Storage)
- **Styling/UI:** Tailwind CSS (with dark mode support), component library (shadcn/ui-style components under `components/ui`), Magic UI for animated/decorative components (e.g. the starfield background)
- **Rich text editor:** Custom RTE component for question/answer body
- **Deployment target:** Vercel

---

## 7. Out of Scope (v1)

- Real-time notifications (new answers/comments) via websockets
- Reputation/badge system
- Moderation tools (flagging, admin review queue)
- Email digests
- Multi-language support

---

## 8. Success Metrics (Portfolio Context)

- Core flows (ask → answer → comment → vote) work end-to-end with no console errors.
- Deployed, publicly accessible demo on Vercel with Appwrite backend correctly connected (platform + permissions configured).
- Clean permission model enforced in code (not just patched manually in the Appwrite console).

---

## 9. Known Risks / Open Issues

- Collection permission drift between code and live Appwrite instance if `getOrCreateDB()` isn't re-run after schema changes — mitigated via `ensure*` self-healing functions.
- Image rendering breaks (broken image icon) when `attachmentId` is empty and the `<img>` tag isn't conditionally guarded — needs a fix pass.
- Vote duplication risk if vote documents aren't uniquely keyed per `userId` + target item.

---

**Author:** Chandni Rani 
**Repo:** github.com/ranichandnirani/Stack-overflow-clone
