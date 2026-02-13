import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚽ Turf Booking</h1>
          <p style={styles.subtitle}>
            {isSignup ? "Create Your Account" : "Book your favorite cricket turf"}
          </p>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <form onSubmit={isSignup ? handleSignup : handleLogin} style={styles.form}>
          {isSignup && (
            <>
              <div style={styles.formGroup}>
                <label htmlFor="firstName" style={styles.label}>
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="lastName" style={styles.label}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="phoneNumber" style={styles.label}>
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={styles.input}
                />
              </div>
            </>
          )}

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.loginButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (isSignup ? "Creating account..." : "Logging in...") : (isSignup ? "Create Account" : "Login")}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
        </div>

        <button
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
          }}
          style={styles.signupButton}
        >
          {isSignup ? "Login Instead" : "Create Account"}
        </button>

        {!isSignup && (
          <div style={styles.footer}>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  loginBox: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    padding: "40px",
    width: "100%",
    maxWidth: "480px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "8px",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  errorMessage: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "center",
    border: "1px solid #fcc",
  },
  form: {
    marginBottom: "24px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
    fontFamily: "inherit",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "24px 0",
    color: "#999",
    fontSize: "13px",
  },
  dividerText: {
    flex: 1,
    textAlign: "center",
    color: "#999",
  },
  signupButton: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#667eea",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
  },
  link: {
    fontSize: "14px",
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "500",
  },
};
