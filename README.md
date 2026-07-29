# NJ Stays

A modern property management & booking platform for **NJ Stays**, a multi-property furnished-stay business in Bengaluru, India, featuring **Felix 64** — fully furnished 1BHK apartments in Tavarekere, BTM 1st Stage.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Lucide icons.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demoing the platform

Use the **role switcher** in the top navigation bar to jump between the three experiences:

- **Guest View** (`/`) — landing page, featured Felix 64 property card with a photo-tour gallery, Google review highlights, and the NJ Stays property directory. Guests can tick multiple properties and submit one combined "Schedule a Visit / Request Callback" inquiry.
- **Tenant Portal** (`/tenant`) — lease details, rent payment widget, maintenance ticket submission & tracker, and community notices. Gated behind a login/signup screen.
- **Owner Admin** (`/admin`) — a sidebar dashboard covering Overview, Manage Properties, Manage Tenants, Manage Complaints, Manage Payments, Get Reports (with CSV export), Manage Guest Portal (publish listings, follow up on inquiries), Notifications, and Admin Settings. Also gated behind login/signup.

Demo credentials (or use the "Use demo account" button on each login screen):

| Portal | Email | Password |
| --- | --- | --- |
| Tenant | `arjun@example.com` | `demo1234` |
| Owner Admin | `owner@njstays.com` | `demo1234` |

A dark mode toggle sits next to the role switcher. All data is seeded with realistic mock data for Felix 64 (12 units, 10 occupied / 2 vacant, sample tenants, tickets, and notices) and persists to `localStorage` for the duration of the demo, so actions taken in one role (e.g. paying rent, raising a ticket, publishing a notice, submitting a guest inquiry) are reflected across the other roles.

## Architecture

- `src/lib/types.ts` / `src/lib/data.ts` — domain types and seed mock data.
- `src/lib/store.tsx` — client-side app state (role, theme, auth, properties, tenants, units, tickets, notices, payments, inquiries, settings) with `localStorage` persistence.
- `src/app/api/*` — Route Handlers (`inquiries`, `tickets`, `notices`, `payments`) backed by an in-memory server store, demonstrating the full-stack request path alongside the client-side store used for the live demo UI.
- `src/components/auth/AuthGate.tsx` — mock email/password signup & login gate, wrapped around `/tenant` and `/admin` via their `layout.tsx`.
- `src/components/admin/Sidebar.tsx` — Owner Admin navigation across its nine sections.
- `src/components/` — shared UI kit (`ui.tsx`), navigation, and role-specific components under `guest/`, `tenant/`, and `admin/`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
