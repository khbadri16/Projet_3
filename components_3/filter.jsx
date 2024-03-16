import Link from "next/link";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

export default function Filtercat() {
  const categories = [
    "Sensibilisation",
    "Sport et loisir",
    "Activité sociale",
    "Scientifique",
  ];
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="filter-container">
      <div className="filter-icon">
        <FiFilter size={24} /> {/* Using FiFilter icon with size 24 */}
      </div>
      <div className="category-container">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category}/`}
            className={`category ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
