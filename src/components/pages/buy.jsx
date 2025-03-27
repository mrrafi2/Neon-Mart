import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Import EmailJS
import styles from "../style/buy.module.css";


const locationData = {
    "Dhaka": {
      "Dhaka": [
        "Dhanmondi",
        "Gulshan",
        "Banani",
        "Uttara",
        "Mirpur",
        "Mohammadpur",
        "Badda",
        "Tejgaon",
        "Ramna",
        "Motijheel"
      ],
      "Gazipur": [
        "Tongi",
        "Gazipur Sadar",
        "Kaliakair",
        "Kapasia",
        "Sreepur"
      ],
      "Narayanganj": [
        "Fatullah",
        "Rupganj",
        "Sonargaon",
        "Narayanganj Sadar"
      ],
      "Tangail": [
        "Tangail Sadar",
        "Madhupur",
        "Kalihati",
        "Sakhipur"
      ],
      "Kishoreganj": [
        "Kishoreganj Sadar",
        "Bhairab",
        "Hossainpur",
        "Pakundia"
      ],
      "Manikganj": [
        "Manikganj Sadar",
        "Singair",
        "Saturia"
      ],
      "Munshiganj": [
        "Munshiganj Sadar",
        "Sreenagar",
        "Lohajang"
      ],
      "Faridpur": [
        "Faridpur Sadar",
        "Bhanga",
        "Nagarkanda"
      ],
      "Madaripur": [
        "Madaripur Sadar",
        "Shibchar",
        "Rajoir"
      ],
      "Gopalganj": [
        "Gopalganj Sadar",
        "Tungipara",
        "Kotalipara"
      ]
    },
    "Chittagong": {
      "Chittagong": [
        "Patenga",
        "Bandar",
        "Pahartali",
        "Halishahar",
        "Agrabad",
        "Anowara",
        "Sitakunda",
        "Patiya"
      ],
      "Cox's Bazar": [
        "Teknaf",
        "Ramu",
        "Ukhia",
        "Chakaria"
      ],
      "Bandarban": [
        "Thanchi",
        "Ruma",
        "Rowangchhari",
        "Lama"
      ],
      "Khagrachari": [
        "Dighinala",
        "Matiranga",
        "Ramgarh",
        "Panchhari"
      ],
      "Rangamati": [
        "Kaptai",
        "Baghaichhari",
        "Barkal"
      ],
      "Noakhali": [
        "Noakhali Sadar",
        "Begumganj",
        "Hatiya"
      ],
      "Feni": [
        "Feni Sadar",
        "Daganbhuiyan",
        "Parshuram"
      ],
      "Cumilla": [
        "Cumilla Sadar",
        "Daudkandi",
        "Muradnagar"
      ]
    },
    "Rajshahi": {
      "Rajshahi": [
        "Rajshahi Sadar",
        "Paba",
        "Godagari",
        "Bagha"
      ],
      "Natore": [
        "Natore Sadar",
        "Baraigram",
        "Lalpur"
      ],
      "Pabna": [
        "Pabna Sadar",
        "Ishwardi",
        "Sujanagar"
      ],
      "Sirajganj": [
        "Sirajganj Sadar",
        "Kazipur",
        "Shahjadpur"
      ],
      "Naogaon": [
        "Naogaon Sadar",
        "Atrai",
        "Raninagar"
      ],
      "Joypurhat": [
        "Joypurhat Sadar",
        "Kalai",
        "Akkelpur"
      ],
      "Bogura": [
        "Bogura Sadar",
        "Sherpur",
        "Shibganj"
      ],
      "Chapainawabganj": [
        "Chapainawabganj Sadar",
        "Shibganj",
        "Nachole"
      ]
    },
    "Khulna": {
      "Khulna": [
        "Khulna Sadar",
        "Dumuria",
        "Batiaghata",
        "Paikgachha"
      ],
      "Jessore": [
        "Jessore Sadar",
        "Benapole",
        "Manirampur"
      ],
      "Satkhira": [
        "Satkhira Sadar",
        "Shyamnagar",
        "Kaliganj"
      ],
      "Bagerhat": [
        "Bagerhat Sadar",
        "Mongla",
        "Rampal"
      ],
      "Chuadanga": [
        "Chuadanga Sadar",
        "Alamdanga",
        "Damurhuda"
      ],
      "Kushtia": [
        "Kushtia Sadar",
        "Bheramara",
        "Khoksa"
      ],
      "Jhenaidah": [
        "Jhenaidah Sadar",
        "Kaliganj",
        "Maheshpur"
      ],
      "Narail": [
        "Narail Sadar",
        "Kalia",
        "Lohagara"
      ]
    },
    "Barisal": {
      "Barisal": [
        "Barisal Sadar",
        "Bakerganj",
        "Muladi",
        "Mehendiganj"
      ],
      "Bhola": [
        "Bhola Sadar",
        "Char Fasson",
        "Lalmohan"
      ],
      "Patuakhali": [
        "Patuakhali Sadar",
        "Kuakata",
        "Kalapara"
      ],
      "Jhalokati": [
        "Jhalokati Sadar",
        "Nalchity",
        "Kathalia"
      ],
      "Pirojpur": [
        "Pirojpur Sadar",
        "Mathbaria",
        "Bhandaria"
      ],
      "Barguna": [
        "Barguna Sadar",
        "Amtali",
        "Patharghata"
      ]
    },
    "Sylhet": {
      "Sylhet": [
        "Sylhet Sadar",
        "Beanibazar",
        "Golapganj",
        "Jaintiapur"
      ],
      "Moulvibazar": [
        "Moulvibazar Sadar",
        "Srimangal",
        "Kamalganj"
      ],
      "Habiganj": [
        "Habiganj Sadar",
        "Bahubal",
        "Chunarughat"
      ],
      "Sunamganj": [
        "Sunamganj Sadar",
        "Tahirpur",
        "Jamalganj",
        "Derai"
      ]
    },
    "Rangpur": {
      "Rangpur": [
        "Rangpur Sadar",
        "Badarganj",
        "Pirganj",
        "Gangachara"
      ],
      "Dinajpur": [
        "Dinajpur Sadar",
        "Birganj",
        "Parbatipur"
      ],
      "Gaibandha": [
        "Gaibandha Sadar",
        "Palashbari",
        "Gobindaganj"
      ],
      "Kurigram": [
        "Kurigram Sadar",
        "Nageshwari",
        "Bhurungamari"
      ],
      "Nilphamari": [
        "Nilphamari Sadar",
        "Saidpur",
        "Jaldhaka"
      ],
      "Thakurgaon": [
        "Thakurgaon Sadar",
        "Pirganj",
        "Ranisankail"
      ],
      "Lalmonirhat": [
        "Lalmonirhat Sadar",
        "Hatibandha",
        "Kaliganj"
      ],
      "Panchagarh": [
        "Panchagarh Sadar",
        "Tetulia",
        "Boda"
      ]
    },
    "Mymensingh": {
      "Mymensingh": [
        "Mymensingh Sadar",
        "Trishal",
        "Gafargaon",
        "Muktagachha"
      ],
      "Netrokona": [
        "Netrokona Sadar",
        "Kendua",
        "Mohanganj"
      ],
      "Sherpur": [
        "Sherpur Sadar",
        "Nalitabari",
        "Jhenaigati"
      ],
      "Jamalpur": [
        "Jamalpur Sadar",
        "Islampur",
        "Dewanganj",
        "Madarganj"
      ]
    }
  };
  


