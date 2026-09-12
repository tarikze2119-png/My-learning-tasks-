# EthioMed Clinic & Health Portal — Capstone Project Specification (Days 35–50)

## 1. Problem Statement & Domain Context
In many private and community clinics across Addis Ababa, patient appointments, prescription pickups, and lab test reports are tracked via paper books and fragmented phone calls. Patients often wait hours in waiting rooms simply to schedule a follow-up or check if their blood test results are ready.

**EthioMed** is a patient-facing clinical care portal that allows patients to browse clinic departments, book doctor consultations, track prescription dispatches, and view secure medical lab results in real time.

---

## 2. Target User Persona
* **Name**: Sara Yohannes (29, Addis Ababa resident)
* **Goal**: Wants to quickly schedule a cardiology consultation for her mother at a clinic in Bole, pay consultation fees via TeleBirr, and receive an SMS notification with digital lab results when ready.
* **Constraints**: Uses a 4G mobile phone; needs quick loading times, clear Amharic/English cues, and simple, accessible form inputs.

---

## 3. The 5 Core Screens & Data Specifications

1. **Home / Dashboard (`/`)**:
   * *Data*: Featured medical departments (Pediatrics, Cardiology, General Practice, Lab), emergency hotline, quick appointment lookup.
2. **Clinics & Doctors Catalog (`/doctors`)**:
   * *Data*: List of licensed doctors, specialty filter (query string `?specialty=...`), consultation fees in ETB, availability badges.
3. **Doctor Profile & Booking (`/doctors/:id`)**:
   * *Data*: Detailed doctor biography, clinical credentials, available time slots, appointment booking CTA.
4. **Book Appointment (`/book`)**:
   * *Data*: Multi-field booking form (Patient Full Name, Phone, Selected Date, Reason for Visit), guarded by patient login.
5. **Patient Lab Results & Prescriptions (`/results`)**:
   * *Data*: Patient's secure test records, status indicators (*Pending*, *Ready*, *Reviewed*), downloadable report previews.

---

## 4. Route Map

| Path | Screen / Component | Route Type | Data Needed | Protected? |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `HomeScreen` | Index Route | Featured departments, announcements | Public |
| `/doctors` | `DoctorsScreen` | Query Route | Filtered doctor list (`?specialty=...`) | Public |
| `/doctors/:id` | `DoctorDetailScreen` | Dynamic Route | Doctor profile matching `:id` | Public |
| `/book` | `BookingScreen` | Protected Form | Date picker, form validation, TeleBirr fee | **Yes (Auth Guard)** |
| `/results` | `LabResultsScreen` | Protected View | Patient medical tests & lab files | **Yes (Auth Guard)** |
| `*` | `NotFoundScreen` | Catch-All Route | 404 error helper and navigation links | Public |

---

## 5. Technology & Architecture Roadmap (Days 35–50)
* **Week 7 (Day 35)**: Vite + React SPA scaffold, Client-Side Routing, Route Map, and Initial Layout.
* **Week 8 (Days 36–40)**: Migration to Next.js App Router, Server Components, file-based routing, API routes.
* **Week 9 (Days 41–45)**: Real data fetching (SWR/React Query), TeleBirr & JWT Auth, SEO & Performance Optimization.
* **Week 10 (Days 46–50)**: Data visualizations (patient health charts), final hardening, and Vercel deployment.
