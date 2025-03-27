import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaInfoCircle, FaStar, FaStarHalfAlt } from "react-icons/fa";
import styles from "./style/productCard.module.css";
import { getDatabase, ref, onValue } from "firebase/database";

export default function ProductCard({ product = {}, onProductSelect }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  // Destructure product properties with defaults
  const { id, imageUrl = "", title = "Unknown Product", price = "N/A", type = "Unknown", discountPercentage = 0 } = product;

  useEffect(() => {
    if (!id) return;
    const db = getDatabase();
    const reviewsRef = ref(db, `reviews/${id}`);
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsList = Object.values(data);
        setReviews(reviewsList);
      } else {
        setReviews([]);
      }
    });
    return () => unsubscribe();
  }, [id]);

  // Calculate average rating from the fetched reviews
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length
      : 0;

 
  const totalStars = 5;
  const stars = Array.from({ length: totalStars }, (_, i) => {
    const starNumber = i + 1;
    if (averageRating >= starNumber) {
      return <FaStar key={i} color="#ffc107" size={16} />;
    } else if (averageRating >= starNumber - 0.5) {
      return <FaStarHalfAlt key={i} color="#ffc107" size={16} />;
    } else {
      return <FaStar key={i} color="#444" size={16} />;
    }
  });

  const handleCardClick = () => {
    if (onProductSelect) {
      onProductSelect(product);
    }
    navigate(`/product/${id}`, { state: { product } });
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.productImage} />
        <div className={styles.shadow}></div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>{title}</h3>
        <p className={styles.type}>Type: {type}</p>

        <div className="d-flex" style={{position:"relative",top:"-6px"
        }}>
        <p className={styles.productPrice}>{price} <span style={{fontSize:'19px',fontWeight:700}}>৳</span></p>

        {discountPercentage > 0 && (
          <p className={styles.discount}> {discountPercentage}% Off</p>
        )}
    </div>

        {/* Rating Section */}
        <div className={styles.ratingSection}>
          {stars}
          <span className={styles.ratingText}>
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </span>
        </div>

      </div>
    </div>
  );
}
