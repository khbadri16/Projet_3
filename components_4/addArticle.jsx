import Link from "next/link";
import React from "react";
import { FaNewspaper } from "react-icons/fa";

const ArticleComponent = () => {
  return (
    <Link href="/admin">
      <div className="event-container">
        <div className="image-container">
          <FaNewspaper className="icon" />
        </div>
        <p className="text"> Ajouter un Article</p>
      </div>
    </Link>
  );
};

export default ArticleComponent;