export default function BuyNow() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false); // State for loading animation

  const deliveryCharge = 200;
  const productPrice = product ? parseFloat(product.price) : 0;
  const totalPrice = productPrice + deliveryCharge;

  const districts = division ? Object.keys(locationData[division] || {}) : [];
  const areas = division && district ? locationData[division][district] || [] : [];

  useEffect(() => {
    setDistrict("");
    setArea("");
  }, [division]);

  useEffect(() => {
    setArea("");
  }, [district]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone || !division || !district || !area || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Show loading animation

    const orderDetails = {
      fullName,
      email,
      phone,
      division,
      district,
      area,
      address,
      productName: product.title,
      productType: product.type,
      productBrand: product.brand,
      productCondition: product.condition,
      productPrice,
      deliveryCharge,
      totalPrice,
    };

    try {
      await emailjs.send(
        "service_u9fpnm2", //EmailJS service ID
        "template_zjpfw2z", //  EmailJS template ID
        orderDetails,
        "8TxyKYmHmMLYLV52E" // EmailJS public key
      );

      alert("Order submitted successfully!");
      resetForm();
      navigate("/");

    } catch (error) {
      console.error("Failed to send order email:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setDivision("");
    setDistrict("");
    setArea("");
    setAddress("");
  };

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className={styles.buyContainer}>
      <h1 className={styles.heading}>Buy Now</h1>
      <div className={styles.productSummary}>
        <img src={product.imageUrl} alt={product.title} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h2>{product.title}</h2>
          <p>Price: {product.price} Tk</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.buyForm}>
        <h3>Buyer Information</h3>
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <h3>Delivery Information</h3>
        <div className={styles.formGroup}>
          <label>Division</label>
          <select value={division} onChange={(e) => setDivision(e.target.value)} required>
            <option value="" style={{fontWeight:'bold'}}>Select Division</option>
            {Object.keys(locationData).map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
        {division && (
          <div className={styles.formGroup}>
            <label>District</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
              <option value=""  style={{fontWeight:'bold'}}>Select District</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
        )}
        {district && (
          <div className={styles.formGroup}>
            <label>Region</label>
            <select value={area} onChange={(e) => setArea(e.target.value)} required>
              <option value=""  style={{fontWeight:'bold'}}>Select Region</option>
              {areas.map((ar) => (
                <option key={ar} value={ar}>
                  {ar}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.formGroup}>
          <label>Full Delivary Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required 
          placeholder=" (House/Apartment No, Street Name, Ward, Area)"
          />
        </div>

        <div className={styles.priceSummary}>
          <p>Product Price: {product.price} Tk</p>
          <p>Delivery Charge: {deliveryCharge} Tk</p>
          <p style={{ fontWeight: "bold" }}>Total: {totalPrice} Tk</p>
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? <LoadingSpinner /> : "Submit Order"}
        </button>
      </form>
    </div>
  );
}

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};
