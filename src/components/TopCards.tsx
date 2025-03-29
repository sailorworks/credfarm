// src/components/TopCards.tsx
"use client";

import React, { useState, useEffect } from "react";
import VaultBalanceCard from "./cards/VaultBalanceCard";
import WrappedUSDCard from "./cards/WrappedUSDCard";
import CreditScoreCard from "./cards/CreditScoreCard";

interface TopCardsProps {
  userData: any; // Replace 'any' with a more specific type if available
  handleWithdraw: () => void;
}

const TopCards: React.FC<TopCardsProps> = ({ userData, handleWithdraw }) => {
  // Use state to track window size
  const [windowWidth, setWindowWidth] = useState(0);

  // Set up window resize listener (client-side only)
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle resize events
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine grid columns based on window width
  const getGridTemplateColumns = () => {
    if (windowWidth >= 1024) return "repeat(3, minmax(0, 1fr))";
    if (windowWidth >= 768) return "repeat(2, minmax(0, 1fr))";
    return "repeat(1, minmax(0, 1fr))";
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      style={{
        display: "grid",
        gridTemplateColumns:
          windowWidth === 0 ? undefined : getGridTemplateColumns(),
        gap: "1.5rem",
        marginBottom: "2rem",
      }}
    >
      {/* Vault Balance Card */}
      <VaultBalanceCard
        vaultBalance={userData.vaultBalance}
        vaultValueUSD={userData.vaultValueUSD}
        onWithdraw={handleWithdraw}
      />
      {/* Wrapped BTC Card */}
      <WrappedUSDCard
        wrappedUSD={userData.wrappedUSD}
        wrappedUSDValueUSD={userData.wrappedUSDValueUSD}
      />
      {/* Credit Score Card */}
      <CreditScoreCard
        creditScore={userData.creditScore}
        maxCreditScore={userData.maxCreditScore}
        creditScorePercentage={userData.creditScorePercentage}
      />
    </div>
  );
};

export default TopCards;
