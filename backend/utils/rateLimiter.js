import { performance } from "perf_hooks";

// Store logs per IP
const requestLogs = new Map();

export const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = performance.now(); 
  const WINDOW_SIZE = 60 * 1000;
  const MAX_REQUESTS = 10;

  if (!requestLogs.has(ip)) {
    requestLogs.set(ip, []);
  }

  const timestamps = requestLogs.get(ip);

  while (timestamps.length && now - timestamps[0] > WINDOW_SIZE) {
    timestamps.shift();
  }

  if (timestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({ message: "Too many requests. Please try again later." });
  }

  timestamps.push(now);
  requestLogs.set(ip, timestamps);
  next();
};
