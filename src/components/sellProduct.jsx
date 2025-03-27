import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { db } from "./firebaseInit/firebase";
import { useAuth } from "./contexts/AuthContext"; // Import auth context
import styles from "./style/sell.module.css";

const categoryData = {
  Electronics: [
    "Desktop Computers",
    "Laptops",
    "Mobile Phones",
    "Televisions",
    "Cameras",
    "Headphones",
    "Smart Watches"
  ],
  "Men's Clothing": [
    "T-Shirt & Shirt",
    "Panjabi",
    "Jubba",
    "Pants",
    "Lungi",
    "Jacket",
    "Coat",
    "Tie",
    "Cap"
  ],
  "Women's Clothing": [
    "Hijab",
    "Three Piece",
    "Saree",
    "Shalwar Khameez",
    "Skirts",
    "Burqa"
  ],
  Vehicles: ["Motorcycles", "Bicycles"],
  Sports: [
    "Jersey",
    "Football",
    "Cricket Bats",
    "Cricket Balls",
    "Tennis Balls",
    "Boots",
    "Helmets",
    "Racket"
  ],
};

const dynamicFields = {
  Electronics: {
    "Desktop Computers": ["Model", "RAM", "Processor", "HDD"],
    Laptops: ["Model", "RAM", "Processor", "HDD"],
    "Mobile Phones": [
      "Model",
      "RAM",
      "Chipset",
      "Storage",
      "Display",
      "Cameras",
      "Edition"
    ],
    Televisions: ["Screen Size", "Resolution", "Display Type", "Model"],
    Cameras: ["Megapixels", "Lens Type", "Model"],
    Headphones: ["Model", "Connection Type", "Frequency (in Hz)"],
    "Smart Watches": [
      "Model",
      "Processor",
      "Display",
      "Connectivity",
      "Special Feature"
    ],
  },
  "Men's Clothing": {
    "T-Shirt & Shirt": [
      "Size",
      "Colour",
      "Collar Type",
      "Fabric Type",
      "Pattern",
      "Sleeve Type",
      "Pocket",
      "Care (How to wash)"
    ],
    Panjabi: [
      "Size",
      "Colour",
      "Collar Type",
      "Fabric Type",
      "Pattern",
      "Pocket",
      "Cut Or Fit",
      "Side Cut",
      "Sleeve Type",
      "Care (How to wash)"
    ],
    Jubba: [
      "Size",
      "Colour",
      "Fabric Type",
      "Sleeve Type",
      "Pocket",
      "CollarType",
      "Pattern",
      "Care (How to wash)"
    ],
    Pants: [
      "Size",
      "Colour",
      "Fabric Type",
      "Pocket",
      "Stitched",
      "Closure Type ",
      "Care (How to wash)"
    ],
    Lungi: [
      "Size ",
      "Colour",
      "Fabric Type",
      "Length (in Inch)",
      "Width (in Inch)",
      "Stitched",
      "Pattern ",
      "Care (How to wash)"
    ],
    Jacket: [
      "Size",
      "Colour",
      "Fabric Type",
      "Lining Material",
      "Closure Type",
      "Pocket ",
      "Care (How to wash)"
    ],
    Coat: [
      "Size",
      "Colour",
      "Collar Type",
      "Fabric Type",
      "Lining Material",
      "Pattern",
      "Pocket ",
      "Care (How to wash)"
    ],
    Tie: [
      "Colour",
      "Length (in meter)",
      "Width (in cm)",
      "Material ",
      "Pattern ",
      "Care (How to wash)"
    ],
    Cap: [
      "Colour",
      "Diameter (in Inch)",
      "Height (in Inch)",
      "Material",
      "Adjustable",
      "Care (How to wash)"
    ],
  },
  "Women's Clothing": {
    Hijab: [
      "Size",
      "Colour",
      "Fabric Type",
      "Pattern",
      "Style",
      "Care (How to wash)"
    ],
    "Three Piece": [
      "Size",
      "Colour",
      "Fabric Type",
      "Dupatta Length",
      "Top Style",
      "Bottom Type",
      "Stitched",
      "Care (How to wash)"
    ],
    Saree: [
      "Length",
      "Colour",
      "Fabric Type",
      "Pattern ",
      "Blouse Included",
      "Blouse Size",
      "Care (How to wash)"
    ],
    "Shalwar Khameez": [
      "Size",
      "Colour",
      "Fabric Type",
      "Style ",
      "Sleeve Type",
      "Stitched",
      "Care (How to wash)"
    ],
    Skirts: [
      "Size",
      "Colour",
      "Fabric Type",
      "Length",
      "Pattern )",
      "Care (How to wash)"
    ],
    Burqa: [
      "Size",
      "Colour",
      "Fabric Type",
      "Pattern ",
      "Style ",
      "Care (How to wash)"
    ],
  },
  Vehicles: {
    Motorcycles: [
      "Make",
      "Model",
      "Year of Manufacture",
      "Engine CC",
      "Fuel Type ",
      "Mileage (km/l)",
      "Transmission Type ",
      "Color",
      "Special Features "
    ],
    Bicycles: [
      "Use Type",
      "Frame Size",
      "Frame Material ",
      "Brake Type ",
      "Wheel Size (inches)",
      "Suspension ",
      "Gears (Number)",
      "Color",
    ],
  },
  Sports: {
    Jersey: [
      "Size",
      "Colour",
      "Material ",
      "Sleeve Type",
      "Team/Brand Name",
      "Player Name/Number (Optional)",
      "Care (How to wash)"
    ],
    Football: [
      "Size ",
      "Material ",
      "Weight (grams)",
      "Type ",
      "Stitching Type ",
      "Care (How to store)"
    ],
    "Cricket Bats": [
      "Size",
      "Willow Type",
      "Weight ",
      "Handle Type (Round, Oval)",
      "Grade",
      "Care (How to maintain)"
    ],
    "Cricket Balls": [
      "Material Type",
      "Colour",
      "Weight (grams)",
      "Stitch Type",
      "Care (How to store)"
    ],
    "Tennis Balls": [
      "Type (Pressurized, Non-Pressurized)",
      "Material",
      "Bounce Height",
      "Weight (grams)",
      "Care (How to store)"
    ],
    Boots: [
      "Size",
      "Colour",
      "Material",
      "Use Type",
      "Sole Type ",
      "Care (How to clean)"
    ],
    Helmets: [
      "Size",
      "Colour",
      "Material ",
      "Use Type",
      "Padding Type",
      "Weight (grams)",
      "Safety Standards (Certifications)"
    ],
    Racket: [
      " Game Type",
      "Weight (grams)",
      "Material",
      "String Tension",
      "Grip Size",
      "Care (How to maintain)"
    ],
  },
};

