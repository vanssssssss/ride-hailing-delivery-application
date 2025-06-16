# MERN ride-hailing backend application

This is the backend server for a ride-hailing application built using Node.js, Express, and MongoDB.  
It includes RESTful API endpoints for user registration and login, searching nearby cabs, placing ride orders, and tracking order.


# Getting Started

To get started, make sure you have 
- NodeJs 
- a MongoDb Atlas account and a cluster

  ## Installation
Clone the repository 

```markdown
git clone https://github.com/vanssssssss/ride-hailing-delivery-application
```
Install dependencies
```markdown
npm install
```

Create .env file in root of your directory and add variables
```markdown
MONGO_URI=<your mongoDb uri>
JWT_SECRET=<your jwt secret>
JWT_LIFETIME=<jwt lifetime>
```

Create .env.test file in root of your directory for testing and add variables
```markdown
JWT_SECRET=<your jwt secret>
```

Run the server
```markdown
npm start
```

The backend will run on: http://localhost:3000 (or as set in environment variable)


# API Endpoints

- POST /api/v1/auth/register — Register a new user.
  
- POST /api/v1/auth/login — Login and receive a JWT token.
  
- POST /api/v1/cabs — Get nearby available cabs (requires pickup & dropoff).
  
- POST /api/v1/order — Place an order with pickup and dropoff coordinates.
  
- GET  /api/v1/order/:orderId  - Fetches a specific order status by its unique orderId.

Run test
```markdown
npm test
```

# Features Implemented

- User Registration & Login using JWT (JSON Web Token)

- Secure Password Hashing with bcrypt

- Protected Routes for placing and tracking orders

- Cabs filtered by pickup location (Geospatial Query)

- Automatically books the nearest available cab on order placement
  
- Creates a new ride order with pickup & dropoff location

- Price calculation based on distance between pickup and dropoff

- Fetch current ride status and cab location by order ID

- Centralized Error Handling via custom middleware (BadRequest, Unauthorized, NotFound)

- Proper HTTP Status Codes (200, 400, 401, 404)

- End-to-End API integration automated testing using Jest and Supertest for Cab Listing API 
