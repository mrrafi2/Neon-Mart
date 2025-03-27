import React, { useState } from "react";
import ProductCard from "./productCard"; 
import styles from "./style/productGrid.module.css";

export default function ProductGrid({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Callback function to handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    console.log("Selected Product:", product);  // You can now do something with the selected product
  };

  if (!products || products.length === 0) {
    return <p className={styles.noProducts}>No products available.</p>;
  }

  return (
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <ProductCard 
          key={product.id || product.name} 
          product={product} 
          onProductSelect={handleProductSelect} // Pass the callback to ProductCard
        />
      ))}

      {selectedProduct && (
        <div className={styles.selectedProduct}>
          <h3>Selected Product:</h3>
          <p>{selectedProduct.name}</p>
          <p>${selectedProduct.price}</p>
          {/* You can render more details of the selected product here */}
        </div>
      )}
    </div>
  );
}