export default function Sell() {
  const { currentUser } = useAuth();
  // Step 1: Category selection; Step 2: Product Details
  const [step, setStep] = useState(1);
  
  // Step 1 state
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  // Step 2 state
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [dynamicValues, setDynamicValues] = useState({});
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("New");
  const [usedDuration, setUsedDuration] = useState("");
  const [productImage, setProductImage] = useState(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handlers for Step 1
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory("");
    setDynamicValues({});
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
    setDynamicValues({});
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!category || !subcategory) {
      alert("Please select both category and subcategory.");
      return;
    }
    setStep(2);
  };

  // Handlers for Step 2
  const handleFinalSubmit = async (e) => {
    console.log("Submitting...");
    e.preventDefault();
    if (!brand || !title || !type) {
      alert("Please fill out the required fields (brand, title, type).");
      return;
    }
    if (!price) {
      alert("Please enter a price.");
      return;
    }
    if (condition === "Used" && !usedDuration) {
      alert("Please specify the age of the used product.");
      return;
    }
    if (!productImage) {
      alert("Please upload a product image.");
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("file", productImage);
      formData.append("upload_preset", "ecommerce_products"); 

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/dycxaquwk/image/upload`, 
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;
      console.log("Image uploaded to:", imageUrl);
      console.log("Cloudinary response:", cloudinaryData);

      const productData = {
        category,
        subcategory,
        brand,
        title,
        type,
        dynamicValues,
        description,
        price,
        condition,
        usedDuration: condition === "Used" ? usedDuration : null,
        imageUrl,
        createdAt: new Date().toISOString(),
        userId: currentUser?.uid,
      };
      console.log("Final product data:", productData);

      const productsRef = ref(db, "products");
      const newProductRef = push(productsRef);
      await set(newProductRef, productData);

      // Show success modal and reset form
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Error uploading or saving product:", error);
      alert("Failed to post product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form state
  const resetForm = () => {
    setStep(1);
    setCategory("");
    setSubcategory("");
    setBrand("");
    setTitle("");
    setType("");
    setDynamicValues({});
    setDescription("");
    setPrice("");
    setCondition("New");
    setUsedDuration("");
    setProductImage(null);
  };

  let subcategoryFields = [];
  if (category && subcategory && dynamicFields[category]) {
    subcategoryFields = dynamicFields[category][subcategory] || [];
  }

  const handleDynamicChange = (fieldName, value) => {
    setDynamicValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  // Render Step 1
  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className={styles.sellForm}>
      <div className={styles.verticalGroup}>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={styles.select}
            required
          >
            <option value=""  style={{fontWeight:'bold'}}>Select Category</option>
            {Object.keys(categoryData).map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {category && (
          <div className={styles.formGroup}>
            <label htmlFor="subcategory" className={styles.label}>
              Subcategory:
            </label>
            <select
              id="subcategory"
              value={subcategory}
              onChange={handleSubcategoryChange}
              className={styles.select}
              required
            >
              <option value=""  style={{fontWeight:'bold'}}>Select Subcategory</option>
              {categoryData[category].map((sub) => (
                <option value={sub} key={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Next
      </button>
    </form>
  );

  // Render Step 2
  const renderStep2 = () => (
    <form onSubmit={handleFinalSubmit} className={styles.sellForm}>
      {/* Basic Info */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Brand (required):</label>
        <input
          type="text"
          className={styles.input}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Name / Title (required):</label>
        <input
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Keep it short"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Type (required):</label>
        <input
          type="text"
          className={styles.input}
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>

      {/* Dynamic Fields */}
      {subcategoryFields.map((field) => (
        <div className={styles.formGroup} key={field}>
          <label className={styles.label}>{field}:</label>
          <input
            type="text"
            className={styles.input}
            value={dynamicValues[field] || ""}
            onChange={(e) => handleDynamicChange(field, e.target.value)}
          />
        </div>
      ))}

      {/* Description */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Product Details:</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write something about your product..."
        />
      </div>

      {/* Image Uploader */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Product Image:</label>
        <input
          type="file"
          onChange={(e) => setProductImage(e.target.files[0])}
          className={styles.fileInput}
          required
        />
      </div>

      {/* Price */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Price (in BD Taka):</label>
        <input
          type="number"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      {/* Condition */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Condition:</label>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="condition"
              value="New"
              checked={condition === "New"}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
            New
          </label>
          <label>
            <input
              type="radio"
              name="condition"
              value="Used"
              checked={condition === "Used"}
              onChange={(e) => setCondition(e.target.value)}
            />
            Used
          </label>
        </div>
      </div>

      {/* If Used, show used duration */}
      {condition === "Used" && (
        <div className={styles.formGroup}>
          <label className={styles.label}>How old is the product?</label>
          <select
            value={usedDuration}
            onChange={(e) => setUsedDuration(e.target.value)}
            className={styles.select}
          >
            <option value=""  style={{fontWeight:'bold'}}>Select Age</option>
            <option value="Under 6 months">Under 6 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="2.5 years">2.5 years</option>
            <option value="3 years">3 years</option>
            <option value="5 years">5 years</option>
            <option value="More than 5 years">More than 5 years</option>
          </select>
        </div>
      )}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post Product"}
      </button>
    </form>
  );

  return (
    <div className={styles.sellContainer}>
      <h1 className={styles.title}>Sell Your Product</h1>
      {step === 1 ? (
        <>
          <p className={styles.subtitle}>Select a Category and Subcategory</p>
          {renderStep1()}
        </>
      ) : (
        <>
          <p className={styles.subtitle}>
            Provide product details for <strong>{subcategory}</strong>
          </p>
          {renderStep2()}
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.successModal}>
            <h2>Product Posted Successfully!</h2>
            <p>Your product has been posted. You can now view it on the marketplace.</p>
            <button
              className={styles.submitButton}
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
