import express from "express";
import admin, { db } from "../firebase.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

// SAVE / UPDATE CHAT
router.post("/save", verifyToken, async (req, res) => {
  const { chatId, domain, messages } = req.body;
  const uid = req.user.uid;

  try {
    if (chatId) {
      await db
        .collection("users")
        .doc(uid)
        .collection("chats")
        .doc(chatId)
        .update({
          messages,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      return res.json({ success: true, chatId });
    }

    // new chat creation
    const docRef = await db
      .collection("users")
      .doc(uid)
      .collection("chats")
      .add({
        domain,
        messages,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    res.json({ success: true, chatId: docRef.id });
  } catch (err) {
    console.error("❌ Chat save error:", err);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

// LIST CHATS
router.get("/list", verifyToken, async (req, res) => {
  const uid = req.user.uid;

  const snapshot = await db
    .collection("users")
    .doc(uid)
    .collection("chats")
    .orderBy("updatedAt", "desc")
    .get();

  const chats = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json(chats);
});

export default router;
