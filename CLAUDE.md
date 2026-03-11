# habitspace

## Overview
Habit-building app based on James Clear's Atomic Habits framework. Free to use with social accountability through groups. Users build identity-based habits using implementation intentions, habit stacking, and environment design.

## Stack
- Next.js 16, React 19, Tailwind 4, DaisyUI 5
- Data: JSON files in `/data/`
- Auth: Magic link (email, no passwords)
- Deploy: Vercel

## Design System — "Swiss Expressive"

### Philosophy
Light, editorial, structured. Sharp edges signal discipline. Serif headlines add warmth. Red accent demands attention. Every section is numbered. Dividers create rhythm.

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FAFAFA` | Page background |
| `--bg-card` | `#FFFFFF` | Cards, inputs, surfaces |
| `--bg-surface` | `#F5F5F5` | Tinted surfaces, inactive areas |
| `--border` | `#E5E5E5` | Dividers, card strokes, input borders |
| `--text-primary` | `#000000` | Headlines, body text, primary labels |
| `--text-secondary` | `#666666` | Descriptions, secondary labels |
| `--text-muted` | `#999999` | Placeholders, hints, timestamps |
| `--text-disabled` | `#CCCCCC` | Disabled text, empty states |
| `--accent` | `#FF3B30` | CTAs, section numbers, active states, red accent |
| `--accent-bg` | `#FF3B3015` | Accent tint backgrounds (implementation intention cards) |
| `--success` | `#22C55E` | Completed habits, positive indicators, green dots |
| `--success-bg` | `#22C55E20` | Success tint backgrounds |

### Typography
| Element | Font | Size | Weight | Extras |
|---------|------|------|--------|--------|
| Page title | DM Serif Display | 36-40px | normal | lineHeight: 1.05-1.1 |
| Section title | DM Serif Display | 28px | normal | — |
| Logo | DM Serif Display | 28px | normal | "habit\nspace", lineHeight: 0.95 |
| Section number | Inter | 11px | 700 | fill: accent, letterSpacing: 1 |
| Section label | Inter | 11px | 600 | fill: black, letterSpacing: 3, UPPERCASE |
| Body | Inter | 14-15px | 400-500 | lineHeight: 1.5-1.6 |
| Habit name | Inter | 15px | 600 | — |
| Habit detail | Inter | 12px | 400 | fill: #999 |
| Stat value | Inter | 36-52px | 700 | — |
| Stat label | Inter | 13px | 500 | fill: #666 |
| Button text | Inter | 15px | 700 | fill: white on accent bg |
| Input placeholder | Inter | 15px | 400 | fill: #CCC |
| Chip/tag | Inter | 13px | 500 | — |
| Tab bar label | Inter | 10px | 500 | — |

### Layout Patterns
- **Section header**: `01` (red, 11px, 700, ls:1) + `LABEL` (black, 11px, 600, ls:3)
- **Dividers**: 1px solid #E5E5E5, full-width between sections
- **Content padding**: 24px horizontal
- **Section gap**: 20-24px vertical
- **Cards**: White bg, 1px #E5E5E5 border, no border-radius (0px)
- **Buttons**: Full-width, 52px height, #FF3B30 fill, no border-radius
- **Inputs**: Full-width, 52px height, white bg, 1px #E5E5E5 border, no border-radius
- **Checkboxes**: 20x20 square, no radius. Red fill = selected, green fill = completed, white + border = empty
- **Bottom tab bar**: Top 1px border, 4 tabs (Dashboard, Groups, Scorecard, Profile), active tab in red

### Corner Radius
- **0px** on almost everything: buttons, inputs, cards, checkboxes, stat boxes
- **Exception**: Avatar circles, progress dots

### Status Bar
- iPhone-style status bar (9:41) on screens 3-11 (authenticated screens)
- Not shown on landing page or sign-in

## Screens & Routes

### 1. Landing Page (`/`)
- Serif headline: "Build the identity you want. One habit at a time."
- Subtitle: Based on Atomic Habits. Start impossibly small. Stack habits. Do it with friends.
- Social proof: "12,847 people building habits together" + avatar row
- CTA: "Start your first habit — free"
- Sub-CTA: "Free to start. Social accountability built in."

