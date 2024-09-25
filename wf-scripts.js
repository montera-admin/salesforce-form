// ------- FORM LOGIC ----- //
document.addEventListener('DOMContentLoaded', function () {
    const insuranceSelect = document.getElementById("insuranceSelect");
    const insuranceName = document.getElementById("insuranceName");
    const insuranceName2 = document.getElementById("insuranceName2");
    const insurance = document.getElementById("insurance");
    const insurance2 = document.getElementById("insurance2");
    const primaryInsuranceInput = document.getElementById("00N8b00000EQM3J");
    const primaryMedicaidInput = document.getElementById("00N8b00000Bz6ey");
    const secondaryInsuranceInput = document.getElementById("00NRc00000KXXrJ");
    const secondaryMedicaidInput = document.getElementById("00NRc00000KXQa0");
    const type = document.getElementById("type");
    const type2 = document.getElementById("type2");

    function resetForm() {
        insuranceName.classList.add("is-hidden");
        insuranceName2.classList.add("is-hidden");
        insurance.value = "";
        insurance2.value = "";
        type.value = "";
        type2.value = "";
        primaryInsuranceInput.value = "";
        primaryMedicaidInput.value = "";
        secondaryInsuranceInput.value = "";
        secondaryMedicaidInput.value = "";

        insurance.removeAttribute("required");
        type.removeAttribute("required");
        insurance2.removeAttribute("required");
        type2.removeAttribute("required");
    }

    insuranceSelect.addEventListener("change", function () {
        resetForm();
        const selection = insuranceSelect.value.trim();

        if (selection === 'Yes, primary only') {
            insuranceName.classList.remove("is-hidden");
            insurance.setAttribute("required", "required");
            type.setAttribute("required", "required");
        } else if (selection === 'Yes, primary & secondary') {
            insuranceName.classList.remove("is-hidden");
            insuranceName2.classList.remove("is-hidden");
            insurance.setAttribute("required", "required");
            type.setAttribute("required", "required");
            insurance2.setAttribute("required", "required");
            type2.setAttribute("required", "required");
        }
    });

    insurance.addEventListener("change", function () {
        if (insurance.value !== "") {
            primaryInsuranceInput.value = insurance.value;
        }
    });

    type.addEventListener("change", function () {
        primaryMedicaidInput.value = this.value;
    });

    insurance2.addEventListener("change", function () {
        if (insurance2.value !== "") {
            secondaryInsuranceInput.value = insurance2.value;
        }
    });

    type2.addEventListener("change", function () {
        secondaryMedicaidInput.value = this.value;
    });
});

// Main Form Submission Logic with MQL Status
document.getElementById('form_wrapper').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Gather values from form fields
    const asdDiagnosis = document.getElementById('asd').value;
    const hasInsurance = document.getElementById('insuranceSelect').value;
    const childAge = parseInt(document.getElementById('00N8b00000EQM2a').value, 10);
    const state = document.getElementById('select').value;
    const isMedicaid = document.getElementById('type').value === "Yes" ? "Yes" : "No"; // Primary insurance plan type
    const insuranceProvider = document.getElementById('insurance').value;
    const secondaryInsuranceProvider = document.getElementById('insurance2').value;
    const mqlStatusField = document.getElementById('00NRc00000Nxa1C'); // Hidden MQL Status field

    // Fetch the JSON data
    const jsonData = await fetch('https://cdn.prod.fortahealth.com/assets/tofu_payor_status.json').then(res => res.json());

    // Function to find payor data from JSON
    function findInsuranceData(state, insuranceProvider) {
        return jsonData.find(item => item.state === state && item.tofu_payor_name === insuranceProvider);
    }

    // Get primary insurance's TOFU Status
    const insuranceData = findInsuranceData(state, insuranceProvider);
    const tofuStatus = insuranceData ? insuranceData.tofu_status : null;

    // Redirect Logic based on JSON tofu_status
	// DISQUALIFY if "Does your child have health insurance?" is "No"
    if (hasInsurance === 'No') {
        returnURL = "https://www.fortahealth.com/thank-you-2";
        mqlStatus = "DQ - No Insurance";
    }
    // DISQUALIFY if primary insurance's TOFU Status is "Disqualify" (regardless of secondary)
    else if (tofuStatus === "Disqualify") {
        returnURL = "https://www.fortahealth.com/thank-you-2";
        mqlStatus = "DQ - Insurance not supported";
    }
    // DISQUALIFY based on ASD diagnosis logic (No ASD or on waitlist)
    else if (asdDiagnosis === "No, have non-ASD diagnosis" || asdDiagnosis === "No, on a waitlist") {
        returnURL = "https://www.fortahealth.com/thank-you-2";
        mqlStatus = "DQ - No Diagnosis";
    }
    // DISQUALIFY if Age is >99
    else if (childAge > 99) {
        returnURL = "https://www.fortahealth.com/thank-you-2";
        mqlStatus = "DQ - Age";
    }
    // PASS if primary insurance's TOFU Status is "Passing"
    else if (tofuStatus === "Passing") {
        returnURL = "https://fortahealth.com/thank-you-schedule";
        mqlStatus = "MQL";
    }

    console.log("Redirecting to: " + returnURL); // Debugging line
    console.log("MQL Status: " + mqlStatus); // Debugging line

    // Set the MQL Status hidden field
    mqlStatusField.value = mqlStatus;

    // Delay the form submission by 500ms
    setTimeout(function () {
        document.getElementsByName("retURL")[0].value = returnURL;
        e.target.submit(); // Submit the form after delay
    }, 500); 
});

