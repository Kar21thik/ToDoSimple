import { useState, useEffect, useMemo, useRef } from "react";

export const useBmiCalculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const heightRef = useRef<HTMLInputElement>(null);

  // Focus height input on load
  useEffect(() => {
    heightRef.current?.focus();
  }, []);

  // Log BMI on update
  useEffect(() => {
    if (bmi) {
      console.log(`New BMI calculated: ${bmi}`);
    }
  }, [bmi]);

  // Calculate BMI
  const calculateBMI = () => {
    setError(null);
    setBmi(null);

    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setError("Please enter valid numbers greater than 0.");
      return;
    }

    const heightInMeters = h / 100;
    const bmiValue = (w / (heightInMeters * heightInMeters)).toFixed(3);
    setBmi(bmiValue);
  };

  // Memoized BMI interpretation
  const interpretation = useMemo(() => {
    if (!bmi) return null;

    const value = parseFloat(bmi);
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal weight";
    if (value < 30) return "Overweight";
    return "Obese";
  }, [bmi]);

  return {
    height,
    setHeight,
    weight,
    setWeight,
    bmi,
    error,
    heightRef,
    calculateBMI,
    interpretation
  };
}
