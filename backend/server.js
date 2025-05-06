import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connect } from "./db/db.js";
import transroutes from "./routes/transactions.js";
import authroutes from "./routes/auth.js";
import savingroutes from "./routes/savings.js";
import billsRoutes from "./routes/bills.js";
import mailroutes from "./routes/sendEmail.js";
import userroutes from "./routes/user.js";
import grouproutes from "./routes/groups.js";
import friendroutes from "./routes/friends.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// ✅ CORS: allow your frontend Render domain
app.use(
  cors({
    origin: ["https://equipay-1.onrender.com"], // frontend domain
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/bills", billsRoutes);
app.use("/api/transactions", transroutes);
app.use("/api/savings", savingroutes);
app.use("/api/auth", authroutes);
app.use("/api/mail", mailroutes);
app.use("/api/user", userroutes);
app.use("/api/group", grouproutes);
app.use("/api/friend", friendroutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server error";
  console.error(err);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Server listens on PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
