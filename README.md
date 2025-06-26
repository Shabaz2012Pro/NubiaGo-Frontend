# NubiaGo - Premium Marketplace

A full-stack ecommerce platform connecting Turkish suppliers with African markets, built with modern web technologies.

## 🚀 Features

### Frontend
- **Modern React 18** with TypeScript and Vite
- **Responsive Design** with Tailwind CSS
- **State Management** with Zustand
- **Authentication** with Supabase
- **Real-time Updates** and notifications
- **PWA Capabilities** for mobile experience
- **Performance Optimizations** with lazy loading and code splitting

### Backend
- **Express.js** REST API server
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with refresh tokens
- **Rate Limiting** and security middleware
- **File Upload** with Multer
- **Email Services** with Nodemailer
- **Payment Processing** with Stripe integration

### Key Functionality
- 🛒 **Shopping Cart** with persistent storage
- 👤 **User Authentication** and profile management
- 📦 **Product Catalog** with advanced filtering
- 🔍 **Search & Recommendations** engine
- 💳 **Secure Checkout** with multiple payment options
- 📊 **Admin Dashboard** for order and product management
- 📱 **Mobile-First** responsive design
- 🌍 **Multi-language** support (Turkish/English)

## 🏗️ Project Structure

```
├── src/                    # Frontend React application
│   ├── api/               # API clients and queries
│   ├── components/        # Reusable UI components
│   │   ├── atoms/         # Basic UI elements
│   │   ├── molecules/     # Composite components
│   │   └── organisms/     # Complex UI sections
│   ├── pages/             # Page components
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── server/                 # Backend Express application
│   ├── config/            # Database and app configuration
│   ├── middleware/        # Express middleware
│   ├── models/            # MongoDB/Mongoose models
│   ├── routes/            # API route handlers
│   └── server.js          # Main server file
└── public/                # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Supabase account (for authentication)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Environment Setup:**

   **Frontend (.env):**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

   **Backend (server/.env):**
   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

3. **Start Development Servers:**
   ```bash
   # Frontend (runs on port 5000)
   npm run dev

   # Backend (runs on port 3001)
   cd server && npm run dev
   ```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Rate limiting** on API endpoints
- **Input validation** and sanitization
- **CORS protection**
- **Helmet.js** security headers
- **bcrypt** password hashing
- **XSS protection** with DOMPurify

## 📱 PWA Features

- **Offline functionality** with service workers
- **App-like experience** on mobile devices
- **Push notifications** for order updates
- **Install prompt** for home screen addition

## 🚀 Deployment

### Frontend
The frontend is configured for deployment on Replit with automatic builds and optimizations.

### Backend
The Express server is configured to run on Replit with proper environment variable handling.

## 🔍 Performance Optimizations

- **Code splitting** with React.lazy
- **Image optimization** with lazy loading
- **Virtual scrolling** for large product lists
- **React Query** for efficient data fetching
- **Bundle analysis** for size optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: support@nubiago.com
- Documentation: [Project Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)

---

**NubiaGo** - Connecting Turkish suppliers with African markets through innovative ecommerce technology.