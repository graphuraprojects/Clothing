import React from 'react';
import { Link } from 'react-router-dom';

const KidsSection = () => {
  const categories = [
    {
      title: 'All Kids',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
      link: '/kids'
    },
    {
      title: 'Girls',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
      link: '/kids?gender=girls'
    },
    {
      title: 'Boys',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      link: '/kids?gender=boys'
    },
    {
      title: 'Baby',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      link: '/kids?gender=baby'
    }
  ];

  return (
    <section className="kids-section max-w-6xl mx-auto px-4 py-16">
      <h2 className="section-title text-center text-4xl font-semibold text-blue-800 mb-12">
        Shop By Category
      </h2>
      <div className="category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link key={index} to={category.link} className="category-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="category-image relative w-full h-64 overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="category-overlay absolute inset-0 bg-blue-200 opacity-0 transition-opacity duration-300 hover:opacity-25"></div>
            </div>
            <div className="category-content p-5 text-center">
              <h3 className="category-title text-xl font-medium text-blue-800">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default KidsSection;