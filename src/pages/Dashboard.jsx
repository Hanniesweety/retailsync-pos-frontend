import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const [view, setView] = useState("shop");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});

  const navigate = useNavigate();

  // ✅ FIXED IMAGE URLs
  const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg"
  },
  {
    id: 2,
    name: "Mouse",
    price: 500,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SL1500_.jpg"
  },
  {
    id: 3,
    name: "Keyboard",
    price: 1200,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
  },
  {
    id: 4,
    name: "Monitor",
    price: 15000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"
  },
  {
    id: 5,
    name: "Headphones",
    price: 2000,
    image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg"
  },
  {
    id: 6,
    name: "Charger",
    price: 800,
    image: "https://m.media-amazon.com/images/I/61Y30DpqRVL._SL1500_.jpg"
  },
  {
    id: 7,
    name: "Tablet",
    price: 20000,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"
  },
  {
    id: 8,
    name: "Printer",
    price: 9000,
    image: "https://m.media-amazon.com/images/I/71E8VNPC1dL._SL1500_.jpg"
  },
  {
    id: 9,
    name: "Speaker",
    price: 3000,
    image: "https://cdn.pixabay.com/photo/2016/11/29/09/32/speaker-1869277_1280.jpg"
  },
  {
    id: 10,
    name: "Webcam",
    price: 2500,
    image: "https://cdn.pixabay.com/photo/2017/01/06/19/15/webcam-1953359_1280.jpg"
  }
];

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
// load cart
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("cart"));
  if (saved) setCart(saved);
}, []);
useEffect(() => {
  const handleStorage = () => {
    const updated = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(updated);
  };

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}, []);
useEffect(() => {
  const updateCart = () => {
    const updated = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(updated);
  };

  window.addEventListener("cartUpdated", updateCart);

  return () => window.removeEventListener("cartUpdated", updateCart);
}, []);
useEffect(() => {
  const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
  setRatings(savedRatings);
}, []);

