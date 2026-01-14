import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListView from "./components/ProductListView";
import ProductDetailView from "./components/ProductDetailView";
import Header from "./components/Header";
import productsData from "./data/products";
import "./App.css";
import KeyboardShortcuts from "./components/KeyboardShortcuts";


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen text-black">
        {/* Background Images */}
        <div className="absolute inset-0 -z-20">
          {/* Top image */}
          <div
            className="h-[600px] w-full bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png')] bg-cover bg-center"
          />
          {/* Bottom image immediately below */}
          <div
            className="h-[700px] w-full bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png')] bg-cover bg-center"
          />
        </div>

        {/* Dots overlay */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_1px_1px,rgba(180,180,180,0.2)_2px,transparent_0)]
            bg-[length:20px_20px]
            pointer-events-none
            z-0
          "
        />
         <KeyboardShortcuts />

        {/* Header and content */}
        <Header className="relative z-10" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <Routes>
            <Route
              path="/"
              element={<ProductListView products={products} loading={loading} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetailView products={products} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
