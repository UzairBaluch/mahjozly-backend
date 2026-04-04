# Mahjozly — Master Product Document
*محجوزلي — Your booking, done.*

A B2B SaaS booking tool for small businesses in Oman. Any business signs up, sets up their services, and shares their unique link with existing customers on WhatsApp. Customers book without registration. Payment via bank transfer. No more WhatsApp chaos.

---

## 1. The Problem

Witnessed firsthand working in event management and retail in Oman:

- Small businesses manually send the same info and pictures to every client multiple times a day
- Customers wait hours on WhatsApp for a reply
- Customers come in and nobody is available to serve them
- No self-service booking option exists for small businesses in Oman
- Everything runs on WhatsApp, phone calls, and Excel sheets

---

## 2. The Solution

Mahjozly gives every small service based business their own booking page. They share one link on WhatsApp. Customers browse services, pick a date, add extras, and book — without calling, messaging, or showing up unannounced. Payment handled via bank transfer the way Oman businesses already operate.

**Mahjozly is for service based businesses only — not product sellers.**

If you sell your time and skill — Mahjozly is for you.

---

## 3. Business Model — B2B SaaS Tool

Mahjozly is NOT a marketplace. It is a tool businesses use with their own existing customers.

- Business signs up and gets their own unique booking link
- They share that link with their existing WhatsApp customers
- Mahjozly does not find customers for the business
- Business pays Mahjozly monthly to use the tool
- Same model as Calendly and Booksy — we provide the tool, they bring their own customers

**Pricing:**
- 14 day free trial — no credit card
- Then 5 to 10 OMR per month
- Keep cheap for fast early adoption

---

## 4. Target Market — First 5 Business Types

All 5 are everywhere in Oman and all 5 are managing bookings manually on WhatsApp right now.

| Business | Problem |
|----------|---------|
| Event companies | Boss sends same pictures 4-5 times daily, customers wait on WhatsApp |
| Salons | Customers show up without appointment, no system |
| Car wash | No time slot system, customers just show up and wait |
| Musar shops | Customers come in, no one available for fitting |
| Small clinics and massage centers | All bookings via WhatsApp, no organized system |

**Personal advantage:** Direct experience with event companies (6 months) and Musar shops (current workplace). First real customers already in reach.

---

## 5. Business Onboarding Flow

1. Business visits mahjozly.com
2. Sees landing page — what Mahjozly does, how it works, pricing
3. Clicks Start Free Trial
4. Fills business name, type, email, password
5. Gets their unique link instantly — mahjozly.com/their-business-name
6. Quick setup — add first service, set availability
7. Done in under 5 minutes — share link on WhatsApp

The moment they see their own live booking page is the aha moment. Get them there as fast as possible.

---

## 6. What Different Visitors See

**Natural visitor landing on Mahjozly directly:**
- Clean marketing landing page
- What Mahjozly does and how it works
- Pricing plans
- Start Free Trial button

**Existing customer receiving link from business on WhatsApp:**
- Opens mahjozly.com/business-name
- Sees that business's full booking page only
- Books directly with no registration required

---

## 7. User Model

One single user model. The user IS the business. No separate customer accounts.

Businesses sign up and manage everything. Customers fill their details at checkout only — name, email, phone, notes. No password. No registration. Like ecommerce guest checkout.

---

## 8. Complete Flow

### Business Flow
1. Sign up — name, email, password, logo, bank details, contact phone
2. Add services with starting price and description
3. Add addons per service — extras, options, customizations with individual pricing
4. Set available dates manually
5. Get unique link mahjozly.com/business-name
6. Share link on WhatsApp with existing customers
7. Receive full booking details via email when customer submits
8. Review booking — confirm or let it expire
9. On confirm — customer automatically receives bank transfer details
10. Receive slip upload notification
11. Verify payment — mark as complete
12. Date auto blocks
13. Manage all bookings from dashboard

### Customer Flow
1. Receive link from business on WhatsApp
2. Open mahjozly.com/business-name
3. Browse all services the business offers
4. Select service — see starting price
5. Browse and select addons
6. Check available dates — pick one
7. Add notes — special requirements, preferences etc
8. See full price breakdown
9. Fill name, email, phone number
10. Submit booking — status becomes PENDING
11. Receive confirmation email — booking is under review
12. After business confirms — receive email with bank transfer details and payment deadline
13. Transfer payment to business bank account
14. Upload payment slip on booking page
15. Receive final confirmation email after business verifies payment
16. Booking is locked in

---

## 9. Booking Status Flow

| Status | Trigger |
|--------|---------|
| PENDING | Customer submits booking |
| EXPIRED | No business action within 24-48 hours |
| CONFIRMED | Business confirms — bank details sent to customer |
| CANCELLED | Customer does not upload slip within payment deadline |
| SLIP_UPLOADED | Customer uploads payment slip |
| COMPLETED | Business verifies payment — date auto blocks |

