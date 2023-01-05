window.addEventListener(
  "DOMContentLoaded",
  function () {
    const form =
      document.getElementById("calc-form");
    if (form) {
      setupIntialValues();
      form.addEventListener(
        "submit",
        function (e) {
          e.preventDefault();
          update();
        }
      );
    }
  }
);

//turn field input into an object with values
function getCurrentUIValues() {
  return {
    amount: +document.getElementById(
      "loan-amount"
    ).value,
    years:
      +document.getElementById("loan-years")
        .value,
    rate: +document.getElementById("loan-rate")
      .value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initialValues = {
    amount: 10000,
    years: 5,
    rate: 5,
  };
  const defaultAmount = document.getElementById(
    "loan-amount"
  );
  defaultAmount.value = initialValues.amount;

  const defaultYears =
    document.getElementById("loan-years");
  defaultYears.value = initialValues.years;

  const defaultRate =
    document.getElementById("loan-rate");
  defaultRate.value = initialValues.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const inputValues = getCurrentUIValues();
  updateMonthly(
    calculateMonthlyPayment(inputValues)
  );
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const i = values.rate / 100 / 12;
  const n = values.years * 12;
  return (
    (values.amount * i) /
    (1 - Math.pow(1 + i, -n))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const displayValue = document.getElementById(
    "monthly-payment"
  );
  displayValue.innerText = "$" + monthly;
}

//first, I need to set default values to show up on the form (that's why I need the setInitialValues function)
//to do that, I need to make a formula and calculate by using default values I set
//then once caluclated, display that as monthly payment
//then, I can update the formula with the new input (that's why I need getCurrentUIValues function)
//then, update the UI to display monthly payment