// save cart
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
  const addToCart = (p) => {
    const exist = cart.find(i => i.id === p.id);
    if (exist) {
      setCart(cart.map(i =>
        i.id === p.id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
  };
  const removeFromCart = (id) => {
  const exist = cart.find(i => i.id === id);

  if (exist.qty === 1) {
    setCart(cart.filter(i => i.id !== id));
  } else {
    setCart(cart.map(i =>
      i.id === id ? { ...i, qty: i.qty - 1 } : i
    ));
  }
};

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const tax = Math.round(total * 0.05);

const handleRating = (id, star) => {
  const updated = { ...ratings, [id]: star };
  setRatings(updated);

  localStorage.setItem("ratings", JSON.stringify(updated)); // 🔥 save
};
  const handleReview = (id, text) => {
    setReviews({ ...reviews, [id]: text });
  };

  const generateBill = () => {
    let bill = "------ BILL ------\n\n";

    cart.forEach(i => {
      bill += `${i.name} x${i.qty} = ₹${i.price * i.qty}\n`;
    });

    bill += `\nTax: ₹${tax}`;
    bill += `\nTotal: ₹${total + tax}`;

    alert(bill + "\n\n✅ Thanks for conformation!");
  };

  const refundOrder = () => {
    setCart([]);
    alert("💸 Refund will receive in 24 hours");
  };

  return (
    <div style={layout}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ color: "#c9a96e" }}>RetailSync</h2>

        <p style={menu} onClick={() => setView("shop")}>Shop</p>
        <p style={menu} onClick={() => setView("customers")}>Customers</p>
        <p style={menu} onClick={() => setView("products")}>Products</p>
      </div>

      {/* MAIN */}
      <div style={main}>

        {/* TOP */}
        <div style={topbar}>
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchBox}
          />

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        {/* SHOP */}
        {view === "shop" && (
          <div style={grid}>
            {filtered.map(p => (
              
  <div
  key={p.id}
  style={card}
  onClick={(e) => {
    // ⭐ IMPORTANT FIX
    if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;

    navigate("/product", { state: p });
  }}
>

                {/* ✅ IMAGE FIX */}
                <img
  src={p.image}
  alt={p.name}
  style={img}
  onError={(e) => {
    e.target.src = "https://dummyimage.com/600x400/eeeeee/000000&text=No+Image";
  }}
/>

                <h2>{p.name}</h2>
                <p>₹{p.price}</p>

                {/* ⭐ Rating */}
                <div>
                  {[1,2,3,4,5].map(star => (
                   <span
  key={star}
  onClick={(e) => {
    e.stopPropagation(); // 🔥 IMPORTANT
    handleRating(p.id, star);
  }}
  style={{
    cursor: "pointer",
    color: ratings[p.id] >= star ? "gold" : "#ccc",
    fontSize: 18
  }}
>
  ★
</span>
                  ))}
                </div>

                {/* ✍ Review */}
     <input
  value={reviews[p.id] || ""}
  placeholder="Write review..."
  onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT
  onChange={(e) => handleReview(p.id, e.target.value)}
  style={{ width: "100%", marginTop: 5 }}
/>

                <div style={{ display: "flex", gap: 10 }}>
 
  <button
  onClick={(e) => {
    e.stopPropagation();
    addToCart(p);
  }}
>
  +
</button>
  
  <button
  onClick={(e) => {
    e.stopPropagation();
    removeFromCart(p.id);
  }}
>
  -
</button>
</div>
              </div>
            ))}
          </div>
        )}

        {/* CUSTOMERS */}
        {view === "customers" && (
          <div>
            <h2>Customers Page</h2>
            <p>Coming soon...</p>
          </div>
        )}

        {/* PRODUCTS */}
        {view === "products" && (
          <div>
            <h2>Product Management</h2>
            {products.map(p => (
              <p key={p.id}>{p.name} - ₹{p.price}</p>
            ))}
          </div>
        )}
      </div>

      {/* CART */}
      <div style={cartBox}>
        <h3>Cart</h3>

        {cart.map(i => (
          <p key={i.id}>
            {i.name} x{i.qty}
          </p>
          
        ))}

        <hr />

        <p>Subtotal: ₹{total}</p>
        <p>Tax: ₹{tax}</p>

        <h3>Total ₹{total + tax}</h3>
<button
  onClick={() =>
    navigate("/payment-success", {
      state: { total }
    })
  }
>
  Pay Now
</button>
        <button onClick={generateBill} style={billBtn}>
          Generate Bill
        </button>

        <button onClick={refundOrder} style={refundBtn}>
          Refund
        </button>
      </div>
    </div>
  );
}

/* STYLES */

const layout = {
  display: "flex",
  height: "100vh",
  fontFamily: "Calibri",
  background: "#f6f3ef"
};

const sidebar = {
  width: 240,
  background: "#fff",
  padding: 20
};

const menu = {
  padding: 12,
  cursor: "pointer",
  borderRadius: 6
};

const main = {
  flex: 1,
  padding: 20,
  overflowY: "auto"
};

const topbar = {
  display: "flex",
  justifyContent: "space-between"
};

const searchBox = {
  padding: 10,
  width: "60%"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 25,
  marginTop: 20
};

const card = {
  background: "#f3e9dc",
  padding: 25,
  borderRadius: 16,
  height: 320,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
   transition: "0.3s",
  cursor: "pointer"
};

const img = {
  width: "100%",
  height: 120,
  objectFit: "cover",
  borderRadius: 10
};

const btn = {
  padding: 10,
  background: "#c9a96e",
  border: "none",
  color: "#fff",
  borderRadius: 8
};

const cartBox = {
  width: 320,
  background: "#fff",
  padding: 20
};

const billBtn = {
  width: "100%",
  padding: 10,
  background: "#4CAF50",
  color: "#fff",
  marginTop: 10
};

const refundBtn = {
  width: "100%",
  padding: 10,
  background: "orange",
  marginTop: 10
};
<button onClick={() => navigate("/product")}>
  TEST NAV
</button>