---

## 10. Features

### Phase 1 — Core (Build Now)
- Business registration and login
- Business profile — name, logo, unique slug, bank details, contact phone, description, business type
- Add and manage services with starting price
- Add and manage addons per service with individual pricing
- Set available dates manually
- Admin block date button for offline bookings
- Unique business booking page mahjozly.com/business-name
- Share on WhatsApp button for business
- Customer checkout — no registration — name, email, phone, notes
- Real time availability check
- Full booking status flow — PENDING, CONFIRMED, SLIP_UPLOADED, COMPLETED, EXPIRED, CANCELLED
- Auto expire PENDING bookings after 24-48 hours
- Auto block dates only after COMPLETED status
- Email to customer at every status change
- Email to business on new booking and slip upload
- Bank transfer details shown after confirmation — bank name, account name, IBAN, amount, deadline
- Payment slip upload — images and PDF only — with preview and replace option
- Booking confirmation page after checkout with full summary
- Powered by Mahjozly badge on business page
- Booking management dashboard
- Basic dashboard stats — total bookings, upcoming, pending actions
- Swagger API documentation
- Deployed live on Railway

### Phase 2 — Advanced
- Soft hold on dates when booking is PENDING — show high demand message
- Time slots and capacity based booking
- WhatsApp or SMS notifications
- Custom quote request

### Phase 3 — Reviews
- Auto review request email after booking date passes
- Customer leaves star rating and comment
- Reviews displayed on business booking page
- Builds trust and social proof

### Phase 4 — Payments
- Stripe integration for future expansion
- Online payment option alongside bank transfer

---

## 11. Database Schema

### users
| Field | Type | Notes |
|-------|------|-------|
| id | String | Primary key |
| nameEn | String | Business name in English |
| nameAr | String | Business name in Arabic — ready for later |
| email | String | Unique |
| password | String | Hashed with bcrypt |
| logo | String | Cloudinary URL |
| slug | String | Unique — used in booking link |
| descriptionEn | String | Short description English |
| descriptionAr | String | Short description Arabic — ready for later |
| phone | String | Contact number shown on booking page |
| businessType | String | Events, Salon, Car Wash, Musar, Clinic etc |
| bankName | String | For payment instructions |
| accountName | String | For payment instructions |
| iban | String | For payment instructions |
| createdAt | DateTime | |

### services
| Field | Type | Notes |
|-------|------|-------|
| id | String | Primary key |
| nameEn | String | Service name English |
| nameAr | String | Service name Arabic — ready for later |
| descriptionEn | String | |
| descriptionAr | String | Ready for later |
| basePrice | Decimal | Starting from price |
| userId | String | Foreign key to users |
| createdAt | DateTime | |

### addons
| Field | Type | Notes |
|-------|------|-------|
| id | String | Primary key |
| nameEn | String | Addon name English |
| nameAr | String | Addon name Arabic — ready for later |
| price | Decimal | |
| serviceId | String | Foreign key to services |

### availability
| Field | Type | Notes |
|-------|------|-------|
| id | String | Primary key |
| date | DateTime | Available date |
| isBooked | Boolean | True after COMPLETED |
| isBlocked | Boolean | Manual block by business |
| serviceId | String | Foreign key to services |
| userId | String | Foreign key to users |

### bookings
| Field | Type | Notes |
|-------|------|-------|
| id | String | Primary key |
| customerName | String | |
| customerEmail | String | |
| customerPhone | String | |
| customerNotes | String | Special requirements |
| date | DateTime | Requested booking date |
| totalPrice | Decimal | Base price plus addons |
| status | Enum | PENDING, CONFIRMED, SLIP_UPLOADED, COMPLETED, EXPIRED, CANCELLED |
| slipUrl | String | Cloudinary URL of payment slip |
| expiresAt | DateTime | Auto expiry timestamp |
| serviceId | String | Foreign key to services |
| userId | String | Foreign key to users |
| createdAt | DateTime | |

### booking_addons
| Field | Type | Notes |
|-------|------|-------|
| id | String | Primary key |
| bookingId | String | Foreign key to bookings |
| addonId | String | Foreign key to addons |
| price | Decimal | Price at time of booking |

---

## 12. Tech Stack

### Backend — Your Code

