"use client";

import type React from "react";
import { useState } from "react";
import { useUser, type User } from "@/components/user-context";
import BGV from "@/assets/bgv.png";
import Image from "next/image";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: isSignUp ? name : "Evan Yates",
        email: email,
        role: isAdmin ? "admin" : "user",
      };
      setUser(newUser);
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  // SOCIAL BUTTONS COMPONENT
  const SocialButtons = () => (
    <div className="w-full">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white rounded-2xl text-slate-600">
            Or continue with
          </span>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
        Continue with Google
      </button>

      <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium">
        Continue with GitHub
      </button>
    </div>
  );

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-[#F1E3F1] via-[#E8DCE6] to-[#F8D5E6] flex justify-center items-center p-6">
      <div className="w-full max-w-4xl">

        {/* LOGO */}
        <div className="text-center mb-8">
          <Image
            src={BGV}
            alt="logo"
            style={{ backgroundColor: "transparent" }}
            className="w-24 h-24 mx-auto mb-3 object-contain"
          />
          <h1 className="text-3xl font-bold text-black mb-1">BlueGrid Ventures</h1>
          <p className="text-black text-sm">Project & Finance Management</p>
        </div>

        {/* TWO BOXES */}
        <div className="lg:flex lg:gap-6">

          {/* LEFT BOX */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 
              lg:w-1/2 mb-6 lg:mb-0 border border-slate-200 lg:h-[480px]">

            <h2 className="text-2xl font-bold text-slate-900 mb-5 text-center">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={isSignUp}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <input
                  type="checkbox"
                  id="admin-toggle"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="admin-toggle" className="text-sm text-slate-700 font-medium cursor-pointer">
                  Login as Admin
                </label>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-75 mt-4"
              >
                {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>
          </div>

          {/* RIGHT BOX */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 
                border border-slate-200 lg:h-[480px]">
              <SocialButtons />
            </div>
          </div>
        </div>

        {/* SOCIAL BUTTONS FOR SMALL SCREENS */}
        <div className="lg:hidden mt-5">
          <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 border border-slate-200">
            <SocialButtons />
          </div>
        </div>

        {/* SWITCH SIGN IN / SIGN UP */}
        <p className="text-center text-slate-600 text-sm mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-700 font-semibold ml-1"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        {/* FOOTER */}
        <p className="text-center text-black text-xs mt-6">
          Privacy Policy • Terms • Contact
        </p>

      </div>
    </div>
  );
}