// Load the JSON data
let jsonData = [];
fetch('https://cdn.prod.fortahealth.com/assets/tofu_payor_status.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
  });

// Function to filter the selected insurance data from JSON based on the state and insurance name
function findInsuranceData(state, insuranceName) {
  return jsonData.find(item => item.state === state && item.tofu_payor_name === insuranceName);
}

// Function to update the hidden fields for primary insurance
function updatePrimaryInsuranceFields(state, insuranceName) {
  const insuranceData = findInsuranceData(state, insuranceName);
  if (insuranceData) {
    document.getElementById('00NRc00000OHqQz').value = insuranceData.final_forta_bay; // Primary Insurance Bay
    document.getElementById('00NRc00000OHo1Z').value = insuranceData.inn_oon_designation; // Primary Insurance Status
  } else {
    // Clear hidden fields if no matching data is found
    document.getElementById('00NRc00000OHqQz').value = '';
    document.getElementById('00NRc00000OHo1Z').value = '';
  }
}

// Function to update the hidden fields for secondary insurance
function updateSecondaryInsuranceFields(state, insuranceName) {
  const insuranceData = findInsuranceData(state, insuranceName);
  if (insuranceData) {
    document.getElementById('00NRc00000OHWu6').value = insuranceData.final_forta_bay; // Secondary Insurance Bay
    document.getElementById('00NRc00000OHuZR').value = insuranceData.inn_oon_designation; // Secondary Insurance Status
  } else {
    // Clear hidden fields if no matching data is found
    document.getElementById('00NRc00000OHWu6').value = '';
    document.getElementById('00NRc00000OHuZR').value = '';
  }
}

// Event listener for state selection to mirror the state into both groups initially
document.getElementById('select').addEventListener('change', function () {
  const selectedState = this.value;

  // Mirror selection into statePrimary and stateSecondary
  document.getElementById('statePrimary').value = selectedState;
  document.getElementById('stateSecondary').value = selectedState;

  // Get current type values for each group
  const type1 = document.getElementById('type').value;
  const type2 = document.getElementById('type2').value;

  // Update insurance dropdowns for both groups based on the initial state and their respective types
  updateInsuranceDropdowns(selectedState, type1, 'insurance');
  updateInsuranceDropdowns(selectedState, type2, 'insurance2');
});

// Event listener for changes in Group 1 (statePrimary, type, insurance)
document.getElementById('statePrimary').addEventListener('change', function () {
  const selectedState = this.value;
  const selectedType = document.getElementById('type').value;
  updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
});

document.getElementById('type').addEventListener('change', function () {
  const selectedState = document.getElementById('statePrimary').value;
  const selectedType = this.value;
  updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
});

// Event listener for changes in Group 2 (stateSecondary, type2, insurance2)
document.getElementById('stateSecondary').addEventListener('change', function () {
  const selectedState = this.value;
  const selectedType = document.getElementById('type2').value;
  updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
});

document.getElementById('type2').addEventListener('change', function () {
  const selectedState = document.getElementById('stateSecondary').value;
  const selectedType = this.value;
  updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
});

// Update insurance dropdowns based on state and type
function updateInsuranceDropdowns(state, type, insuranceId) {
  const payorNames = filterPayors(state, type);
  const insuranceDropdown = document.getElementById(insuranceId);

  // Clear current options
  insuranceDropdown.innerHTML = '';

  // Add new options
  payorNames.forEach(payor => {
    const option = document.createElement('option');
    option.value = payor.tofu_payor_name;
    option.text = payor.tofu_payor_name;
    insuranceDropdown.appendChild(option);
  });

  // Trigger the hidden fields update for primary or secondary insurance based on the dropdown
  if (insuranceId === 'insurance') {
    updatePrimaryInsuranceFields(state, insuranceDropdown.value);
  } else {
    updateSecondaryInsuranceFields(state, insuranceDropdown.value);
  }
}

// Function to filter payors based on state and type
function filterPayors(state, type) {
  if (type === 'Yes') {
    return jsonData.filter(item => item.state === state && (item.payor_type === 'Medicaid' || item.payor_type === 'MCO'));
  } else if (type === 'No') {
    return jsonData.filter(item => item.state === state && (item.payor_type === 'Commercial' || item.payor_type === 'Government Plan'));
  }
  return [];
}