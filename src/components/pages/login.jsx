import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // adjust the path as needed
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import {motion} from "framer-motion";
import styles from "../style/login.module.css";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
      
    } catch (err) {
      setError("Failed to login.");
      console.error(err);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");

    } catch (err) {
      setError("Failed to login with Google.");
      console.error(err);
    }
  }

  return (
    <motion.div 
      className={`container ${styles.loginContainer}`} 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form 
        className={`p-4 rounded ${styles.loginForm}`} 
        onSubmit={handleSubmit}
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
      >
        <h2 className="text-center mb-4 text-light">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3 position-relative">
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="mb-3 position-relative">
          <input 
            type={showPassword ? "text" : "password"} 
            className="form-control" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <span 
            className={styles.eyeIcon} 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <motion.button 
          type="submit" 
          className={`btn w-100 ${styles.loginButton}`} 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
        <hr className="my-4 text-light" />
        <motion.button 
          type="button" 
          className={`btn w-100 ${styles.googleButton}`} 
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <FaGoogle className="me-2 text-white" /><span className="text-light"> Login with Gmail</span>
        </motion.button>
 <br /><br />
        <p style={{fontSize:'14px', textAlign:"center",color:'white'}}>Don't have an account, <Link to="/signup" style={{color:'cyan',textDecoration:'none'}}>SignUp</Link> instead !</p>
      </motion.form>

    </motion.div>
  );
}
