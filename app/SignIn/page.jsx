"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const formHandler = async (prevData, formData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await axios.post("/api/auth/login",
                {
                    email,
                    password,
                }
            );
            console.log(res.data);

            if (res.data.status === true) {
                if (res.data.user.role === "SUPER_ADMIN") {
                    toast.success("welcome to Admin Profile")
                    return router.push("/superAdmin")
                }
                router.push("/")
                toast.success("Login successful!");
                return {
                    error: null,
                    message: null,
                };
            }

            // API response failed
            const errorMessage =
                res.data.error ||
                res.data.message ||
                "Login failed";

            toast.error(errorMessage);

            return {
                error: errorMessage,
                message: null,
            };
        } catch (err) {
            const errorMessage =
                err.response?.data?.error ||
                err.response?.data?.message ||
                "Invalid email or password";

            toast.error(errorMessage);

            return {
                error: errorMessage,
                message: null,
            };
        }
    };

    const [data, action, pending] = useActionState(
        formHandler,
        {
            error: null,
            message: null,
        }
    );

    return (
        <main className="auth-page">
            <div className="auth-glow auth-glow-one"></div>
            <div className="auth-glow auth-glow-two"></div>

            <section className="auth-card">

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
                            toast.error("Not working");
                        }}
                    >
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="social-btn"
                        onClick={() => {
                            toast.error("Not working");
                        }}
                    >
                        Continue with GitHub
                    </button>

                </div>

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

                <p className="login-text">
                    Don't have an account?{" "}
                    <a href="/SignUp">
                        Create account
                    </a>
                </p>

            </section>
        </main>
    );
};

export default LoginForm;
