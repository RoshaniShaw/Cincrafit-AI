import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

const SignInModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  //EMAIL SIGN IN
  const handleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const idToken = await userCred.user.getIdToken();

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Backend verification failed");

      console.log("✅ Email user verified");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //GOOGLE SIGN IN
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Backend verification failed");

      console.log("✅ Google user verified");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //SIGN UP
  const handleSignUp = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMode("signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl p-6 relative">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white"
          >
            ✕
          </button>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">
              🔥 <span className="text-orange-500">Cincrafit</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              {mode === "signin" ? "Sign in to continue" : "Create your account"}
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg"
            />

            {mode === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-neutral-700 rounded-lg"
              />
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              disabled={loading}
              onClick={mode === "signin" ? handleSignIn : handleSignUp}
              className="w-full py-3 rounded-lg bg-orange-500 font-semibold disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </div>

          {/* GOOGLE SIGN IN */}
          {mode === "signin" && (
            <>
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-neutral-800" />
                <span className="text-xs text-neutral-500">OR</span>
                <div className="flex-1 h-px bg-neutral-800" />
              </div>

              <button
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-neutral-700 hover:bg-neutral-800 disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm">Continue with Google</span>
              </button>
            </>
          )}

          <p className="text-xs text-neutral-400 text-center mt-6">
            {mode === "signin" ? (
              <>Don’t have an account? <span onClick={() => setMode("signup")} className="text-orange-500 cursor-pointer">Create one</span></>
            ) : (
              <>Already have an account? <span onClick={() => setMode("signin")} className="text-orange-500 cursor-pointer">Sign in</span></>
            )}
          </p>

        </div>
      </div>
    </>
  );
};

export default SignInModal;
