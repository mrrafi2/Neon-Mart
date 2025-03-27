import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import OverlayPortal from "./overportal"; 
import styles from "./style/search.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  // Fetch all products from Firebase on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const db = getDatabase();
        const productsRef = ref(db, "products");
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const productsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setAllProducts(productsArray);
        } else {
          setAllProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Generate suggestions from title, brand, type, subcategory
  useEffect(() => {
    if (query.trim() !== "") {
      const lowerQuery = query.toLowerCase();
      const suggestionSet = new Set();
      allProducts.forEach((product) => {
        if (product.title && product.title.toLowerCase().includes(lowerQuery)) {
          suggestionSet.add(product.title);
        }
        if (product.brand && product.brand.toLowerCase().includes(lowerQuery)) {
          suggestionSet.add(product.brand);
        }
        if (product.type && product.type.toLowerCase().includes(lowerQuery)) {
          suggestionSet.add(product.type);
        }
       
      });
      setSuggestions(Array.from(suggestionSet));
      setShowOverlay(true);
    } else {
      setSuggestions([]);
      setShowOverlay(false);
    }
  }, [query, allProducts]);

  // When a suggestion is clicked, navigate to search results page.
  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setQuery("");
    setShowOverlay(false);
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {showOverlay &&
        <OverlayPortal>
          <div className={styles.overlay}>
            <div className={styles.overlayHeader}>
              <h3>Suggestions</h3>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setQuery("");
                  setShowOverlay(false);
                }}
              >
                &times;
              </button>
            </div>
            <ul className={styles.suggestionsList}>
              {suggestions.length > 0 ? (
                suggestions.map((sugg, idx) => (
                  <li
                    key={idx}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(sugg)}
                  >
                    {sugg}
                  </li>
                ))
              ) : (
                <p className={styles.noResults}>No suggestions found.</p>
              )}
            </ul>
          </div>
        </OverlayPortal>
      }
    </div>
  );
};

export default SearchBar;
