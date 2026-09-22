"use client";

import axios from "axios";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formHandler = async (prevData, formData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });

            if (res.data.status === "success") {
                toast.success("Login successful!");

                // Change this to your dashboard/home route
                window.location.href = "/dashboard";
            } else {
                toast.error(
                    res.data.message || "Login failed"
                );
            }

            return {
                message: res.data.message || "Login successful",
            };
        } catch (err) {
            const error =
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Invalid email or password";

            toast.error(error);

            return {
                error,
            };
        }
    };

    const [data, action, pending] = useActionState(
        formHandler,
        undefined
    );

    return (
        <main className="auth-page">

            {/* Background decoration */}
            <div className="auth-glow auth-glow-one"></div>
            <div className="auth-glow auth-glow-two"></div>

            <section className="auth-card">



                {/* Heading */}
                <div className="auth-heading">
                    <h2>Welcome Back</h2>

                    <p>
                        Sign in to continue your journey.
                    </p>
                </div>

                {/* Social Login */}
                <div className="social-buttons">

                    <button
                        type="button"
                        className="social-btn"
                        onClick={() => {
                            toast.error("not working");
                        }}
                    >
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="#4285F4"
                                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.27-2.09 3.57-5.17 3.57-8.64Z"
                            />

                            <path
                                fill="#34A853"
                                d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.43 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.09A12 12 0 0 0 12 24Z"
                            />

                            <path
                                fill="#FBBC05"
                                d="M5.28 14.29A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.29V6.62H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l4-3.09Z"
                            />

                            <path
                                fill="#EA4335"
                                d="M12 4.76c1.76 0 3.34.61 4.58 1.81l3.43-3.43C17.95 1.18 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4 3.09C5.23 6.87 7.88 4.76 12 4.76Z"
                            />
                        </svg>

                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="social-btn"
                        onClick={() => {
                             toast.error("not working");
                        }}
                    >
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 24 24"
                            fill="white"
                        >
                            <path d="M12 .5A12 12 0 0 0 8.21 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z" />
                        </svg>

                        Continue with GitHub
                    </button>

                </div>

                {/* Divider */}
                <div className="auth-divider">
                    <span>OR</span>
                </div>

                {/* Login Form */}
                <form action={action} className="auth-form">

                    {/* Email */}
                    <div className="auth-field">

                        <label htmlFor="email">
                            Email address
                        </label>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                ✉
                            </span>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                autoComplete="email"
                                required
                            />

                        </div>

                    </div>

                    {/* Password */}
                    <div className="auth-field">

                        <div className="password-label">

                            <label htmlFor="password">
                                Password
                            </label>

                            <a
                                href="/forgot-password"
                                className="forgot-password"
                            >
                                Forgot password?
                            </a>

                        </div>

                        <div className="input-wrapper">

                            <span className="input-icon">
                                🔒
                            </span>

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>

                    {/* Remember Me */}
                    <label className="terms">

                        <input
                            type="checkbox"
                            name="remember"
                        />

                        <span>
                            Remember me
                        </span>

                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={pending}
                        className="submit-btn"
                    >
                        {pending ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            "Sign In →"
                        )}
                    </button>

                </form>

                {/* Error */}
                {data?.error && (
                    <div className="form-error">
                        ⚠ {data.error}
                    </div>
                )}

                {/* Success */}
                {data?.message && !data?.error && (
                    <div className="form-success">
                        ✓ {data.message}
                    </div>
                )}

                {/* Register */}
                <p className="login-text">
                    Don't have an account?{" "}
                    <a href="/register">
                        Create account
                    </a>
                </p>

            </section>
        </main>
    );
};

export default LoginForm;
