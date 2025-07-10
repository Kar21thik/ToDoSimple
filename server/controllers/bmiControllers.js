// In-memory BMI records (for demonstration)
let bmiRecords = [];

exports.calculateBMI = (req, res) => {
  const { height, weight } = req.body;

  if (!height || !weight) {
    return res.status(400).json({ error: "Height and weight are required." });
  }

  const h = parseFloat(height);
  const w = parseFloat(weight);

  if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
    return res.status(400).json({ error: "Height and weight must be valid positive numbers." });
  }

  const heightInMeters = h / 100;
  const bmi = (w / (heightInMeters * heightInMeters)).toFixed(3);
  let interpretation = "";

  if (bmi < 18.5) interpretation = "Underweight";
  else if (bmi < 25) interpretation = "Normal weight";
  else if (bmi < 30) interpretation = "Overweight";
  else interpretation = "Obese";

  const result = { bmi, interpretation };

  // Save result (you can use DB instead)
  bmiRecords.push(result);

  return res.json(result);
};

// Get all records
exports.getAllBMIs = (req, res) => {
  res.json(bmiRecords);
};

// Update a specific record (optional for now)
exports.updateBMI = (req, res) => {
  const index = parseInt(req.params.id);
  const { bmi, interpretation } = req.body;

  if (isNaN(index) || index < 0 || index >= bmiRecords.length) {
    return res.status(404).json({ error: "BMI record not found" });
  }

  bmiRecords[index] = { bmi, interpretation };
  res.json({ message: "Record updated", data: bmiRecords[index] });
};


