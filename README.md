# Spin & Save

**Spin & Save** is a smart web application designed to simplify the management of shared laundry expenses. Whether you live in a shared apartment or manage a communal laundry setup, this app helps track and organize washing and drying costs efficiently, ensuring transparency and accountability for all users.

## Key Features

- **Shared Laundry Expense Tracking**:
  - Add, edit, and delete laundry expenses for washing and drying.
  - View a detailed expense history organized by month.

- **User Authentication**:
  - Secure registration and login system with email verification.
  - Password recovery and reset functionality for better user management.

- **Family Sharing**:
  - Share expense tracking with family members while maintaining privacy and control.

- **Real-time Notifications**:
  - Integrated global messaging system to provide feedback on user actions like successful signups, login errors, and expense updates.

- **Analytics and Filtering**:
  - Filter expenses by date, type (washing/drying), or user.
  - Monthly summaries to track overall spending.

## Why Choose Spin & Save?

- **Efficient Management**: Organize and monitor laundry expenses with minimal effort.
- **Transparency**: Keep track of shared costs with accuracy and clarity.
- **Customizability**: Designed to accommodate family members or individual users.

## Technologies Used

- **Frontend**:
  - **React (TypeScript)** for building an interactive UI.
  - **Material-UI (MUI)** for responsive and modern design.
  - **Formik & Yup** for robust form handling and validation.

- **Backend**:
  - **Appwrite** for authentication, database management, and email-based user management.

- **Build Tool**:
  - **Vite** for fast and efficient development and build process.


# How to Configure and Run Spin & Save Locally

This guide explains how to set up and run the **Spin & Save** project locally on your machine.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14+ recommended).
- **NPM or Yarn**: Package manager for installing dependencies.
- **Appwrite**: A running Appwrite instance to handle authentication, database, and backend services.

## Steps to Set Up

### 1. Clone the Repository

Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/your-username/spin-and-save.git
cd spin-and-save
```
## Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```
## Configure Environment Variables

Create a .env file in the root directory of the project and set the required environment variables. These variables allow the application to communicate with Appwrite.

Example .env file:

```bash
VITE_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
VITE_APPWRITE_PROJECT_ID=<your-project-id>
VITE_APPWRITE_DATABASE_ID=<your-database-id>
VITE_APPWRITE_USER_PROFILES_COLLECTION_ID=<your-user-profiles-collection-id>
```
- **VITE_APPWRITE_ENDPOINT**: URL of your Appwrite server (e.g., http://localhost/v1).
- **VITE_APPWRITE_PROJECT_ID**: Your Appwrite project ID.
- **VITE_APPWRITE_DATABASE_ID**: Database ID for storing user data
- **VITE_APPWRITE_USER_PROFILES_COLLECTION_ID**: Collection ID for user profiles.

## Start the Development Server

Run the following command to start the application in development mode:

```bash
npm run dev
```
The app will be available at http://localhost:5173.

## Build for Production

To build the project for production, use:

```bash
npm run build
```
The build output will be in the dist folder.

# Additional Information

## Folder Structure

- **`/src`**: Main source code.
- **`/context`**: Context providers for Authentication and Message handling.
- **`/pages`**: Application pages like Login, Register, and Profile.
- **`/components`**: Reusable components.
- **`/theme`**: Custom Material-UI theming.

## Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally.

## Troubleshooting

- Ensure your Appwrite instance is running and configured correctly.
- Verify that your `.env` file contains accurate project and database details.
- Check the console for error logs during installation or runtime.
