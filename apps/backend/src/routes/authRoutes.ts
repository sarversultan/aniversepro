import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/authController.js";
import { firebaseAuth } from "../utils/firebase";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    res.status(200).json({ uid: decodedToken.uid, email: decodedToken.email });
  } catch (error) {
    res.status(401).json({ message: "Invalid Firebase ID token", error });
  }
});
router.get("/me", getCurrentUser);
router.get("/logout", logoutUser);

export default router; 