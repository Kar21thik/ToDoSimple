import React, { useState, useEffect, useMemo, useRef } from "react";

const BMI_Calculate: React.FC = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const heightRef = useRef<HTMLInputElement>(null); // useRef to focus input

  // Automatically focus height input on page load
  useEffect(() => {
    heightRef.current?.focus();
  }, []);

  // Recalculate BMI
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

  // useEffect for side effect (logging)
  useEffect(() => {
    if (bmi) {
      console.log(`New BMI calculated: ${bmi}`);
    }
  }, [bmi]);

  // useMemo to avoid recalculating interpretation unless BMI changes
  const interpretation = useMemo(() => {
    if (!bmi) return null;

    const value = parseFloat(bmi);
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal weight";
    if (value < 30) return "Overweight";
    return "Obese";
  }, [bmi]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">BMI Calculator</h2>

        <div className="mb-4">
          <label htmlFor="height" className="block font-bold mb-2">Height (cm)</label>
          <input
            ref={heightRef} // focus on load
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block font-bold mb-2">Weight (kg)</label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-6 text-center">
          <button
            onClick={calculateBMI}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Calculate BMI
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {bmi && (
          <div className="text-center">
            <p className="text-xl font-bold">Your BMI: {bmi}</p>
            <p className="text-lg mt-2">📝 {interpretation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMI_Calculate;
