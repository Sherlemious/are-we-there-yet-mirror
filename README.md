# Are We There Yet?

## Table of Contents

- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Deployment](#deployment)
- [Tech/Framework Used](#techframework-used)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API References](#api-references)
- [Tests](#tests)
- [How to Use](#how-to-use)
- [Contribute](#contribute)
- [Credits](#credits)
- [License](#license)

## Motivation

The "Are We There Yet?" project aims to create a virtual trip planner that simplifies the process of planning and booking trips. By leveraging modern technologies such as MongoDB, JWT, Cloudinary, and Stripe, this project provides a seamless and secure experience for users to manage their travel plans. The motivation behind this project is to offer a comprehensive solution that addresses common pain points in trip planning, such as booking management, payment processing, and document handling, all while ensuring user data security and ease of use.

## Build Status

### Deployment

This project is deployed on Render.
You can access it at [Are We There Yet](https://are-we-there-yet-mirror-1.onrender.com/).

Backend Deployment: [Backend](https://are-we-there-yet-mirror.onrender.com/api)
Frontend Deployment: [Frontend](https://are-we-there-yet-mirror-1.onrender.com/)

### Possible Deployment Issues and Solutions

- **MongoDB Connection Error:**

  - If you encounter a MongoDB connection error, ensure that your MongoDB connection URI is correctly configured in the `.env` file.
  - MongoDB does not work on Orange network, so you may need to use a different network.

- **Cloudinary Configuration Error:**

  - If you face issues with Cloudinary configuration, verify that your Cloudinary URL is correctly set in the `.env` file.
  - Ensure that your Cloudinary account is active and has the necessary permissions to upload and manage files.

- **Testing Issues**

  - Incomplete Test Coverage: If you encounter issues with test coverage, ensure that all critical components and functions are tested.
  - CI/CD requires constant updates to the test suite to ensure that new features and changes are adequately tested.

- **Missing Data On Flight or Hotel Pages**

  - API limits may cause missing data on flight or hotel pages. Ensure that you have the necessary API keys and permissions to access the required data. Upgrading the API plan may help resolve this issue.

- **Deployment Issues**

  - If you face deployment issues, check the deployment logs for error messages and warnings. Common deployment issues include missing dependencies, incorrect environment variables, and network connectivity problems.

  - The Free Tier of Render has limitations on the number of services and resources available.

## Code Style

[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)

This project uses Prettier for code formatting. Below is the Prettier configuration used:

```json
{
  "tabWidth": 2,
  "printWidth": 120,
  "trailingComma": "es5",
  "arrowParens": "always",
  "semi": true,
  "singleQuote": true
}
```

### File Structure

    ├── assets
    │   ├── badges
    │   ├── logo
    │   ├── screenshots
    |
    ├── backend
    │   ├── src
    │   |   ├── config
    │   |   ├── constants
    │   |   ├── controllers
    │   |   ├── database
    │   |   |   ├── models
    │   |   |   ├── repositories
    │   |   ├── exceptions
    │   |   ├── middlewares
    │   │   |   ├── auth
    │   |   ├── routes
    │   |   ├── services
    │   |   ├── types
    │   |   ├── app.ts
    │   |   ├── server.ts
    │   ├── tests
    |   ├── .env
    |   ├── .gitignore
    |   ├── package.json
    |   ├── tsconfig.json
    |   ├── tsconfig.test.json
    |
    ├── frontend
    │   ├── public
    │   ├── src
    │   |   ├── components
    │   |   ├── lib
    │   |   ├── modules
    │   │   |   ├── Activity
    │   │   |   ├── etc.
    ├── .gitignore
    ├── .prettierrc
    ├── README.md

#### Backend .env template

    # Server Port
    PORT=8000

    # MongoDB Connection URI
    MONGO_URI=mongodb+srv:<username>:<password>@<cluster-url>/<database>

    # JWT Token Secret
    TOKEN_SECRET=your_token_secret

    # Cloudinary Configuration
    CLOUDINARY_URL=cloudinary://<api

    STRIPE_SECRET_KEY=your_stripe_secret_key
    # Email Credentials
    EMAIL=your_email
    PASSWORD=your_email_password

### Branch naming convention

    backend/root -> deployed to production
    backend/dev -> where all the development happens. Our code is merged here before being deployed to production
    backend/feat/feature -> where you work on your feature

    frontend/root -> deployed to production
    frontend/dev -> where all the development happens. Our code is merged here before being deployed to production
    frontend/feat/feature -> where you work on your feature

## Screenshots

| ![ScreenShot1](assets/screenshots/01.png)  | ![ScreenShot2](assets/screenshots/02.png)  | ![ScreenShot3](assets/screenshots/03.png)  |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| ![ScreenShot4](assets/screenshots/04.png)  | ![ScreenShot5](assets/screenshots/05.png)  | ![ScreenShot6](assets/screenshots/06.png)  |
| ![ScreenShot7](assets/screenshots/07.png)  | ![ScreenShot8](assets/screenshots/08.png)  | ![ScreenShot9](assets/screenshots/09.png)  |
| ![ScreenShot10](assets/screenshots/10.png) | ![ScreenShot11](assets/screenshots/11.png) | ![ScreenShot12](assets/screenshots/12.png) |
| ![ScreenShot13](assets/screenshots/13.png) | ![ScreenShot14](assets/screenshots/14.png) | ![ScreenShot15](assets/screenshots/15.png) |
| ![ScreenShot16](assets/screenshots/16.png) | ![ScreenShot17](assets/screenshots/17.png) | ![ScreenShot18](assets/screenshots/18.png) |
| ![ScreenShot19](assets/screenshots/19.png) | ![ScreenShot20](assets/screenshots/20.png) | ![ScreenShot21](assets/screenshots/21.png) |
| ![ScreenShot22](assets/screenshots/22.png) | ![ScreenShot23](assets/screenshots/23.png) | ![ScreenShot24](assets/screenshots/24.png) |
| ![ScreenShot25](assets/screenshots/25.png) | ![ScreenShot26](assets/screenshots/26.png) |                                            |

## Tech/Framework Used

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-0A1A2F?style=for-the-badge&logo=nodemailer&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Features

- **User Authentication:** Secure user authentication using JWT.
- **Logging:** Logging middleware for tracking requests and errors.
- **Unit Testing:** Robust unit testing with Jest to ensure code quality and reliability.
- **Booking Management:** Easy and efficient booking management system.
- **Payment Processing:** Seamless payment processing with Stripe integration.
- **Cloud Storage:** Store and manage documents and images using Cloudinary.
- **Responsive Design:** User-friendly and responsive design for all devices.
- **Admin Dashboard:** Comprehensive admin dashboard for managing users, bookings, and more.
- **Email Notifications:** Automated email notifications for booking confirmations and updates.
- **Search and Filter:** Advanced search and filter options for finding trips and activities.

## Code Examples

### Authentication Middleware

Below is an example of an authentication middleware using Express and JWT. This middleware verifies the JWT token and attaches the user payload to the request object. It also includes a function to allow certain paths to be accessed without authentication.

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from './logger.middleware';
import { ResponseStatusCodes } from '../types/ResponseStatusCodes.types';

interface UserPayload {
  userId: string;
  accountType: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    logger.error('Access Denied');
    res.status(ResponseStatusCodes.UNAUTHORIZED).send('Access Denied');
    return;
  }

  if (req.header('Authorization')?.split(' ')[0] !== 'Bearer') {
    logger.error('Invalid Token');
    res.status(ResponseStatusCodes.UNAUTHORIZED).send('Invalid Token');
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as UserPayload;
    req.user = decoded;
    next();
  } catch (err) {
    logger.error('Expired Token:', err instanceof Error ? err.message : 'Unknown error');
    res.status(ResponseStatusCodes.FORBIDDEN).send('Expired Token');
  }
};

const openPaths = [
  { path: '/api/auth/register', methods: ['POST'] },
  { path: '/api/auth/login', methods: ['POST'] },
  { path: '/api/itineraries/get', methods: ['GET'] },
  { path: '/api/museums/getall', methods: ['GET'] },
  { path: '/api/activities', methods: ['GET'] },
  { path: '/api/attachments', methods: ['POST'] },
  { path: '/api/termsAndConditions', methods: ['GET'] },
  { path: '/api/tags', methods: ['GET'] },
  { path: '/api/categories', methods: ['GET'] },
  { path: '/api/users/forgotPassword', methods: ['POST'] },
  { path: '/api/users/verifyOTP', methods: ['POST'] },
];

const authenticateUnlessOpen = (req: Request, res: Response, next: NextFunction) => {
  const isOpenPath = openPaths.some((route) => route.path === req.path && route.methods.includes(req.method));

  if (isOpenPath) {
    return next();
  }

  return authenticateToken(req, res, next);
};

export { authenticateToken, authenticateUnlessOpen };
```

### Activity Controller

```typescript
import { Request, Response } from 'express';
import activityRepo from '../database/repositories/activity.repo';

const createActivity = async (req: Request, res: Response) => {
  try {
    const activity = req.body;
    activity.created_by = req.user.userId;
    const newActivity = await activityRepo.createActivity(activity);
    res.status(201).json({ message: 'Activity created successfully', data: { activityId: newActivity._id } });
  } catch (error) {
    res.status(400).json({ message: error.message, data: [] });
  }
};

export { createActivity };
```

### React Component

Below is an example of a React component that uses the Radix UI library to create a custom select dropdown with a trigger component.

```tsx
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const Select = SelectPrimitive.Root;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={`flex h-full w-full items-center justify-between rounded-md bg-background p-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-gold disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export { Select, SelectTrigger };
```

### Axios Instance

```typescript
import axios from 'axios';
import { NavigateFunction } from 'react-router';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    const currency = localStorage.getItem('currency') || 'EGP';
    config.headers['Currency'] = currency;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupInterceptors = (navigate: NavigateFunction) => {
  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && [401, 403].includes(error.response.status)) {
        localStorage.removeItem('token');
        navigate('/register');
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
```

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

   ```

2. **Install dependencies:**

   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install

   ```

3. Set up your `.env` file in the backend folder
   create a `.env` file in the backend folder and add the following:

   ```sh
   # Server Port
    PORT=8000

    # MongoDB Connection URI
    MONGO_URI=mongodb+srv:<username>:<password>@<cluster-url>/<database>

    # JWT Token Secret
    TOKEN_SECRET=your_token_secret

    # Cloudinary Configuration
    CLOUDINARY_URL=cloudinary://<api

    STRIPE_SECRET_KEY=your_stripe_secret_key
    # Email Credentials
    EMAIL=your_email
    PASSWORD=your_email_password
   ```

4. **Run the app:**
   ```sh
   cd backend
   npm start
   cd ../frontend
   npm start
   ```

## API References

[API Documentation](api.yaml)

## Tests

This project uses Jest for unit testing. You can run the tests using the following command:

```sh
cd backend
npm run test
```

## How to Use

1. **Sign Up / Log In:**

   - Visit the website and create a new account or log in with your existing credentials.

2. **Browse Trips:**

   - Explore the available trips and activities. Use the search and filter options to find trips that match your preferences.

3. **Book a Trip:**

   - Select a trip and proceed to book it. Fill in the required details and make the payment using the integrated Stripe payment gateway.

4. **Manage Bookings:**

   - View and manage your bookings from your user dashboard. You can cancel or reschedule your bookings as per the cancellation policy.

5. **Admin Dashboard:**

   - If you are an admin, access the admin dashboard to manage users, bookings, and other administrative tasks.

6. **Receive Notifications:**

   - Check your email for booking confirmations and updates. Ensure that you have provided a valid email address.

7. **Upload Documents:**

   - Use the Cloudinary integration to upload and manage documents and images related to your trips.

8. **Unit Testing:**
   - Run unit tests to ensure the reliability and quality of the codebase. Use the following command to run tests:
     ```sh
     npm run test
     ```

By following these steps, you can effectively use the "Are We There Yet?" application to plan and manage your trips.

## Contribute

We welcome contributions to enhance the "Are We There Yet?" project. Here are some ways you can contribute:

1. **Report Bugs:**

   - If you encounter any bugs or issues, please report them by creating an issue on the GitHub repository.

2. **Suggest Enhancements:**

   - Have ideas to improve the project? Suggest new features or enhancements by opening an issue. Some potential enhancements include:
     - Real-time currency conversion to provide accurate pricing for users from different countries.
     - Integration with additional payment gateways to offer more payment options.
     - Improved search and filter functionality to help users find trips more easily.
     - Enhanced user profile management with more customization options.
     - Adding multi-language support to cater to users from different regions.

3. **Submit Pull Requests:**

   - If you have implemented a bug fix or a new feature, submit a pull request. Please ensure your code follows the project's coding standards and includes appropriate tests.

4. **Improve Documentation:**

   - Help us improve the documentation by adding more detailed instructions, code examples, or clarifying existing content.

5. **Write Tests:**
   - Contribute by writing unit tests to increase the test coverage and ensure the reliability of the codebase.

### How to Contribute

1. **Fork the Repository:**

   - Fork the repository to your GitHub account.

2. **Clone the Repository:**

   - Clone the forked repository to your local machine:
     ```sh
     git clone https://github.com/Advanced-computer-lab-2024/Are-we-there-yet
     cd Are-we-there-yet
     ```

3. **Create a Branch:**

   - Create a new branch for your feature or bug fix:
     ```sh
     git checkout -b feature/your-feature-name
     ```

4. **Make Changes:**

   - Make your changes to the codebase.

5. **Commit Changes:**

   - Commit your changes with a descriptive commit message:
     ```sh
     git commit -m "feat: <your-feature-name>"
     ```
   - Please ensure your commit messages follow the conventional commit format. For example:
     - feat: Add new feature
     - fix: Correct typo in file
     - refactor: Refactor code for better performance
     - test: Add unit tests for component

6. **Push Changes:**

   - Push your changes to your forked repository:
     ```sh
     git push origin feature/your-feature-name
     ```

7. **Submit a Pull Request:**
   - Go to the original repository on GitHub and submit a pull request.

We appreciate your contributions and look forward to collaborating with you to improve the "Are We There Yet?" project.

## Credits

- [Nada Abdel-Fattah](https://github.com/Nada-abdelfattah): Product Manager (Supervising TA)

---

- [Abdelrahman Mohammed](https://github.com/Sherlemious)
- [Ahmed Gado](https://github.com/Hamada-Gado)
- [Marwan Mohamed Elsisi](https://github.com/MarwanSiSi)
- [Mohammed Gamal](https://github.com/MoGamal2)
- [Mostafa Hisham Hamdy](https://github.com/mostafahisham03)
- [Mohamed Ahmed El Sawy](https://github.com/Sawy03)
- [Omar Goba](https://github.com/Omar-Goba)
- [Rasheed Atia](https://github.com/RasheedAtia)
- [Seifeldin Khaled](https://github.com/SeifAbbas)
- [Yousef Yasser](https://github.com/yousefyasser)

### Aid Used

#### Documentation

- [ExpresJs](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [React](https://reactjs.org/)
- [Stripe](docs.stripe.com)
- [axios](https://axios-http.com/docs/intro)
- [Cloudinary](https://cloudinary.com/documentation/node_quickstart)

#### Video tutorials

| Description     | Link                                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| Google Maps     | [How to load Maps JavaScript API in React](https://www.youtube.com/watch?v=PfZ4oLftItk) |
| JWT Explanation | [What is JWT and Why Should You Use JWT](https://www.youtube.com/watch?v=7Q17ubqLfaM)   |
| TypeScript      | [TypeScript Crash Course](https://www.youtube.com/watch?v=30LWjhZzg50)                  |

### 3rd Party Services

- [Cloudinary](https://cloudinary.com/)
- [Stripe](https://stripe.com/)
- [Amadeus](https://developers.amadeus.com/)
- [AviationStack](https://aviationstack.com/)

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
