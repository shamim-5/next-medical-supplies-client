# Next Medical Supplies Client

Welcome to Next Medical Supplies project build with [Next.js](https://nextjs.org/).This project based on surgical shop management where have tow different interface **user** and **admin**.

### Project Overview :

User can place order, modify current order, see current order status and previous order status. Admin can approve pending orders, after successful delivery make order status completed and the completed order shows user and admin side. Admin check every user due list and make it's status paid. User can see ther previous dues. More functionality will be implemented soon...

## Getting Started :

**Live Link:** [Next Medical Supplies Live Website](https://next-medical-supplies-client.vercel.app/)

Admin access:

```bash
email: admin@example.com
password: Admin123
```

#### **Note**: Please wait some time if no content is available in **live link**. Have some deployment issue cause of deploy server side **onrender**. Try reload browser tab for visualize updated content.

## Github Code Link :

- **Client Side Code:** [next-medical-supplies-client](https://github.com/shamim-5/next-medical-supplies-client)
- **Server Side Code:** [next-medical-supplies-server](https://github.com/shamim-5/next-medical-supplies-server)

## Features :

- User can search product, add product into cart, place order and update order
- Implemented Firebase authentication and use MongoDB for database
- User and Admin dashboard implemented with various functionality

## Technologies Used :

#### Client Side Implementation :

- [Next.js](https://nextjs.org/): A React framework for building server-rendered React applications.
- [TypeScript](https://www.typescriptlang.org/): A statically-typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for quickly building custom designs.
- [Ant Design](https://ant.design/): A design system and UI library for React applications.
- [React Hook Form](https://react-hook-form.com/): A library for managing form state and validation in React applications.
- [Redux](https://redux.js.org/): A state management library for managing the application's state.
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview): A toolset for simplifying API data fetching and state management.
- [Firebase](https://firebase.google.com/): A mobile and web application development platform by Google.

#### Server Side Implementation :

- [MongoDB](https://www.mongodb.com/): A NoSQL database for storing and retrieving data.
- [Node.js](https://nodejs.org/): A JavaScript runtime environment for server-side development.
- [Express.js](https://expressjs.com/): A fast and minimalist web application framework for Node.js.

## Functional Requirements :

### User :

- User can login and log out.
- User can manage and update their profile.
- User can place order, modify current order.
- User see current order status and previous order status.
_ User can see ther previous dues.

### Admin :

- Admin can log in and log out.
- Admin can manage and update their profile.
- Admin check every user due list and make it's status paid.
- Admin can approve pending orders, after successful delivery make order status completed.

## API Endpoints :

### User :

- `GET /cart-items`
- `GET /cart-items/${email}`
- `POST /cart-items`
- `DELETE /cart-items/:orderId`

### User :

- `GET /orders`
- `GET /orders/${email}`
- `POST /orders`
- `PATCH /orders/${id}`

## ER Diagram :

- [Next Medical Supplies: ER Diagram]()
