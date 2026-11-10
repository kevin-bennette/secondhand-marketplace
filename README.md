# ReLoop – Second-Hand Marketplace (SEPM Demo)

A **mobile-first, frontend-only prototype** of a second-hand online marketplace, built for a
Software Engineering and Project Management (SEPM) case study. Users can register, sign in,
list pre-owned items, browse/search/filter listings, chat with sellers, save items, rate each
other after a transaction, report problems and review their transaction history.

> This is a functional UI demonstration, **not** a production application. All data is simulated
> and stored in the browser's LocalStorage – there is no backend, no real email and no real payments.

The visual design follows the six Figma reference screens in `SEPM-7.pdf` (Login, Marketplace,
Create Listing, Product Details, Inbox, Chat). Additional screens use the same visual language.

---

## Technology stack

| Concern | Choice |
| --- | --- |
| UI framework | React 19 + TypeScript |
| Build tool / dev server | Vite |
| Styling | Tailwind CSS 3 (via PostCSS) |
| Routing | React Router |
| Icons | Lucide React |
| Persistence | Browser LocalStorage (namespaced `reloop:v1:*`) |

Tailwind CSS **v3** is used deliberately: Tailwind v4's native file scanner is a compiled `.node`
binary that Windows Smart App Control can block, which silently produces no utility classes.
v3 scans files in pure JavaScript and works on every machine.

