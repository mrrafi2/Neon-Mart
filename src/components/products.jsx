import React, { useState, useEffect } from "react";
import ProductGrid from "./productGrid";
import { getDatabase, ref, get } from "firebase/database";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./loading";
import styles from "./style/products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // For tab-based filtering
  const [conditionFilter, setConditionFilter] = useState("All"); // "All" | "New" | "Used"

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18; 

  // Get route parameters (if any)
  const { category, subcategory } = useParams();

  // Function to fetch average rating for a product from its reviews node
  const fetchAverageRating = async (productId) => {
    const db = getDatabase();
    const reviewsRef = ref(db, `reviews/${productId}`);
    try {
      const snapshot = await get(reviewsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const reviewsArray = Object.values(data);
        const total = reviewsArray.reduce((acc, review) => acc + (review.rating || 0), 0);
        const average = total / reviewsArray.length;
        return average;
      }
    } catch (error) {
      console.error("Error fetching reviews for product", productId, error);
    }
    return 0; // default if no reviews or error
  };

  // Fetch products from Firebase
  const fetchProducts = async () => {
    const db = getDatabase();
    const productsRef = ref(db, "products"); // Path where your products are stored
    try {
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        let productsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // If category/subcategory are provided, filter them
        if (category && subcategory) {
          productsArray = productsArray.filter(
            (product) =>
              product.category === category && product.subcategory === subcategory
          );
        }

        // For each product, fetch average rating
        const productsWithRatings = await Promise.all(
          productsArray.map(async (prod) => {
            const avgRating = await fetchAverageRating(prod.id);
            return { ...prod, rating: avgRating };
          })
        );

        // Sort by rating (descending)
        productsWithRatings.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setProducts(productsWithRatings);
      } else {
        console.log("No products available.");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [category, subcategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [conditionFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);


  if (loading) {
    return <LoadingSpinner />;
  }


  let filteredProducts = products;
  if (conditionFilter === "New") {
    filteredProducts = products.filter((p) => p.condition === "New");
  } else if (conditionFilter === "Used") {
    filteredProducts = products.filter((p) => p.condition === "Used");
  }

 
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  const validCurrentPage = Math.min(currentPage, totalPages || 1);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  return (
    <div className={styles.productsContainer}>
      
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            conditionFilter === "All" ? styles.active : ""
          }`}
          onClick={() => setConditionFilter("All")}
        >
          All
        </button>
        <button
          className={`${styles.tabButton} ${
            conditionFilter === "New" ? styles.active : ""
          }`}
          onClick={() => setConditionFilter("New")}
        >
          New
        </button>
        <button
          className={`${styles.tabButton} ${
            conditionFilter === "Used" ? styles.active : ""
          }`}
          onClick={() => setConditionFilter("Used")}
        >
          Used
        </button>
      </div>

      {/* Product Grid */}
      <div className="mt-3">
        {paginatedProducts.length > 0 ? (
          <ProductGrid products={paginatedProducts} />
        ) : (
          <p className={styles.noResults}>No products found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage === 1}
          >
            &laquo; Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={page === validCurrentPage ? styles.activePage : ""}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}
