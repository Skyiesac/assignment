import React from "react";
import { Search, MapPin, User, ShoppingCart } from "lucide-react";

const App = () => {
  return (
    <div>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.logo}>FreshCart</div>
          <button style={styles.greenButton}>All Departments</button>
          <div style={styles.searchBar}>
            <input type="search" placeholder="Search for products..." style={styles.input} />
            <Search style={styles.searchIcon} />
          </div>
          <div style={styles.headerButtons}>
            <button style={styles.iconButton}><MapPin /> Location</button>
            <button style={styles.iconButton}><User /> Account</button>
            <button style={styles.iconButton}><ShoppingCart /><span style={styles.cartCount}>0</span></button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div style={styles.heroText}>
            <div style={styles.saleBadge}>Opening Sale Discount 50%</div>
            <h1>SuperMarket Daily <br /> Fresh Grocery</h1>
            <p>Introduced a new model for online grocery shopping and convenient home delivery.</p>
            <button style={styles.darkButton}>Shop Now</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.categories}>
        <div style={styles.container}>
          <h2>Featured Categories</h2>
          <div style={styles.categoriesGrid}>
            {["Dairy, Bread & Eggs", "Snack & Munchies", "Bakery & Biscuits", "Instant Food", "Tea, Coffee & Drinks", "Atta, Rice & Dal"].map((category, index) => (
              <div key={index} style={styles.categoryCard}>
                <img src="/placeholder.svg" alt={category} style={styles.categoryImage} />
                <h3>{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  header: { backgroundColor: "white", padding: "10px 0", borderBottom: "1px solid #ddd" },
  container: { width: "90%", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { fontSize: "24px", fontWeight: "bold" },
  greenButton: { backgroundColor: "green", color: "white", padding: "10px 15px", borderRadius: "4px", border: "none", cursor: "pointer" },
  searchBar: { position: "relative", flexGrow: 1, maxWidth: "400px" },
  input: { width: "100%", padding: "10px", paddingRight: "40px", border: "1px solid #ccc", borderRadius: "4px" },
  searchIcon: { position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", color: "gray" },
  headerButtons: { display: "flex", gap: "15px" },
  iconButton: { display: "flex", alignItems: "center", background: "none", border: "none", fontSize: "14px", cursor: "pointer" },
  cartCount: { background: "red", color: "white", fontSize: "12px", padding: "2px 6px", borderRadius: "50%", marginLeft: "5px" },
  hero: { backgroundColor: "#e8f3ed", padding: "40px 0", textAlign: "center" },
  heroText: { maxWidth: "600px", margin: "0 auto" },
  saleBadge: { display: "inline-block", backgroundColor: "orange", color: "white", padding: "5px 10px", borderRadius: "4px", fontSize: "14px" },
  darkButton: { backgroundColor: "black", color: "white", padding: "10px 15px", borderRadius: "4px", border: "none", cursor: "pointer" },
  categories: { padding: "40px 0", textAlign: "center" },
  categoriesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px", justifyContent: "center" },
  categoryCard: { textAlign: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "8px" },
  categoryImage: { width: "100px" }
};

export default App;
