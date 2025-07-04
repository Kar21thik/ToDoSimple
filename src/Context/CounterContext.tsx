import React, { createContext, useState, useContext, ReactNode } from 'react';
//creating the context here 
interface CounterContextType {
  count: number;
  incrementCount: () => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

// fill the contents and give it to others components 
export const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState<number>(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (

    //passing the context to the children components 
    <CounterContext.Provider value={{ count, incrementCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};

export default CounterContext;