import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update, remove, query, orderByChild } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import styles from "../style/seller.module.css";
import LoadingSpinner from "../loading";

export default function SellerDashboard() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Local state to control editing modes per product
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    if (!currentUser) return;
    const db = getDatabase();
    const productsRef = ref(db, "products");

    // Fetch products and filter only those belonging to the current seller.
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allProducts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        // Filter by seller uid (ensure your sell page stores the seller's uid as userId)
        const sellerProducts = allProducts.filter(
          (prod) => prod.userId === currentUser.uid
        );
        setProducts(sellerProducts);

        // Initialize edit states for each product if not already set
        const newEditStates = {};
        sellerProducts.forEach((prod) => {
          newEditStates[prod.id] = {
            editingStock: false,
            stock: prod.stock || 0,
            editingDiscount: false,
            discount: prod.discountPercentage || 0,
          };
        });
        setEditStates(newEditStates);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // --- STOCK HANDLERS ---
  const toggleEditStock = (productId) => {
    setEditStates((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], editingStock: !prev[productId].editingStock },
    }));
  };

  const handleStockChange = (productId, newStock) => {
    setEditStates((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], stock: newStock },
    }));
  };

  const saveStock = async (productId) => {
    const newStock = editStates[productId].stock;
    const db = getDatabase();
    const productRef = ref(db, `products/${productId}`);
    try {
      await update(productRef, { stock: newStock });
      setEditStates((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], editingStock: false },
      }));
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  // --- DISCOUNT HANDLERS ---
  const toggleEditDiscount = (productId) => {
    setEditStates((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], editingDiscount: !prev[productId].editingDiscount },
    }));
  };

  const handleDiscountChange = (productId, newDiscount) => {
    setEditStates((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], discount: newDiscount },
    }));
  };

  const saveDiscount = async (productId, originalPrice) => {
    const discount = parseFloat(editStates[productId].discount);
    // Calculate new price: discountPercentage applied (rounded to whole number)
    const discountedPrice = originalPrice * (1 - discount / 100);
    const db = getDatabase();
    const productRef = ref(db, `products/${productId}`);
    try {
      await update(productRef, {
        discountPercentage: discount,
        price: Math.round(discountedPrice),
      });
      setEditStates((prev) => ({
        ...prev,
        [productId]: { ...prev[productId], editingDiscount: false },
      }));
    } catch (error) {
      console.error("Error updating discount:", error);
    }
  };

  // --- REMOVE PRODUCT HANDLER ---
  const removeProduct = async (productId) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      const db = getDatabase();
      const productRef = ref(db, `products/${productId}`);
      try {
        await remove(productRef);
        // Optionally, update local state to remove the product immediately
        setProducts((prev) => prev.filter((prod) => prod.id !== productId));
      } catch (error) {
        console.error("Error removing product:", error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Store</h1>
      <br />
      {products.length === 0 ? (
        <p>No products found for your account.</p>
      ) : (
        <div className={styles.productList}>
          {products.map((prod) => (
            <div key={prod.id} className={styles.productCard}>
              <div className={styles.productInfo}>
                <img src={prod.imageUrl} alt={prod.title} className={styles.productImage} />
                <h3 className={styles.productTitle}>{prod.title}</h3>
                <p className={styles.productPrice}>Price: {prod.price} Tk</p>
                <p className={styles.productStock}>Stock: {prod.stock || 0}</p>
                <p className={styles.productDiscount}>
                  Discount: {prod.discountPercentage ? prod.discountPercentage + "%" : "None"}
                </p>
              </div>
              <div className={styles.actions}>
                <div className={styles.actionItem}>
                  {editStates[prod.id]?.editingStock ? (
                    <div className={styles.inputGroup}>
                      <input
                        type="number"
                        value={editStates[prod.id].stock}
                        onChange={(e) => handleStockChange(prod.id, e.target.value)}
                        className={styles.stockInput}
                      />
                      <button
                        onClick={() => saveStock(prod.id)}
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleEditStock(prod.id)}
                      className={styles.actionButton}
                    >
                      In Stock - {editStates[prod.id]?.stock || 0}
                    </button>
                  )}
                </div>
                <div className={styles.actionItem}>
                  {editStates[prod.id]?.editingDiscount ? (
                    <div className={styles.inputGroup}>
                      <select
                        value={editStates[prod.id].discount}
                        onChange={(e) => handleDiscountChange(prod.id, e.target.value)}
                        className={styles.discountSelect}
                      >
                        <option value="0">No Discount</option>
                        <option value="5">5%</option>
                        <option value="8">8%</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                        <option value="20">20%</option>
                        <option value="22">22%</option>
                        <option value="25">25%</option>
                        <option value="30">30%</option>
                      </select>
                      <button
                        onClick={() => saveDiscount(prod.id, parseFloat(prod.price))}
                        className={styles.saveButton}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleEditDiscount(prod.id)}
                      className={styles.actionButton}
                    >
                      Offers - {editStates[prod.id]?.discount ? editStates[prod.id].discount + "%" : "None"}
                    </button>
                  )}
                </div>
                
               
              </div>
              
                  <button
                    onClick={() => removeProduct(prod.id)}
                    className={styles.deleteButton}
                  >
                    Remove Product
                  </button>
                
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
