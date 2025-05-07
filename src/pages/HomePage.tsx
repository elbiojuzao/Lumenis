import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, PenSquare, Zap, Shield, Globe } from 'lucide-react';
import { mockProducts } from '../data/products';

const HomePage: React.FC = () => {
  // Get 3 featured products
  const featuredProducts = mockProducts.slice(0, 3);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 animate-fade-in">
              Create Your Own Website and Sell Products with Ease
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-8">
              The all-in-one platform to build your online presence and start selling your products to the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/register" 
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transform hover:scale-105 transition duration-200 inline-flex items-center"
              >
                <PenSquare size={20} className="mr-2" />
                Create Your Store
              </Link>
              <Link 
                to="/shop" 
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white hover:text-purple-700 transform hover:scale-105 transition duration-200 inline-flex items-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Browse Products
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-white p-8 rounded-lg shadow-2xl transform rotate-3 hidden lg:block absolute top-12 -left-8 z-0">
                <div className="h-32 w-64 bg-gray-100 mb-4 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-2xl relative z-10">
                <img 
                  src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Website Builder" 
                  className="rounded-lg mb-6 w-full"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Your Online Store</div>
                    <div className="text-sm text-gray-600">Professional and customizable</div>
                  </div>
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create a professional online presence and grow your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <PenSquare size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Web Pages</h3>
              <p className="text-gray-600">
                Create beautiful, professional-looking web pages without any coding knowledge. Express yourself and showcase your brand.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="bg-teal-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <ShoppingCart size={24} className="text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Online Store</h3>
              <p className="text-gray-600">
                Sell your products with an easy-to-manage online store. Process orders, manage inventory, and grow your business.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="bg-amber-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Zap size={24} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast & Reliable</h3>
              <p className="text-gray-600">
                Our platform is optimized for speed and performance, ensuring your customers have a smooth shopping experience.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                We implement the highest security standards to protect both you and your customers during the checkout process.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Globe size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600">
                Expand your business beyond borders. Reach customers worldwide with multi-language and currency support.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="bg-red-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Notifications</h3>
              <p className="text-gray-600">
                Stay informed with real-time alerts about orders, inventory, and customer activity to keep your business running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check out some of our most popular items to enhance your online presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.imageSrc} 
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold text-xl">${product.price.toFixed(2)}</span>
                    <Link 
                      to={`/product/${product.id}`}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-150"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-150"
            >
              <ShoppingCart size={20} className="mr-2" />
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from entrepreneurs who have transformed their businesses with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="text-purple-600 absolute -top-4 left-8">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 20H7.5C6.12 20 5 18.88 5 17.5V12.5C5 11.12 6.12 10 7.5 10H12.5C13.88 10 15 11.12 15 12.5V17.5C15 18.88 13.88 20 12.5 20ZM17.5 30H12.5C11.12 30 10 28.88 10 27.5V22.5C10 21.12 11.12 20 12.5 20H17.5C18.88 20 20 21.12 20 22.5V27.5C20 28.88 18.88 30 17.5 30ZM27.5 20H22.5C21.12 20 20 18.88 20 17.5V12.5C20 11.12 21.12 10 22.5 10H27.5C28.88 10 30 11.12 30 12.5V17.5C30 18.88 28.88 20 27.5 20ZM32.5 30H27.5C26.12 30 25 28.88 25 27.5V22.5C25 21.12 26.12 20 27.5 20H32.5C33.88 20 35 21.12 35 22.5V27.5C35 28.88 33.88 30 32.5 30Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 mt-4">
                "This platform changed everything for my small business. Creating a professional website and selling my products has never been easier. Sales have increased by 75% since I started!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sarah J." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Sarah J.</h4>
                  <p className="text-gray-500">Handmade Jewelry Shop</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="text-purple-600 absolute -top-4 left-8">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 20H7.5C6.12 20 5 18.88 5 17.5V12.5C5 11.12 6.12 10 7.5 10H12.5C13.88 10 15 11.12 15 12.5V17.5C15 18.88 13.88 20 12.5 20ZM17.5 30H12.5C11.12 30 10 28.88 10 27.5V22.5C10 21.12 11.12 20 12.5 20H17.5C18.88 20 20 21.12 20 22.5V27.5C20 28.88 18.88 30 17.5 30ZM27.5 20H22.5C21.12 20 20 18.88 20 17.5V12.5C20 11.12 21.12 10 22.5 10H27.5C28.88 10 30 11.12 30 12.5V17.5C30 18.88 28.88 20 27.5 20ZM32.5 30H27.5C26.12 30 25 28.88 25 27.5V22.5C25 21.12 26.12 20 27.5 20H32.5C33.88 20 35 21.12 35 22.5V27.5C35 28.88 33.88 30 32.5 30Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 mt-4">
                "As a photographer, I needed a platform to showcase my work and sell my prints. This service provided exactly that - a beautiful portfolio page and integrated shop. Couldn't be happier!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="David M." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">David M.</h4>
                  <p className="text-gray-500">Professional Photographer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md relative">
              <div className="text-purple-600 absolute -top-4 left-8">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 20H7.5C6.12 20 5 18.88 5 17.5V12.5C5 11.12 6.12 10 7.5 10H12.5C13.88 10 15 11.12 15 12.5V17.5C15 18.88 13.88 20 12.5 20ZM17.5 30H12.5C11.12 30 10 28.88 10 27.5V22.5C10 21.12 11.12 20 12.5 20H17.5C18.88 20 20 21.12 20 22.5V27.5C20 28.88 18.88 30 17.5 30ZM27.5 20H22.5C21.12 20 20 18.88 20 17.5V12.5C20 11.12 21.12 10 22.5 10H27.5C28.88 10 30 11.12 30 12.5V17.5C30 18.88 28.88 20 27.5 20ZM32.5 30H27.5C26.12 30 25 28.88 25 27.5V22.5C25 21.12 26.12 20 27.5 20H32.5C33.88 20 35 21.12 35 22.5V27.5C35 28.88 33.88 30 32.5 30Z" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6 mt-4">
                "I was able to turn my side hustle into a full-time business using this platform. The combination of a professional website and e-commerce capabilities made all the difference."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                  <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Emily R." className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Emily R.</h4>
                  <p className="text-gray-500">Handmade Candle Shop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-purple-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Online Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of entrepreneurs who are growing their businesses with our platform. Create a beautiful website and start selling your products today.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-purple-700 px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center hover:bg-gray-100 transform hover:scale-105 transition duration-200"
          >
            <PenSquare size={24} className="mr-2" />
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;