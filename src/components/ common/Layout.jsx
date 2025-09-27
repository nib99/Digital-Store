import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartModal from '../cart/CartModal';
import { CartProvider } from '../../context/CartContext';
import { Toaster } from 'react-hot-toast';
import ScrollProgress from './ScrollProgress';

export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4ade80',
                secondary: '#000',
              },
            },
          }}
        />
      </div>
    </CartProvider>
  );
}