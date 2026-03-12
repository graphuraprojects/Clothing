import React from 'react';

const ShopByCategory = () => {
  const categories = [
    {
      name: 'All Women',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center',
      description: 'Complete collection for all styles',
    },
    {
      name: 'Ethnic',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=300&fit=crop&crop=center',
      description: 'Traditional & cultural fashion',
    },
    {
      name: 'Western',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
      description: 'Contemporary western wear',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Shop by Category
        </h2>
        <p className="text-gray-600 text-lg font-medium">Find the perfect outfit for every occasion</p>
        <div className="flex justify-center mt-6">
          <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Background Image */}
            <div className="relative h-72 overflow-hidden bg-gray-200">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-2 tracking-wide drop-shadow-lg">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-200 opacity-90 mb-5 leading-relaxed drop-shadow-md">
                    {cat.description}
                  </p>
                  <button
                    className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 uppercase tracking-wide"
                  >
                    Explore <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;