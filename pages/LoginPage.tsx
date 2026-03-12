"use client"
import { useState } from "react";
import Link from "next/link";


const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-light">{isRegister ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground font-body mt-2">
            {isRegister ? "Join the Glowsera family" : "Sign in to your account"}
          </p>
        </div>

        <div className="space-y-4">
          {isRegister && (
            <input type="text" placeholder="Full Name" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
          )}
          <input type="email" placeholder="Email Address" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
          {isRegister && (
            <input type="password" placeholder="Confirm Password" className="w-full px-4 py-3 text-sm border border-border rounded-sm bg-background font-body focus:outline-none focus:ring-1 focus:ring-rose-gold" />
          )}

          <button className="w-full btn-rose">{isRegister ? "Create Account" : "Sign In"}</button>

          {!isRegister && (
            <Link href="/forgot-password" className="block text-center text-xs text-muted-foreground hover:text-rose-gold font-body">
              Forgot your password?
            </Link>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground font-body">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-rose-gold hover:underline font-medium">
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
