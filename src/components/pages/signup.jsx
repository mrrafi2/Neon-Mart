import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";
import styles from "../style/signup.module.css"; // Import module CSS
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for show/hide password

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    agree: false,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword, phoneNumber, gender,  } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
   

    try {
      await signup(email, password, username, phoneNumber, gender);
      navigate("/"); // Redirect after signup
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.signupContainer}>
      <h2>Sign Up</h2>
      
      <br />
      {error && <p className={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
        <br />
        <br />

        {/* Email */}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <br />
        <br />

        {/* Password with toggle */}
        <div className={styles.passwordWrapper}>
          <input 
            type={passwordVisible ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <span onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        
        <br />

        {/* Confirm Password */}
        <div className={styles.passwordWrapper}>
          <input 
            type={confirmPasswordVisible ? "text" : "password"} 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />
          <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
         
         <br />

        {/* Phone Number */}
        <input 
          type="tel" 
          name="phoneNumber" 
          placeholder="Phone Number" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          required 
        />
        <br />
        <br />

        {/* Gender */}
        <div className={styles.genderContainer}>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="Male" 
              checked={formData.gender === "Male"} 
              onChange={handleChange} 
              required 
              
            />
            Male
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="Female" 
              checked={formData.gender === "Female"} 
              onChange={handleChange} 
              required 
            />
            Female
          </label>
          <label>
            <input 
              type="radio" 
              name="gender" 
              value="Other" 
              checked={formData.gender === "Other"} 
              onChange={handleChange} 
              required 
            />
            Other
          </label>
        </div>

       <br />
       
        {/* Submit Button */}
        <button type="submit" className={styles.signupButton}>
          Create Account
        </button>
      </form>
    </div>
  );
}
