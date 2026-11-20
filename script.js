const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const calculateButton = document.getElementById("calculate-button");
const resetButton = document.getElementById("reset-button");
const resultResetButton = document.getElementById("result-reset-button");
const errorMessage = document.getElementById("error-message");
const calculatorView = document.getElementById("calculator-view");
const resultView = document.getElementById("result-view");
const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");

function showError(message) {
  errorMessage.textContent = message;
  heightInput.classList.add("invalid");
  weightInput.classList.add("invalid");
  calculatorView.hidden = false;
  resultView.hidden = true;
}

function clearError() {
  errorMessage.textContent = "";
  heightInput.classList.remove("invalid");
  weightInput.classList.remove("invalid");
}

function readNumber(input, fieldName) {
  const text = input.value.trim();

  if (text === "") {
    showError("Please enter your " + fieldName + ".");
    return null;
  }

  const number = Number(text);

  if (!Number.isFinite(number)) {
    showError("Please enter a valid number for " + fieldName + ".");
    return null;
  }

  if (number <= 0) {
    showError(fieldName + " must be greater than zero.");
    return null;
  }

  return number;
}

function getCategory(bmi) {
  if (bmi < 18.5) {
    return { name: "Underweight", className: "underweight" };
  } else if (bmi < 25) {
    return { name: "Normal Weight", className: "normal" };
  } else if (bmi < 30) {
    return { name: "Overweight", className: "overweight" };
  } else {
    return { name: "Obese", className: "obese" };
  }
}

function calculateBMI() {
  clearError();

  const heightInCm = readNumber(heightInput, "height");
  if (heightInCm === null) {
    return;
  }

  const weightInKg = readNumber(weightInput, "weight");
  if (weightInKg === null) {
    return;
  }

  const heightInMeters = heightInCm / 100;
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  const category = getCategory(bmi);

  bmiValue.textContent = bmi.toFixed(2);
  bmiCategory.textContent = category.name;
  bmiCategory.className = "bmi-category " + category.className;

  calculatorView.hidden = true;
  resultView.hidden = false;
}

function resetCalculator() {
  heightInput.value = "";
  weightInput.value = "";
  clearError();
  bmiValue.textContent = "--";
  bmiCategory.textContent = "";
  bmiCategory.className = "bmi-category";

  resultView.hidden = true;
  calculatorView.hidden = false;
  heightInput.focus();
}

calculateButton.addEventListener("click", calculateBMI);
resetButton.addEventListener("click", resetCalculator);
resultResetButton.addEventListener("click", resetCalculator);
