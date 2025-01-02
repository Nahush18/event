import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const signupData = { username, email, password };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const result = await res.json();

      if (res.status === 200) {
        router.push("/login"); // Redirect to login page after successful signup
      } else {
        setErrorMessage(result.message || "Signup failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
        <div style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign Up</h1>
          {errorMessage && (
            <div style={{ backgroundColor: '#e3342f', color: 'white', padding: '10px', marginBottom: '20px', borderRadius: '8px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="username" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="confirmPassword" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#555' }}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  marginTop: '8px',
                  fontSize: '1rem',
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
