import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('autodekho_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load wishlist from localStorage:', e);
      return [];
    }
  });

  // Keep localStorage synchronized whenever wishlist state changes
  useEffect(() => {
    try {
      localStorage.setItem('autodekho_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to persist wishlist to localStorage:', e);
    }
  }, [wishlist]);

  const toggleWishlist = (vehicle) => {
    setWishlist((prevList) => {
      const exists = prevList.some((item) => item._id === vehicle._id);
      if (exists) {
        return prevList.filter((item) => item._id !== vehicle._id);
      } else {
        return [...prevList, vehicle];
      }
    });
  };

  const removeFromWishlist = (vehicleId) => {
    setWishlist((prevList) => prevList.filter((item) => item._id !== vehicleId));
  };

  const isWishlisted = (vehicleId) => {
    return wishlist.some((item) => item._id === vehicleId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
