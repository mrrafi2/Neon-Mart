import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useLocation } from "react-router-dom";
import ProductGrid from "./productGrid";
import LoadingSpinner from "./loading";
import styles from "./style/searchResult.module.css";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the query parameter from the URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchQuery = queryParams.get("q") || "";

  const fetchProducts = async () => {
    const db = getDatabase();
    const productsRef = ref(db, "products");
    try {
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        let productsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        const lowerQuery = searchQuery.toLowerCase();
        productsArray = productsArray.filter((product) => {
          const titleMatch = product.title && product.title.toLowerCase().includes(lowerQuery);
          const brandMatch = product.brand && product.brand.toLowerCase().includes(lowerQuery);
          const typeMatch = product.type && product.type.toLowerCase().includes(lowerQuery);
          const subcategoryMatch = product.subcategory && product.subcategory.toLowerCase().includes(lowerQuery);
          return titleMatch || brandMatch || typeMatch || subcategoryMatch;
        });
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.resultsWrapper}>
      <h2 className={styles.resultsHeading}>Search Results for "{searchQuery}"</h2>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className={styles.noResults}>No products match your search.</p>
      )}
    </div>
  );
}
