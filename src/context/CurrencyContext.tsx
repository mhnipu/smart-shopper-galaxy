
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the available currencies
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'BTC';

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  exchangeRate: number; // Rate relative to USD
  decimalPlaces: number;
}

const currencies: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', exchangeRate: 1, decimalPlaces: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', exchangeRate: 0.93, decimalPlaces: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', exchangeRate: 0.81, decimalPlaces: 2 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', exchangeRate: 151.67, decimalPlaces: 0 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', exchangeRate: 1.38, decimalPlaces: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', exchangeRate: 1.54, decimalPlaces: 2 },
  BTC: { code: 'BTC', symbol: '₿', name: 'Bitcoin', exchangeRate: 0.000016, decimalPlaces: 8 },
};

interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (priceInUSD: number) => string;
  availableCurrencies: CurrencyInfo[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  
  // Load saved currency from localStorage on initial render
  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') as CurrencyCode;
    if (savedCurrency && currencies[savedCurrency]) {
      setCurrencyCode(savedCurrency);
    }
  }, []);
  
  // Save currency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currency', currencyCode);
  }, [currencyCode]);
  
  const currency = currencies[currencyCode];
  
  const formatPrice = (priceInUSD: number): string => {
    const convertedPrice = priceInUSD * currency.exchangeRate;
    return `${currency.symbol}${convertedPrice.toFixed(currency.decimalPlaces)}`;
  };
  
  const availableCurrencies = Object.values(currencies);

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrencyCode,
      formatPrice,
      availableCurrencies,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
