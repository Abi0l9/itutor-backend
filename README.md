# iTutor API Documentation

This documentation consists of needed information about each endpoint, so that it can be quickly implemented as soon as possible but a detailed documentation will be written when the API is fully functioning.

## API REFERENCE

Base URL: This API can run locally on `http://localhost:4000` or on any given port. It can also be accessed through the deployment link url at:
[https://itutor-backend-6mcs.onrender.com]().

## Paths

```
- /
- /api/auth/
```

## ENDPOINTS

### GET /

- General:
  - Curls the root path of the API
- Sample:
  - GET https://itutor-backend-6mcs.onrender.com/
- Body: {}
- Required: null
- Response (200): 'Welcome home'

### POST /api/auth/signup

- General:
  - This endpoint receives and processes user's registration details
- Sample:
  - POST https://itutor-backend-6mcs.onrender.com/api/auth/signup
- Body:
  ```yaml
  {
    "firstName": "Kashy",
    "lastName": "Wale",
    "email": "user@gmail.com",
    "phoneNumber": "23490123456789",
    "role": "TUTOR",
    "gender": "male",
    "birthday": "27/07/2023",
    "password": "secret",
  }
  ```
- Required: all fields

- Response (201):
  ```yaml
  {
    "code": 134161,
    "email": "user@gmail.com",
    "role": "TUTOR",
    "userId": "64c61b51c45a721ff1ffa219",
  }
  ```

### POST /api/auth/{userId}/verify

- General:
  - On successful registration, the user receives a token, and submits it using this endpoint.
- Sample:
  - POST https://itutor-backend-6mcs.onrender.com/api/auth/64c61b51c45a721ff1ffa219/verify
- Body:
  ```yaml
  { "code": "134161" }
  ```
- Required: all fields

- Response (200):
  ```yaml
  { "message": "User verified" }
  ```

### POST /api/auth/resendCode

- General:
  - Users can use this endpoint to make requests for new token in cases whereby the user didn't insert the token within the specified time or wants a new token.
- Sample:
  - POST https://itutor-backend-6mcs.onrender.com/api/auth/resendCode
- Body:
  ```yaml
  { "email": "user@gmail.com" }
  ```
- Required: all fields

- Response (200):
  ```yaml
  {
    "code": 116031,
    "email": "user@gmail.com",
    "role": "TUTOR",
    "userId": "64c61b51c45a721ff1ffa219",
  }
  ```