| Layer | Technology | Reason |
|-------|-----------|--------|
| Runtime | Node.js | Already know it from BizxFlow |
| Framework | Express.js | Already know it — fast to build |
| Language | TypeScript | Type safety — modern backend standard |
| Database | PostgreSQL | Relational data — perfect for this domain |
| ORM | Prisma | Easy to learn, great TypeScript support |
| Validation | Zod | TypeScript native validation |
| Auth | JWT + bcrypt | Already know this pattern |
| Email | Nodemailer | Already used in BizxFlow |
| File Upload | Cloudinary + Multer | For logos and payment slips |
| Testing | Jest + Supertest | API and unit testing |
| Logging | Morgan | Request logging — already used in BizxFlow |
| Security | Helmet + express-rate-limit | Already used in BizxFlow |
| API Docs | Swagger | Already used in BizxFlow |
| Environment | dotenv | Already know it |
| Code Quality | ESLint + Prettier | Clean consistent code |

### Frontend — Vibe Coded

| Layer | Technology | Reason |
|-------|-----------|--------|
| Framework | Next.js + TypeScript | Modern React standard |
| Styling | Tailwind CSS | Fast clean UI |
| State | Zustand | Simple lightweight state |
| API Calls | Axios | Already used in BizxFlow frontend |
| Forms | React Hook Form + Zod | Type safe forms with validation |

### DevOps

| Layer | Technology | Reason |
|-------|-----------|--------|
| Backend Deploy | Railway | Already deployed BizxFlow there |
| Frontend Deploy | Vercel | Best for Next.js |
| Containerization | Docker | Local Postgres setup — good interview talking point |

---

## 13. API Structure

### Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/logout
- POST /api/v1/auth/refresh-token

### Business
- GET /api/v1/business/profile
- PATCH /api/v1/business/profile
- GET /api/v1/business/dashboard

### Services
- POST /api/v1/services
- GET /api/v1/services
- PATCH /api/v1/services/:id
- DELETE /api/v1/services/:id

### Addons
- POST /api/v1/services/:serviceId/addons
- PATCH /api/v1/addons/:id
- DELETE /api/v1/addons/:id

### Availability
- POST /api/v1/availability
- GET /api/v1/availability/:serviceId
- PATCH /api/v1/availability/:id/block
- DELETE /api/v1/availability/:id

### Bookings (Business)
- GET /api/v1/bookings
- GET /api/v1/bookings/:id
- PATCH /api/v1/bookings/:id/confirm
- PATCH /api/v1/bookings/:id/complete
- PATCH /api/v1/bookings/:id/cancel

### Public (Customer Facing — No Auth)
- GET /api/v1/public/:slug
- GET /api/v1/public/:slug/services
- GET /api/v1/public/:slug/services/:serviceId/availability
- POST /api/v1/public/bookings
- PATCH /api/v1/public/bookings/:id/slip

---

## 14. Critical UX Rules

- Bank transfer details must show bank name, account name, IBAN, exact amount, and deadline clearly
- Payment deadline message — "Please transfer within 24 hours or booking will be cancelled"
- Slip upload accepts images and PDF only — show preview before submit — allow replace
- When a date has a PENDING booking show "This date is in high demand"
- Business page must show logo, name, phone, description, and Powered by Mahjozly badge
- Booking confirmation page must show full summary — service, addons, date, total, next steps

---

## 15. Language Strategy

### Phase 1 — English First (Now)
Build entirely in English. Faster to build, easier to debug, easier to present in job interviews. Interviewers are English speakers.

In interviews say: "I built it in English first to validate the core product. Arabic RTL localisation is planned for the next version targeting the Oman market."

### Phase 2 — Arabic (After Getting Hired or Before Real Launch)
- Full RTL layout on frontend
- Arabic font — Noto Sans Arabic or Tajawal
- Email templates in Arabic
- All UI in Arabic

### Database — Arabic Ready From Day One
All text fields use nameEn and nameAr pattern from the start. PostgreSQL and Prisma handle Unicode natively. Adding Arabic later is just filling in existing fields — no database restructuring needed.

---

## 16. Real Launch Plan

### Step 1 — Build MVP
Core booking flow. Status workflow. Bank transfer. Email notifications. Nothing else.

### Step 2 — Get First Real Businesses
- Old event company workplace — first call
- Current Musar shop workplace — second call
- Say: "I built this to replace your WhatsApp booking. Try it free for 14 days."

### Step 3 — Watch Them Use It
Sit with them. Watch where they hesitate, what confuses them, what they ignore. Fix those things before adding any new feature.

### What You Are Really Selling
Not a booking system. You are selling: "Finally I don't have to repeat myself 10 times a day." That is the pitch.

### Do NOT
- Add more features before getting real users
- Wait for Stripe
- Wait for Arabic
- Wait for perfection

---

## 17. Final Ratings

| Area | Score |
|------|-------|
| Problem | 10/10 |
| Market fit Oman | 10/10 |
| Product design | 9.5/10 |
| Simplicity | 10/10 |
| Execution risk | 8.5/10 |
| Overall | 9.5/10 → 10/10 after Stripe and Reviews |

---

*Mahjozly — محجوزلي — Built for Oman. Built from real experience.*
