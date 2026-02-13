import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlotList from "../components/SlotList";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showSlots, setShowSlots] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [activeMenu, setActiveMenu] = useState("home");

  const locations = [
    "All Locations",
    "Downtown Area",
    "North Zone",
    "South End",
    "East Valley",
    "West Side",
  ];

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveMenu(sectionId);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Location Modal Component
  const LocationModal = () => {
    if (!showLocationModal) return null;

    return (
      <div style={styles.modalBackdrop} onClick={() => setShowLocationModal(false)}>
        <div
          style={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={styles.modalTitle}>Select Location</h3>
          <div style={styles.locationGrid}>
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                style={{
                  ...styles.locationButton,
                  backgroundColor:
                    selectedLocation === location ? "#667eea" : "#f0f0f0",
                  color: selectedLocation === location ? "white" : "#333",
                }}
              >
                {location}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowLocationModal(false)}
            style={styles.closeModalButton}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const turfs = [
    {
      id: 1,
      name: "Green Field Sports Complex",
      location: "Downtown Area",
      price: "₹500/hour",
      rating: 4.5,
      image: "🏟️",
    },
    {
      id: 2,
      name: "Stars Cricket Academy",
      location: "North Zone",
      price: "₹600/hour",
      rating: 4.8,
      image: "⚽",
    },
    {
      id: 3,
      name: "Elite Turf Arena",
      location: "South End",
      price: "₹450/hour",
      rating: 4.2,
      image: "🏟️",
    },
    {
      id: 4,
      name: "Pro Cricket Ground",
      location: "East Valley",
      price: "₹700/hour",
      rating: 4.9,
      image: "⚽",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>⚽ Turf Booking</h1>

          {/* Navigation Menu */}
          <nav style={styles.nav}>
            <button
              onClick={() => scrollToSection("home")}
              style={{
                ...styles.navItem,
                borderBottom:
                  activeMenu === "home" ? "3px solid #667eea" : "none",
              }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("turfs")}
              style={{
                ...styles.navItem,
                borderBottom:
                  activeMenu === "turfs" ? "3px solid #667eea" : "none",
              }}
            >
              Turfs
            </button>
            <button
              onClick={() => setShowLocationModal(true)}
              style={styles.navItem}
            >
              📍 {selectedLocation}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              style={{
                ...styles.navItem,
                borderBottom:
                  activeMenu === "about" ? "3px solid #667eea" : "none",
              }}
            >
              About Us
            </button>
          </nav>

          <div style={styles.headerRight}>
            {user ? (
              <>
                <span style={styles.userEmail}>{user.email}</span>
                <button onClick={handleLogout} style={styles.logoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/login")} style={styles.loginnavButton}>
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Location Modal */}
      <LocationModal />

      {/* Main Content */}
      <main style={styles.main}>
        {/* Hero Section */}
        <section id="home" style={styles.heroSection}>
          <h2 style={styles.heroTitle}>Welcome to Turf Booking</h2>
          <p style={styles.heroSubtitle}>
            Book premium cricket turfs near you at the best prices
          </p>
          <input
            type="text"
            placeholder="Search turfs by location..."
            style={styles.searchBar}
          />
        </section>

        {/* Featured Turfs Section */}
        <section id="turfs" style={styles.turfsSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Available Turfs</h2>
            <button
              onClick={() => setShowSlots(!showSlots)}
              style={styles.toggleButton}
            >
              {showSlots ? "Hide" : "Show"} Available Slots
            </button>
          </div>

          <div style={styles.turfsGrid}>
            {turfs.map((turf) => (
              <div key={turf.id} style={styles.turfCard}>
                <div style={styles.turfImage}>{turf.image}</div>
                <h3 style={styles.turfName}>{turf.name}</h3>
                <p style={styles.turfLocation}>📍 {turf.location}</p>
                <div style={styles.turfFooter}>
                  <span style={styles.turfPrice}>{turf.price}</span>
                  <span style={styles.turfRating}>⭐ {turf.rating}</span>
                </div>
                <button style={styles.bookButton}>Book Now</button>
              </div>
            ))}
          </div>
        </section>

        {/* Available Slots Section */}
        {showSlots && (
          <section style={styles.slotsSection}>
            <h2 style={styles.sectionTitle}>Available Time Slots</h2>
            <SlotList />
          </section>
        )}

        {/* Additional Info Section */}
        <section style={styles.infoSection}>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🎯</span>
            <h3 style={styles.infoTitle}>Easy Booking</h3>
            <p style={styles.infoText}>Book your preferred turf in just a few clicks</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>💰</span>
            <h3 style={styles.infoTitle}>Best Prices</h3>
            <p style={styles.infoText}>Get the most competitive rates in your area</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🏆</span>
            <h3 style={styles.infoTitle}>Premium Turfs</h3>
            <p style={styles.infoText}>Only verified high-quality sports facilities</p>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" style={styles.aboutSection}>
          <div style={styles.aboutContent}>
            <h2 style={styles.aboutTitle}>About Turf Booking</h2>
            <p style={styles.aboutText}>
              Turf Booking is a leading platform dedicated to connecting sports enthusiasts 
              with premium cricket turfs and sports facilities. Our mission is to make sports 
              accessible and affordable for everyone.
            </p>

            <div style={styles.aboutGrid}>
              <div style={styles.aboutCard}>
                <h3 style={styles.aboutCardTitle}>Our Mission</h3>
                <p style={styles.aboutCardText}>
                  To revolutionize sports facility booking by providing a seamless, transparent, 
                  and user-friendly platform that connects players with quality turfs.
                </p>
              </div>

              <div style={styles.aboutCard}>
                <h3 style={styles.aboutCardTitle}>Why Choose Us</h3>
                <ul style={styles.aboutList}>
                  <li>Wide variety of premium turfs</li>
                  <li>Competitive and transparent pricing</li>
                  <li>Easy and instant booking</li>
                  <li>24/7 customer support</li>
                  <li>Verified and trusted facilities</li>
                </ul>
              </div>

              <div style={styles.aboutCard}>
                <h3 style={styles.aboutCardTitle}>Our Reach</h3>
                <p style={styles.aboutCardText}>
                  Operating across multiple cities with hundreds of verified turfs, we serve 
                  thousands of sports enthusiasts every month. Join our growing community today!
                </p>
              </div>
            </div>

            <div style={styles.contactSection}>
              <h3 style={styles.contactTitle}>Get in Touch</h3>
              <div style={styles.contactInfo}>
                <p>📧 Email: support@turfbooking.com</p>
                <p>📱 Phone: +91-1234-567-890</p>
                <p>🏢 Address: Sports Complex, Downtown Area, Your City</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2026 Turf Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    gap: "30px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#667eea",
    margin: 0,
    whiteSpace: "nowrap",
  },
  nav: {
    display: "flex",
    gap: "30px",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navItem: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px 0",
    transition: "color 0.3s, border-bottom 0.3s",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    whiteSpace: "nowrap",
  },
  userEmail: {
    fontSize: "14px",
    color: "#666",
  },
  logoutButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  loginnavButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "30px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
  },
  modalTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
    margin: "0 0 20px 0",
  },
  locationGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "20px",
  },
  locationButton: {
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  closeModalButton: {
    width: "100%",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  main: {
    flex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    width: "100%",
    boxSizing: "border-box",
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "50px",
    paddingTop: "20px",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "12px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "24px",
  },
  searchBar: {
    width: "100%",
    maxWidth: "500px",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.3s",
  },
  turfsSection: {
    marginBottom: "50px",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
    margin: 0,
  },
  toggleButton: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  turfsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "24px",
  },
  turfCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    padding: "0",
    cursor: "pointer",
  },
  turfImage: {
    fontSize: "48px",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  turfName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: "16px 16px 8px 16px",
  },
  turfLocation: {
    fontSize: "14px",
    color: "#666",
    margin: "0 16px 12px 16px",
  },
  turfFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 16px 12px 16px",
    fontSize: "14px",
    color: "#667eea",
    fontWeight: "600",
  },
  turfPrice: {
    color: "#667eea",
  },
  turfRating: {
    color: "#f39c12",
  },
  bookButton: {
    width: "calc(100% - 32px)",
    margin: "0 16px 16px 16px",
    padding: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  slotsSection: {
    marginBottom: "50px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  infoSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "50px",
  },
  infoCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  infoIcon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "12px",
  },
  infoTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: "8px 0",
  },
  infoText: {
    fontSize: "14px",
    color: "#666",
    margin: "8px 0 0 0",
  },
  aboutSection: {
    backgroundColor: "white",
    padding: "40px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "50px",
  },
  aboutContent: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  aboutTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: "24px",
  },
  aboutText: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.6",
    textAlign: "center",
    marginBottom: "40px",
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  aboutCard: {
    padding: "24px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
  },
  aboutCardTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#667eea",
    marginTop: 0,
    marginBottom: "12px",
  },
  aboutCardText: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.6",
    margin: 0,
  },
  aboutList: {
    fontSize: "14px",
    color: "#666",
    paddingLeft: "20px",
    margin: "0",
  },
  contactSection: {
    backgroundColor: "#f0f0f0",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
  },
  contactTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "20px",
  },
  contactInfo: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.8",
  },
  footer: {
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: "24px",
    marginTop: "auto",
  },
  footerText: {
    fontSize: "14px",
    margin: 0,
  },
};
