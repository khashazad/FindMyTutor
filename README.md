
# Find My Tutor

This repository contains the prototype for **Find My Tutor**, a web application designed to connect students with tutors. It leverages Next.js for a dynamic, server-side rendered user experience and MongoDB for efficient data management.

## Overview

Tutor-Match is intended to address the gap in the market for a personalized, hands-on tutoring platform that spans various fields such as academics, sports, and music. With its user-friendly interface and matching system, the prototype aims to facilitate seamless interactions between students and tutors.

## Features

- **User Types**: Supports registration for two user roles: student and tutor.
- **Dynamic Searching**: Filter tutors by expertise.
- **Session Management**: Request and manage tutoring sessions.
- **Interactive Dashboards**: Dedicated portals for students and tutors to manage their profiles and sessions.
- **Dark Mode UI**: A sleek dark theme interface for reduced eye strain.
- **Responsive Design**: Responsive and consistent layout across all devices

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- pnpm
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Tutor-Match.git
   ```

2. Install dependency packages
   ```sh
   pnpm install
   ```
3. Enter your MongoDB URI in `.env.local` and your secrets
   ```env
   MONGO_URI=your_mongodb_uri
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET=next_auth_secret
   JWT_SECRET=jwt_secret
   ```
4. Start the development server
   ```sh
   pnpm dev
   ```

## Usage

Navigate to `http://localhost:3000` to view the application in your browser. Use the platform as a student or tutor to explore the features.
