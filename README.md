# HackMate — Smart College Hackathon Teammate Matchmaker

**HackMate** is a modern, responsive web application engineered to solve one of the biggest pain points in student hackathons: **haphazard, mismatched team formation in chaotic messaging groups**.

With HackMate, teams are assembled using an intelligent, transparent **5-Factor Team Compatibility Score** that matches technical skills, project roles, academic disciplines, schedule availability, and team diversity.

---

## 🚀 Key MVP Features

1. **Landing & Overview Page**: Hero presentation with live compatibility formula teasers, key statistics, and fast navigation.
2. **Student Profile Creation & Management**: Comprehensive profile setup (avatar, bio, department, year, roles, commitment hours, links, and past hackathon wins).
3. **Multi-Category Skills Selection**: Categorized skills selection (Frontend, Backend, AI/ML, Design, Mobile, Cloud/DevOps, Web3) with custom skill tag support.
4. **Department Selection**: Interdisciplinary academic departments across engineering, data science, design, and business.
5. **Preferred Hackathon Roles**: Primary & secondary role selection (Frontend, Backend, AI/ML Engineer, UI/UX Designer, Mobile, Cloud/DevOps, Product Pitcher, Web3 Dev).
6. **Availability & Commitment**: Track availability status (Actively Looking / Open to Invites), weekly hours commitment, and work styles (*Night Owl / All-Nighter*, *Flexible*, *Day Hacker*).
7. **Hackathon Team Requirements Form**: Set custom hackathon goals, target team size, unfilled roles, required tech stacks, and department preferences. Includes 1-click **Presentation Demo Presets**.
8. **Search & Multi-Filter Engine**: Real-time full-text search across names, skills, roles, and bio with filters for Department, Role, Availability, and Minimum Compatibility Score.
9. **Candidate Profile Cards**: Modern cards featuring compatibility gauge rings, matched skill highlights, experience badges, and social links.
10. **Connection & Invitation System**: Send personalized invitations for specific open roles with customized pitch messages and real-time status tracking.
11. **Team Dashboard**: Full roster management, role coverage checklist (*Filled vs Unfilled*), aggregate team skill pool, interdisciplinary diversity gauge, and candidate recommendation fast-track. Includes a **Simulate Accept** demo trigger.
12. **NOVEL FEATURE: 5-Factor Team Compatibility Score**: Mathematical 0-100% compatibility engine with a transparent formula breakdown modal.

---

## 🧠 The Novel Compatibility Score Engine

The compatibility algorithm computes a composite score (0–100%) across five weighted factors:

$$\text{Compatibility Score} = \text{Skills (40\%)} + \text{Role (25\%)} + \text{Department (15\%)} + \text{Availability (10\%)} + \text{Diversity (10\% validations)}$$

| Factor | Weight | Scoring Logic |
| :--- | :---: | :--- |
| **Skills Match** | **40%** | $\min\left(40, \left(\frac{\|\text{Matched Skills}\|}{\|\text{Required Skills}\|}\right) \times 40 + \text{Complementary Bonus}\right)$ |
| **Role Match** | **25%** | **25 pts** if primary role matches open team vacancy; **18 pts** if secondary role matches; **17 pts** if complementary (e.g. Full-Stack covering Frontend/Backend); **8 pts** baseline. |
| **Department Match** | **15%** | **15 pts** if in preferred department or direct domain alignment (e.g. Design for UI/UX, AI & DS for AI/ML); **14 pts** for core engineering; **12 pts** general alignment. |
| **Availability & Commitment** | **10%** | **6-7 pts** for actively looking; **+2 pts** if weekly hours meet or exceed threshold; **+1-2 pts** if work schedules align (*Night Owl* match). |
| **Team Diversity** | **10%** | **10 pts** if candidate brings an academic department **not yet present** in the team roster; **6 pts** if complementing 1 member; **3 pts** if department is heavily concentrated. |

### Formula Example:
- **Team Requirements**: Frontend Developer + AI/ML + UI/UX (`React`, `Python`, `PyTorch`, `Figma`, `Tailwind CSS`)
- **Candidate (Aryan Sharma)**: CSE, Primary: Frontend Developer, Secondary: AI/ML (`React`, `PyTorch`, `Python`, `Tailwind CSS`, `TypeScript`), 30 hrs/wk Night Owl.
- **Score Breakdown**:
  - Skills Match: **36 / 40 pts**
  - Role Match: **25 / 25 pts**
  - Department Match: **14 / 15 pts**
  - Availability Match: **9 / 10 pts**
  - Team Diversity: **8 / 10 pts**
  - **Total Compatibility**: $\mathbf{92\%}$

---

## 🛠️ Tech Stack & Engineering Decisions

- **Framework**: React 19 + TypeScript + Vite for instant HMR and optimized production bundles.
- **Styling**: Tailwind CSS v4 with custom dark mode glassmorphism and animated gauge indicators.
- **Icons**: Lucide React + custom inline SVG vector brand icons.
- **Data Persistence**: Browser `localStorage` with rich seed mock data (12 realistic student profiles from different engineering, design, and business streams).
- **Zero Heavy Dependencies**: Pure client-side mathematical scoring without external API latency or bloat.

---

## 🏃‍♂️ How to Run Locally

```bash
# Navigate to project folder
cd hackmate

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev

# Or build for production
npm run build
npm run preview
```
