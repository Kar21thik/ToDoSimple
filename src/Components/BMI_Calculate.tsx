import React, { useState, useEffect, useMemo, useRef } from "react";
import { useCounter } from "../Context/CounterContext";

const BMI_Calculate: React.FC = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { count, incrementCount } = useCounter();

  const heightRef = useRef<HTMLInputElement>(null);

  // Focus height input on load
  useEffect(() => {
    heightRef.current?.focus();
  }, []);

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

  // Log BMI on update
  useEffect(() => {
    if (bmi) {
      console.log(`New BMI calculated: ${bmi}`);
    }
  }, [bmi]);

  // Memoized BMI interpretation
  const interpretation = useMemo(() => {
    if (!bmi) return null;

    const value = parseFloat(bmi);
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal weight";
    if (value < 30) return "Overweight";
    return "Obese";
  }, [bmi]);

  return (
    // Fixed height container with scrolling
    <div className="h-screen pt-16 pb-4 px-4 flex flex-col items-center overflow-y-auto bg-gray-50 text-gray-900">
      {/* Content container with max width */}
      <div className="w-full max-w-md">
        {/* BMI Calculator Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6 text-center">BMI Calculator</h2>

          {/* Height input */}
          <div className="mb-4">
            <label htmlFor="height" className="block font-bold mb-2">
              Height (cm)
            </label>
            <input
              ref={heightRef}
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Weight input */}
          <div className="mb-4">
            <label htmlFor="weight" className="block font-bold mb-2">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Calculate Button */}
          <div className="mb-6 text-center">
            <button
              onClick={calculateBMI}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Calculate BMI
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Result */}
          {bmi && (
            <div className="text-center">
              <p className="text-xl font-bold">Your BMI: {bmi}</p>
              <p className="text-lg mt-2">📝 {interpretation}</p>
            </div>
          )}
        </div>

        {/* Counter Section Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Counter Section</h3>
          <div className="flex flex-col items-center">
            <button
              onClick={incrementCount}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded mb-3"
            >
              Increment Counter
            </button>
            <p className="text-lg font-medium">Current Count: {count}</p>
          </div>
        </div>

        

        
      </div>
    </div>
  );
};

export default BMI_Calculate;