## Getting started

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints (normally <http://localhost:5173>). On a laptop the app is shown inside an
iPhone-sized frame; on a phone (or a narrow window) it fills the screen.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

### Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Buyer/seller (main demo) | `demo@reloop.test` | `demo1234` |
| Moderator (US9 dashboard) | `admin@reloop.test` | `admin1234` |
| Other sample users | `sarah@reloop.test`, `mike@reloop.test`, `jessica@reloop.test`, `selena@reloop.test`, `daniel@reloop.test` | first name + `1234` (e.g. `mike1234`) |

The login screen has a **"Fill in demo credentials"** shortcut. You can also register a new
account: the verification code is displayed on screen as a *simulated email*.

**Reset demo data:** Account → *Reset demo data* restores all sample data.

---

## Git branching strategy

| Branch | Purpose |
| --- | --- |
| `main` | Initial project scaffold |
| `develop` | Integration and demonstration branch (default branch) – contains all ten user stories |
| `US1` … `US10` | One feature branch per user story |

Workflow used:

1. `develop` was created from the scaffold, then all ten branches `US1`–`US10` were created from `develop`.
2. Before work started on a story, its branch was fast-forwarded to the latest `develop` so it
   built on the already-integrated stories (e.g. US2 needs US1's authentication).
3. Each story was implemented only on its own branch, as modular components, with commits in the
   form `feat(USn): …`.
4. After building successfully and testing the acceptance criteria, the branch was merged into
   `develop` with a `--no-ff` merge commit (`Merge branch 'USn' into develop: …`), and `develop`
   was re-built and re-tested.
5. Feature branches are preserved after merging.

```bash
git log --oneline --graph develop   # shows each story's commits and its merge into develop
```

---

## User story implementation summary

| Story | What is implemented | Key locations |
| --- | --- | --- |
| **US1** Registration & Login | Sign-up with validation (name, email, password rules), simulated 6-digit email verification, account creation, login with error messages, redirect to home, route guard, logout | `components/authentication`, `context/AuthProvider.tsx`, `pages/Login`, `pages/Register`, `pages/Account` |
| **US2** Create Listing | Title, description, category, price, condition, photo upload with live preview (up to 4, compressed for storage), required-field validation, *Publish Listing*; listing appears in the marketplace immediately | `components/listings/ListingForm.tsx`, `ImageUploader.tsx`, `context/ListingsProvider.tsx`, `pages/CreateListing` |
| **US3** Browse & Search | Marketplace home (featured carousel, category tiles, listing feed), keyword search, category chips (kept in the URL across refresh), "No results found", product details, similar products | `components/marketplace`, `pages/Marketplace`, `pages/ProductDetails`, `utils/search.ts` |
| **US4** Filter Listings | Filter sheet with category, min/max price and condition; *Apply Filters* / *Clear Filters*; filters combine; removable filter chips; persisted in the URL | `components/marketplace/FilterSheet.tsx`, `ActiveFilters.tsx`, `utils/filters.ts` |
| **US5** In-App Chat | *Chat with Seller* from a listing, inbox with unread indicators, chat screen with history, timestamps and sending; conversations persist and are visible to the seller when they sign in | `components/messaging`, `context/ChatProvider.tsx`, `pages/Inbox`, `pages/Chat` |
| **US6** Edit & Delete Listings | My Listings (Active/Sold), Edit Listing (pre-filled form), delete with confirmation dialog, ownership validation (other users see *Access denied* and the state layer rejects changes) | `pages/MyListings`, `pages/EditListing`, `components/listings/DeleteListingButton.tsx` |
| **US7** Wishlist | Save/unsave heart on cards and *Save* on details, Wishlist tab, remove with confirmation, per-user persistence between sessions | `components/wishlist`, `context/WishlistProvider.tsx`, `pages/Wishlist` |
| **US8** Ratings & Reviews | User profiles with average rating and breakdown, 1–5 star input and written review, review history; reviews only allowed after a completed transaction between the two users. Introduces simulated transaction records and a clearly labelled *Mark as bought* action (no payment) | `components/reviews`, `context/ReviewsProvider.tsx`, `context/TransactionsProvider.tsx`, `pages/Profile` |
| **US9** Reporting & Moderation | *Report* on listings and profiles, required reason (details required for "Other"), confirmation message, *My Reports* with status badges, moderator dashboard with status filters/changes and a notification bell for new reports | `components/moderation`, `context/ReportsProvider.tsx`, `pages/Reports` |
| **US10** Transaction History | History with All/Purchases/Sales tabs and totals, transaction details (item, price, date, other party, reference), review shortcut, empty-state message | `components/transactions`, `pages/TransactionHistory` |

### Suggested demo walkthrough

1. Sign in with the demo account (or register a new one to see verification).
2. Search "chair", pick a category, open **Filters** and combine price + condition.
3. Open a listing → **Save**, then **Chat with Seller** and send a message (sample sellers send a labelled auto-reply).
4. **Sell** tab → create a listing with a photo → it opens and appears on the home feed.
5. Account → **My Listings** → edit the price or delete a listing.
6. On another user's listing choose **Mark as bought** → the transaction opens → **Rate & review**.
7. Visit a seller's profile → **Report user**; then sign in as the moderator to see the report on the dashboard.
8. Account → **Transaction History**.

## Project structure

```
src/
  components/
    common/          Buttons, form fields, modal, confirm dialog, avatar, badges…
    navigation/      Phone frame, screen layout, header, bottom nav, account menu config
    authentication/  US1      listings/  US2/US6     marketplace/  US3/US4
    messaging/       US5      wishlist/  US7         reviews/      US8
    moderation/      US9      transactions/ US8/US10
  context/           One provider per shared domain (auth, listings, chat, wishlist, …)
  hooks/             Context hooks, usePersistentState, useMarketplaceSearch
  pages/             One folder per screen
  data/              Seed users, listings, conversations, transactions, reviews, reports
  services/          LocalStorage wrapper
  types/             Domain types
  utils/             Formatting, validation, search, filters, image processing
```

Shared state lives in context providers composed in `context/AppProviders.tsx`, so changes made
in one feature are reflected everywhere (e.g. creating or editing a listing updates the
marketplace, details and wishlist; a simulated purchase unlocks reviews and appears in history).

## Known limitations

- **No backend.** All data is stored in the current browser's LocalStorage. Different browsers or
  devices do not share data, and clearing site data resets the demo.
- **Simulated authentication.** Passwords are stored in plain text in LocalStorage and the
  verification code is shown on screen instead of being emailed. There is no password reset and
  no social login (the Figma's Google/Facebook buttons were intentionally omitted to avoid
  non-functional controls).
- **Simulated messaging.** No real-time server – messages appear to the other user when they sign
  in on the same browser. Sample sellers send one automatic, labelled reply.
- **Simulated transactions.** *Mark as bought* only records a completed transaction; no payment is
  processed and nothing is charged.
- **Moderation** is a single demo moderator account; "notifications" are an in-app badge.
- **Storage limits.** Uploaded photos are compressed, but LocalStorage (~5 MB) limits how many
  photo-heavy listings can be created.
- No map view for seller location (no external map APIs are used).

## Credits

Product photos are from [Unsplash](https://unsplash.com) and used under the
[Unsplash License](https://unsplash.com/license) (free to use, no attribution required). They are
bundled in `public/images` so the demo works offline. User avatars are generated initials.
