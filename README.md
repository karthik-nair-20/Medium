# Medium Clone

A full-stack Medium-like blog platform built using modern technologies, providing features such as user authentication, post creation, image uploads, and more.

## 🚀 Features

- **User Authentication**: Sign up and sign in functionality.
- **CRUD Operations on Posts**: Create, read, update, and delete blog posts.
- **Image Upload**: Upload and retrieve images for posts.
- **User-Specific Content**: Fetch posts specific to the logged-in user.
- **Secure Routes**: Protected routes with authentication middleware.
- **Deployed**: Scalable deployment using Cloudflare.

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React
- **Language**: TypeScript
- **Styling**: (Add your CSS framework/library if used)
  
### **Backend**
- **Framework**: HonoJS
- **Database**: PostgreSQL
- **ORM**: Prisma ORM

### **Deployment**
- **Platform**: Cloudflare

## 📂 Project Structure

### **Frontend**
The frontend is built with React and TypeScript, focusing on creating an intuitive and responsive user interface.

### **Backend**
The backend, powered by HonoJS, handles authentication, blog post management, and image uploads. It uses Prisma ORM for database interactions with PostgreSQL.

## 📡 API Endpoints

### **User Routes**
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/signup`        | Register a new user      |
| POST   | `/signin`        | Authenticate a user      |

### **Post Routes**
| Method | Endpoint               | Description                           |
|--------|------------------------|---------------------------------------|
| GET    | `/all-posts`           | Fetch all posts                      |
| GET    | `/posts`               | Fetch user-specific posts (auth)     |
| POST   | `/create-post`         | Create a new post (auth)             |
| GET    | `/post/:id`            | Fetch a specific post (auth)         |
| GET    | `/all/:id`             | Fetch a specific post (public)       |
| PUT    | `/post/:id`            | Update a specific post (auth)        |
| DELETE | `/post/:id`            | Delete a specific post (auth)        |

### **Image Routes**
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/upload`        | Upload an image (auth)   |
| GET    | `/upload/:id`    | Retrieve an image        |

## 🖥️ Installation & Setup

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **PostgreSQL**: Set up a PostgreSQL database.

### **Steps to Run Locally**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/medium-clone.git
   cd medium-clone
----------------------------------------------------------------



