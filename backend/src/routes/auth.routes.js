import express from "express";
import admin from "../firebase.js";

const router = express.Router();

/**
 * VERIFY LOGIN TOKEN
 */
router.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID token missing" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    res.status(200).json({
      uid: decodedToken.uid,
      email: decodedToken.email,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
