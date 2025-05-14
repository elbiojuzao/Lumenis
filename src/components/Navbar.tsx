'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Menu, X, LogOut, Package, Home, PenSquare } from 'lucide-react'
import { useAuth } from '../lib/contexts/AuthContext'
import { useCart } from '../lib/contexts/CartContext'

const Navbar = () => {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  
  const handleLogout = () => {
    logout()
    router.push('/')
    setMobileMenuOpen(false)
  }
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <PenSquare size={28} className="text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Lumenis</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium transition duration-150">
                Inicio
              </Link>
              <Link href="/shop" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium transition duration-150">
                Shop
              </Link>
              {isAuthenticated && (
                <Link href="/my-pages" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium transition duration-150">
                  Minhas Paginas
                </Link>
              )}
            </nav>
          </div>
          
          {/* User actions */}
          <div className="flex items-center">
            <Link href="/cart" className="p-2 text-gray-600 hover:text-purple-600 relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="ml-4 relative hidden md:block">
                <div className="group relative">
                  <button className="flex items-center text-gray-600 hover:text-purple-600 focus:outline-none">
                    <span className="mr-2 font-medium">{currentUser?.name}</span>
                    <User size={24} />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 z-50">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      Perfil
                    </Link>
                    <Link href="/addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                      Endereços
                    </Link>
                    {isAdmin && (
                      <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                        Painel Admin
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ml-4 hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-purple-600 font-medium">
                  Login
                </Link>
                <Link href="/register" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-150">
                  Registrar
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="ml-4 md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-gray-600 hover:text-purple-600 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <Home size={18} className="mr-2" />
              Inicio
            </div>
          </Link>
          <Link 
            href="/shop" 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <Package size={18} className="mr-2" />
              Shop
            </div>
          </Link>
          {isAuthenticated && (
            <Link 
              href="/my-pages" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <PenSquare size={18} className="mr-2" />
                Minhas Paginas
              </div>
            </Link>
          )}
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <User size={40} className="h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-600" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link 
                  href="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Perfil
                </Link>
                <Link 
                  href="/addresses" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Endereços
                </Link>
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Painel Admin
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1 px-2">
              <Link 
                href="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-600 hover:bg-gray-50 bg-purple-600 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Registrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar 