// // import express from 'express';
// // import mongoose from 'mongoose';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import authRoutes from './routes/auth.js';
// // import adRoutes from './routes/ads.js';

// // // Load environment variables
// // dotenv.config();

// // const app = express();

// // // Validate required environment variables
// // if (!process.env.MONGO_URI) {
// //   console.error('Error: MONGO_URI is not defined in the .env file');
// //   process.exit(1);
// // }

// // if (!process.env.JWT_SECRET) {
// //   console.error('Error: JWT_SECRET is not defined in the .env file');
// //   process.exit(1);
// // }
// // app.use(cors({
// //   origin: [
// //     'https://adchain-omega.vercel.app',                   // old frontend
// //     'https://adchain-2n6xvg8jw-avir0s-projects.vercel.app', // new frontend
// //     'http://localhost:3000'                               // local dev
// //   ],
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// //   credentials: true
// // }));

// // // Middleware
// // // app.use(cors({
// // //   origin: [
// // //     'https://adchain-omega.vercel.app', // ✅ deployed frontend
// // //     'http://localhost:3000'             // ✅ local dev
// // //   ],
// // //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// // //   allowedHeaders: ['Content-Type', 'Authorization'],
// // //   credentials: true
// // // }));

// // app.use(express.json());

// // // Connect to MongoDB with retry logic
// // const connectWithRetry = async (retries = 5, delay = 5000) => {
// //   for (let i = 0; i < retries; i++) {
// //     try {
// //       await mongoose.connect(process.env.MONGO_URI, {
// //         serverSelectionTimeoutMS: 5000,
// //         maxPoolSize: 10,
// //       });
// //       console.log('MongoDB connected');
// //       return;
// //     } catch (err) {
// //       console.error(`MongoDB connection attempt ${i + 1} failed:`, err.message);
// //       if (i === retries - 1) {
// //         console.error('MongoDB connection failed after all retries. Exiting...');
// //         process.exit(1);
// //       }
// //       console.log(`Retrying in ${delay / 1000} seconds...`);
// //       await new Promise((resolve) => setTimeout(resolve, delay));
// //     }
// //   }
// // };

// // // Initiate MongoDB connection
// // connectWithRetry();

// // // Mount Routes
// // app.use('/api/users', authRoutes);
// // app.use('/api/ads', adRoutes);

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// // });

// // // Start the server
// // const PORT = process.env.PORT || 5001;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './routes/auth.js';
// import adRoutes from './routes/ads.js';

// dotenv.config();

// const app = express();

// // -----------------------------
// // Validate env
// // -----------------------------
// if (!process.env.MONGO_URI) {
//   console.error('Error: MONGO_URI missing');
//   process.exit(1);
// }

// if (!process.env.JWT_SECRET) {
//   console.error('Error: JWT_SECRET missing');
//   process.exit(1);
// }

// // -----------------------------
// // CORS (production safe)
// // -----------------------------
// app.use(cors({
//   origin: function (origin, callback) {
//     const allowed = [
//       'https://adchain-omega.vercel.app',
//       'https://adchain-2n6xvg8jw-avir0s-projects.vercel.app',
//       'http://localhost:3000'
//     ];

//     // Allow Postman / server calls
//     if (!origin) return callback(null, true);

//     if (allowed.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS not allowed'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// app.options('*', cors());

// // -----------------------------
// // Middleware
// // -----------------------------
// app.use(express.json());

// // -----------------------------
// // MongoDB Connection
// // -----------------------------
// const connectWithRetry = async (retries = 5, delay = 5000) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       await mongoose.connect(process.env.MONGO_URI, {
//         serverSelectionTimeoutMS: 5000,
//         maxPoolSize: 10,
//       });
//       console.log('MongoDB connected');
//       return;
//     } catch (err) {
//       console.error(`MongoDB attempt ${i + 1} failed:`, err.message);

//       if (i === retries - 1) {
//         console.error('MongoDB failed after retries. Exiting...');
//         process.exit(1);
//       }

//       await new Promise((r) => setTimeout(r, delay));
//     }
//   }
// };

// connectWithRetry();

// // -----------------------------
// // Routes
// // -----------------------------
// app.use('/api/users', authRoutes);
// app.use('/api/ads', adRoutes);

// // -----------------------------
// // Health check (important)
// // -----------------------------
// app.get('/', (req, res) => {
//   res.send('Adchain backend running 🚀');
// });

// // -----------------------------
// // Global Error Handler
// // -----------------------------
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: err.message || 'Something went wrong',
//   });
// });

// // -----------------------------
// // Server
// // -----------------------------
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import adRoutes from './routes/ads.js';
import analyticsRoutes from './routes/analytics.js'; // ✅ NEW

dotenv.config();

const app = express();

// -----------------------------
// Validate env
// -----------------------------
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI missing');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET missing');
  process.exit(1);
}

// -----------------------------
// CORS (Vercel + local safe)
// -----------------------------
app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        'https://adchain-omega.vercel.app',
        'https://adchain-2n6xvg8jw-avir0s-projects.vercel.app',
        'http://localhost:3000',
      ];

      // Allow Postman / backend-to-backend calls
      if (!origin) return callback(null, true);

      if (allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());

// -----------------------------
// Middleware
// -----------------------------
app.use(express.json());

// -----------------------------
// MongoDB Connection
// -----------------------------
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10,
      });
      console.log('MongoDB connected');
      return;
    } catch (err) {
      console.error(`MongoDB attempt ${i + 1} failed:`, err.message);

      if (i === retries - 1) {
        console.error('MongoDB failed after retries. Exiting...');
        process.exit(1);
      }

      await new Promise((r) => setTimeout(r, delay));
    }
  }
};

connectWithRetry();

// -----------------------------
// Routes
// -----------------------------
app.use('/api/users', authRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/analytics', analyticsRoutes); // ✅ NEW analytics endpoint

// -----------------------------
// Health check
// -----------------------------
app.get('/', (req, res) => {
  res.send('Adchain backend running 🚀');
});

// -----------------------------
// Global Error Handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Something went wrong',
  });
});

// -----------------------------
// Server
// -----------------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

