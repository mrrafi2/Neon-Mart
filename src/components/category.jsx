import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/category.module.css";
import { h2 } from "framer-motion/client";

// Use the same categoryData as in your Sell page
const categoryData = {
  Electronics: [
    "Desktop Computers",
    "Laptops",
    "Mobile Phones",
    "Televisions",
    "Cameras",
    "Headphones",
    "Smart Watch",
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
    "Cap",
  ],
  "Women's Clothing": [
    "Hijab",
    "Three Piece",
    "Saree",
    "Shalwar Khameez",
    "Skirts",
    "Burqa",
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
    "Racket",
  ],
};

export default function Category() {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  
  const handleSubcategoryClick = (category, subcategory) => {
    navigate(`/products/${encodeURIComponent(category)}/${encodeURIComponent(subcategory)}`);
  };

  return (
    <>
    <h3 style={{color:'#ddd', fontSize:'23px', marginLeft:'20px'}}>Browse Category</h3>
    <br />
    <div className={styles.categoryContainer}>
      {Object.keys(categoryData).map((category) => (
        <div key={category} className={styles.categoryItem}>
          <button
            className={styles.categoryButton}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
          {expandedCategories[category] && (
            <ul className={styles.subcategoryList}>
              {categoryData[category].map((sub) => (
                <li key={sub} className={styles.subcategoryItem}>
                  <button
                    className={styles.subcategoryButton}
                    onClick={() => handleSubcategoryClick(category, sub)}
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
    </>
  );
}