### 2. Sign In (`/start`)
- "Welcome back" serif title
- Magic link email input
- "Send magic link" button

### 3. Setup — Identity (`/setup/identity`)
- Step 1 of 4
- "Who do you want to become?"
- Identity statement input: "I am a person who..."
- Popular identity chips: a reader, an athlete, a meditator, a writer, a healthy eater, an early riser

### 4. Setup — Implementation (`/setup/implementation`)
- Step 2 of 4
- "When and where?"
- Three inputs: "I will [habit]", "At this time [7:00 AM]", "In this location [my bedroom]"
- Red highlight card: "YOUR IMPLEMENTATION INTENTION — I will meditate for 2 minutes at 7:00 AM in my bedroom."

### 5. Setup — Stacking (`/setup/stacking`)
- Step 3 of 4
- "Stack it on another habit"
- Existing habits list with radio selection (green dots for existing, red outline for selected)
- Red highlight card: "YOUR HABIT STACK — After I meditate, I will meditate for 2 minutes."
- "Skip this step →" link

### 6. Setup — Environment (`/setup/environment`)
- Step 4 of 4
- "Design your environment"
- Three tips with red icons: Make it visible, Reduce friction, Prime the environment
- Email input at bottom
- "Let's go" CTA

### 7. Daily Dashboard (`/dashboard`)
- Greeting: "Good morning, Tay" (DM Serif Display, 32px)
- Subtitle: "You're becoming someone who shows up daily"
- Habit cards — each shows:
  - Habit name (bold) + streak counter (icon + X/66 days)
  - Identity statement (italic)
  - Schedule: "Every day at 8:30 AM · Bedroom"
  - Status: green checkmark "Done — checked in at 6:42 AM" or red "Tap to check in"
- Active habit card has red left border
- Bottom tab bar

### 8. Scorecard (`/scorecard`)
- Title: "Scorecard" + streak badge "47 of 66 days"
- 01 HABIT SCORE: 92% overall consistency, +5% vs last week
- 02 THIS MONTH: Green heatmap grid (7 columns for days of week)
- 03 STATS: 4 stat cards (92% completion, 47 best streak, 284 total completions, 5.2 avg/day)
- 04 GROUP LEADERBOARD
- Bottom tab bar

### 9. Groups (`/groups`)
- Title: "Groups" + group name badge "Morning Crew"
- 01 GROUP STREAK: "23 days — Everyone checked in today" + member count
- 02 TODAY'S CHECK-INS: Per-member list with avatar, name, habit count, green/red dots
- "Invite a member" button
- 03 DISCOVER HABITS: Search bar for habit discovery
- Bottom tab bar

### 10. Profile (`/profile`)
- Title: "Profile" + settings gear icon
- Avatar, name, member since, streak badge
- 01 IDENTITY STATEMENTS: List of italic identity strings
- 02 ACTIVE HABITS: Habit names with streak counters (X/66)
- 03 LIFETIME STATS: Total check-ins + consistency %
- 04 GRADUATED HABITS: Completed habits with "66 days" badge
- Bottom tab bar

### 11. Graduated (`/graduated`)
- Group cheered notification: "Morning Crew cheered you on!"
- "GRADUATED" section label
- "You graduated!" (DM Serif Display, 40px)
- Identity-reinforcing copy: "Drinking 8 glasses of water is now part of your identity..."
- Stats row: days, levels, hit rate
- CTA: "Stack your next habit"

## Data Model (planned)
```
User: { id, email, name, identityStatements[], memberSince }
Habit: { id, userId, name, identityStatement, implementationIntention, stackedOn, time, location, currentDay, totalDays: 66, graduated }
CheckIn: { id, habitId, date, completedAt }
Group: { id, name, memberIds[], streak }
```

## Key Concepts
- **66-day habit formation** (not 5 levels — habits track X/66 days)
- **Identity-based**: "I am a person who..." statements drive behavior
- **Implementation intentions**: "I will [habit] at [time] in [location]"
- **Habit stacking**: "After I [existing habit], I will [new habit]"
- **Environment design**: Make cues visible, reduce friction, prime the space
- **Social accountability**: Groups with shared streaks and leaderboards
- **Free model**: No paywall, social features drive retention
