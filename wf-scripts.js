/*//script for gclid capture
window.addEventListener('message', function (event) {
    var origin = event.origin || event.originalEvent.origin;
    if (event.data.call == 'gcValue') {
        document.getElementById("00N8b00000GjstL").value = event.data.value;
    }
}, false);

//script for communication checkbox
const communicationYes = document.getElementById("communicationYes");
communicationYes.addEventListener("change", () => {
    if (communicationYes.checked) {
        document.getElementById("00N8b00000EQM3O").setAttribute("value", "Yes");
    } else if (communicationYes.checked === false) {
        document.getElementById("00N8b00000EQM3O").setAttribute("value", "No");
    }
});

//script for state dropdown
const select = document.getElementById("select");
const state2 = document.getElementById("input-field-1");
select.addEventListener("change", function () {
    state2.setAttribute("value", select.value);
});

//script for asd dropdown
const asd = document.getElementById("asd");
const asdInput = document.getElementById("00N8b00000EQM2f");
asd.addEventListener("change", function () {
    asdInput.setAttribute("value", asd.value);
});

//script for type dropdown
const type = document.getElementById("type");
const typeInput = document.getElementById("00N8b00000Bz6ey");
type.addEventListener("change", function () {
    typeInput.setAttribute("value", type.value);
});

//script for insuranceName dropdown
const insurance = document.getElementById("insurance");
const insuranceInput = document.getElementById("00N8b00000EQM3J");
insurance.addEventListener("change", function () {
    insuranceInput.setAttribute("value", insurance.value);
});

//script for zip code
  document.getElementById('zip').oninput = function () {
    if (this.value.length > this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
    }
  };
  
//script for age
  document.getElementById('00N8b00000EQM2a').oninput = function () {
    if (this.value.length > this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
    }
  };

// script for email
  document.getElementById('email').addEventListener('invalid', function() {
        this.setCustomValidity('Please enter a valid email');
    });

    document.getElementById('email').addEventListener('input', function() {
        this.setCustomValidity('');
    }); 

//removes unnecessary fields upon submission
const formSales = document.getElementById("form_wrapper");
formSales.addEventListener("submit", function (e) {
    communicationYes.remove();
    document.getElementById('consent').remove();
});

// Format the phone number as the user types it
document.getElementById('phone').addEventListener('keyup', function (evt) {
    var phoneNumber = document.getElementById('phone');
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    phoneNumber.value = phoneFormat(phoneNumber.value);
});

// Format the phone number on page load
document.getElementById('phone').value = phoneFormat(document.getElementById('phone').value);

// A function to determine if the pressed key is an integer
function numberPressed(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 36 || charCode > 40)) {
        return false;
    }
    return true;
}

// A function to format text to look like a phone number
function phoneFormat(input) {
    input = input.replace(/\D/g, '');
    input = input.substring(0, 10);
    var size = input.length;
    if (size == 0) {
        input = input;
    } else if (size < 4) {
        input = '(' + input;
    } else if (size < 7) {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
    } else {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
    }
    return input;
}

// Function to get URL parameters
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// Capture UTM parameters
var utm_source = getURLParameter('utm_source');
var utm_medium = getURLParameter('utm_medium');
var utm_campaign = getURLParameter('utm_campaign');
var utm_content = getURLParameter('utm_content');
var utm_domain = getURLParameter('utm_domain');

function populateHiddenFields() {
    if (document.getElementById('00NRc0000083yKn')) {
        document.getElementById('00NRc0000083yKn').value = utm_source || '';
    }
    if (document.getElementById('00NRc0000083yW5')) {
        document.getElementById('00NRc0000083yW5').value = utm_medium || '';
    }
    if (document.getElementById('00NRc0000083yhN')) {
        document.getElementById('00NRc0000083yhN').value = utm_campaign || '';
    }
    if (document.getElementById('00NRc0000083pBL')) {
        document.getElementById('00NRc0000083pBL').value = utm_content || '';
    }
    if (document.getElementById('00NRc00000D4OSr')) {
        document.getElementById('00NRc00000D4OSr').value = utm_domain || '';
    }
}
document.addEventListener('DOMContentLoaded', populateHiddenFields);

// ------- FORM LOGIC ----- //
// Load the JSON data first
let jsonData = [];

fetch('https://cdn.prod.fortahealth.com/assets/tofu_payor_status.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    initializeScript(); // Initialize the rest of the script after data is loaded
  });

function initializeScript() {
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

    // Function to find payor data from JSON
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

    document.getElementById('insurance').addEventListener('change', function () {
      const selectedState = document.getElementById('statePrimary').value;
      updatePrimaryInsuranceFields(selectedState, this.value);
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

    document.getElementById('insurance2').addEventListener('change', function () {
      const selectedState = document.getElementById('stateSecondary').value;
      updateSecondaryInsuranceFields(selectedState, this.value);
    });

    // Update insurance dropdowns based on state and type
    function updateInsuranceDropdowns(state, type, insuranceId) {
      const payorNames = filterPayors(state, type);
      const insuranceDropdown = document.getElementById(insuranceId);

      // Clear current options
      insuranceDropdown.innerHTML = '';

      // Add default option
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.text = 'Select provider';
      insuranceDropdown.appendChild(defaultOption);

      // Sort payorNames alphabetically by tofu_payor_name
      payorNames.sort((a, b) => {
        const nameA = (a.tofu_payor_name || '').toUpperCase();
        const nameB = (b.tofu_payor_name || '').toUpperCase();
        return nameA.localeCompare(nameB);
      });

      // Add new options
      payorNames.forEach(payor => {
        const option = document.createElement('option');
        option.value = payor.tofu_payor_name;
        option.text = payor.tofu_payor_name;
        insuranceDropdown.appendChild(option);
      });

      // Ensure default option is selected
      insuranceDropdown.selectedIndex = 0;

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
        return jsonData.filter(item => item.state === state && (item.payor_type === 'Medicaid' || item.payor_type === 'MCO') && item.tofu_payor_name != null);
      } else if (type === 'No') {
        return jsonData.filter(item => item.state === state && (item.payor_type === 'Commercial' || item.payor_type === 'Government Plan') && item.tofu_payor_name != null);
      }
      return [];
    }

    // Main Form Submission Logic with MQL Status
    document.getElementById('form_wrapper').addEventListener('submit', function (e) {
      e.preventDefault();

      // Update hidden fields before submission
      const statePrimary = document.getElementById('statePrimary').value;
      const insurancePrimary = document.getElementById('insurance').value;
      updatePrimaryInsuranceFields(statePrimary, insurancePrimary);

      const stateSecondary = document.getElementById('stateSecondary').value;
      const insuranceSecondary = document.getElementById('insurance2').value;
      updateSecondaryInsuranceFields(stateSecondary, insuranceSecondary);

      // Gather values from form fields
      const asdDiagnosis = document.getElementById('asd').value;
      const hasInsurance = document.getElementById('insuranceSelect').value;
      const childAge = parseInt(document.getElementById('00N8b00000EQM2a').value, 10);
      const state = document.getElementById('select').value;
      const isMedicaid = document.getElementById('type').value === "Yes" ? "Yes" : "No"; // Primary insurance plan type
      const insuranceProvider = document.getElementById('insurance').value;
      const secondaryInsuranceProvider = document.getElementById('insurance2').value;
      const mqlStatusField = document.getElementById('00NRc00000Nxa1C'); // Hidden MQL Status field

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
      } else {
        // Default fallback
        returnURL = "https://www.fortahealth.com/thank-you-2";
        mqlStatus = "DQ - Other";
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
  });
}*/

document.addEventListener('DOMContentLoaded', function () {
    // Variable declarations
    // Script for communication checkbox
    const communicationYes = document.getElementById("communicationYes");
    const communicationInput = document.getElementById("00N8b00000EQM3O");
  
    // Script for state dropdown
    const select = document.getElementById("select");
    const state2 = document.getElementById("input-field-1");
  
    // Script for ASD dropdown
    const asd = document.getElementById("asd");
    const asdInput = document.getElementById("00N8b00000EQM2f");
  
    // Script for type dropdown
    const type = document.getElementById("type");
    const typeInput = document.getElementById("00N8b00000Bz6ey");
  
    // Script for insuranceName dropdown
    const insurance = document.getElementById("insurance");
    const insuranceInput = document.getElementById("00N8b00000EQM3J");
  
    // Script for zip code
    const zip = document.getElementById('zip');
  
    // Script for age
    const ageInput = document.getElementById('00N8b00000EQM2a');
  
    // Script for email
    const email = document.getElementById('email');
  
    // Remove unnecessary fields upon submission
    const formSales = document.getElementById("form_wrapper");
  
    // Phone number formatting
    const phone = document.getElementById('phone');
  
    // Variables for form logic
    const insuranceSelect = document.getElementById("insuranceSelect");
    const insuranceName = document.getElementById("insuranceName");
    const insuranceName2 = document.getElementById("insuranceName2");
    const insurance2 = document.getElementById("insurance2");
    const primaryInsuranceInput = document.getElementById("00N8b00000EQM3J");
    const primaryMedicaidInput = document.getElementById("00N8b00000Bz6ey");
    const secondaryInsuranceInput = document.getElementById("00NRc00000KXXrJ");
    const secondaryMedicaidInput = document.getElementById("00NRc00000KXQa0");
    const type2 = document.getElementById("type2");
  
    // Script for gclid capture
    window.addEventListener('message', function (event) {
      var origin = event.origin || event.originalEvent.origin;
      if (event.data.call == 'gcValue') {
        document.getElementById("00N8b00000GjstL").value = event.data.value;
      }
    }, false);
  
    // Script for communication checkbox
    communicationYes.addEventListener("change", () => {
      if (communicationYes.checked) {
        communicationInput.setAttribute("value", "Yes");
      } else {
        communicationInput.setAttribute("value", "No");
      }
    });
  
    // Script for state dropdown
    select.addEventListener("change", function () {
      state2.setAttribute("value", select.value);
    });
  
    // Script for ASD dropdown
    asd.addEventListener("change", function () {
      asdInput.setAttribute("value", asd.value);
    });
  
    // Script for type dropdown
    type.addEventListener("change", function () {
      typeInput.setAttribute("value", type.value);
    });
  
    // Script for insuranceName dropdown
    insurance.addEventListener("change", function () {
      insuranceInput.setAttribute("value", insurance.value);
    });
  
    // Script for zip code
    zip.oninput = function () {
      if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
      }
    };
  
    // Script for age
    ageInput.oninput = function () {
      if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
      }
    };
  
    // Script for email validation
    email.addEventListener('invalid', function () {
      this.setCustomValidity('Please enter a valid email');
    });
  
    email.addEventListener('input', function () {
      this.setCustomValidity('');
    });
  
    // Remove unnecessary fields upon submission
    formSales.addEventListener("submit", function (e) {
      communicationYes.remove();
      document.getElementById('consent').remove();
    });
  
    // Format the phone number as the user types it
    phone.addEventListener('keyup', function (evt) {
      phone.value = phoneFormat(phone.value);
    });
  
    // Format the phone number on page load
    phone.value = phoneFormat(phone.value);
  
    // Function to format phone number
    function phoneFormat(input) {
      input = input.replace(/\D/g, '');
      input = input.substring(0, 10);
      var size = input.length;
      if (size == 0) {
        input = input;
      } else if (size < 4) {
        input = '(' + input;
      } else if (size < 7) {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3);
      } else {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6);
      }
      return input;
    }
  
    // Function to get URL parameters
    function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '='
        + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
  
    // Capture UTM parameters
    var utm_source = getURLParameter('utm_source');
    var utm_medium = getURLParameter('utm_medium');
    var utm_campaign = getURLParameter('utm_campaign');
    var utm_content = getURLParameter('utm_content');
    var utm_domain = getURLParameter('utm_domain');
  
    function populateHiddenFields() {
      if (document.getElementById('00NRc0000083yKn')) {
        document.getElementById('00NRc0000083yKn').value = utm_source || '';
      }
      if (document.getElementById('00NRc0000083yW5')) {
        document.getElementById('00NRc0000083yW5').value = utm_medium || '';
      }
      if (document.getElementById('00NRc0000083yhN')) {
        document.getElementById('00NRc0000083yhN').value = utm_campaign || '';
      }
      if (document.getElementById('00NRc0000083pBL')) {
        document.getElementById('00NRc0000083pBL').value = utm_content || '';
      }
      if (document.getElementById('00NRc00000D4OSr')) {
        document.getElementById('00NRc00000D4OSr').value = utm_domain || '';
      }
    }
    populateHiddenFields();
  
    // ------- FORM LOGIC ----- //
    // Load the JSON data first
    let jsonData = [];
  
    fetch('https://cdn.prod.fortahealth.com/assets/tofu_payor_status.json')
      .then(response => response.json())
      .then(data => {
        jsonData = data;
        initializeScript(); // Initialize the rest of the script after data is loaded
      });
  
    // Function to reset the form
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
  
    // Event listener for insuranceSelect change
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
  
    function initializeScript() {
      // Function to find payor data from JSON
      function findInsuranceData(state, insuranceName) {
        return jsonData.find(item => item.state === state && item.tofu_payor_name === insuranceName);
      }
  
      // Function to update the hidden fields for primary insurance
      function updatePrimaryInsuranceFields(state, insuranceName) {
        const insuranceData = findInsuranceData(state, insuranceName);
        if (insuranceData) {
          document.getElementById('00NRc00000OHqQz').value = insuranceData.payor_name; // Primary Insurance Bay
          document.getElementById('00NRc00000OHo1Z').value = insuranceData.inn_oon_designation; // Primary Insurance Status
          primaryInsuranceInput.value = insuranceData.payor_name; // Set primary insurance input
        } else {
          // Clear hidden fields if no matching data is found
          document.getElementById('00NRc00000OHqQz').value = '';
          document.getElementById('00NRc00000OHo1Z').value = '';
          primaryInsuranceInput.value = '';
        }
      }
  
      // Function to update the hidden fields for secondary insurance
      function updateSecondaryInsuranceFields(state, insuranceName) {
        const insuranceData = findInsuranceData(state, insuranceName);
        if (insuranceData) {
          document.getElementById('00NRc00000OHWu6').value = insuranceData.payor_name; // Secondary Insurance Bay
          document.getElementById('00NRc00000OHuZR').value = insuranceData.inn_oon_designation; // Secondary Insurance Status
          secondaryInsuranceInput.value = insuranceData.payor_name; // Set secondary insurance input
        } else {
          // Clear hidden fields if no matching data is found
          document.getElementById('00NRc00000OHWu6').value = '';
          document.getElementById('00NRc00000OHuZR').value = '';
          secondaryInsuranceInput.value = '';
        }
      }
  
      // Event listener for state selection to mirror the state into both groups initially
      select.addEventListener('change', function () {
        const selectedState = this.value;
  
        // Mirror selection into statePrimary and stateSecondary
        document.getElementById('statePrimary').value = selectedState;
        document.getElementById('stateSecondary').value = selectedState;
  
        // Get current type values for each group
        const type1 = type.value;
        const type2Value = type2.value;
  
        // Update insurance dropdowns for both groups based on the initial state and their respective types
        updateInsuranceDropdowns(selectedState, type1, 'insurance');
        updateInsuranceDropdowns(selectedState, type2Value, 'insurance2');
      });
  
      // Event listener for changes in Group 1 (statePrimary, type, insurance)
      document.getElementById('statePrimary').addEventListener('change', function () {
        const selectedState = this.value;
        const selectedType = type.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
      });
  
      type.addEventListener('change', function () {
        const selectedState = document.getElementById('statePrimary').value;
        const selectedType = this.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
      });
  
      insurance.addEventListener('change', function () {
        const selectedState = document.getElementById('statePrimary').value;
        updatePrimaryInsuranceFields(selectedState, this.value);
      });
  
      // Event listener for changes in Group 2 (stateSecondary, type2, insurance2)
      document.getElementById('stateSecondary').addEventListener('change', function () {
        const selectedState = this.value;
        const selectedType = type2.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
      });
  
      type2.addEventListener('change', function () {
        const selectedState = document.getElementById('stateSecondary').value;
        const selectedType = this.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
      });
  
      insurance2.addEventListener('change', function () {
        const selectedState = document.getElementById('stateSecondary').value;
        updateSecondaryInsuranceFields(selectedState, this.value);
      });
  
      // Update insurance dropdowns based on state and type
      function updateInsuranceDropdowns(state, typeValue, insuranceId) {
        const payorNames = filterPayors(state, typeValue);
        const insuranceDropdown = document.getElementById(insuranceId);
  
        // Clear current options
        insuranceDropdown.innerHTML = '';
  
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Select provider';
        insuranceDropdown.appendChild(defaultOption);
  
        // Sort payorNames alphabetically by tofu_payor_name
        payorNames.sort((a, b) => {
          const nameA = (a.tofu_payor_name || '').toUpperCase();
          const nameB = (b.tofu_payor_name || '').toUpperCase();
          return nameA.localeCompare(nameB);
        });
  
        // Add new options
        payorNames.forEach(payor => {
          const option = document.createElement('option');
          option.value = payor.tofu_payor_name;
          option.text = payor.tofu_payor_name;
          insuranceDropdown.appendChild(option);
        });
  
        // Ensure default option is selected
        insuranceDropdown.selectedIndex = 0;
  
        // Trigger the hidden fields update for primary or secondary insurance based on the dropdown
        if (insuranceId === 'insurance') {
          updatePrimaryInsuranceFields(state, insuranceDropdown.value);
        } else {
          updateSecondaryInsuranceFields(state, insuranceDropdown.value);
        }
      }
  
      // Function to filter payors based on state and type
      function filterPayors(state, typeValue) {
        if (typeValue === 'Yes') {
          return jsonData.filter(item => item.state === state && (item.payor_type === 'Medicaid' || item.payor_type === 'MCO') && item.tofu_payor_name != null);
        } else if (typeValue === 'No') {
          return jsonData.filter(item => item.state === state && (item.payor_type === 'Commercial' || item.payor_type === 'Government Plan') && item.tofu_payor_name != null);
        }
        return [];
      }
  
      // Main Form Submission Logic with MQL Status
      formSales.addEventListener('submit', function (e) {
        e.preventDefault();
  
        // Update hidden fields before submission
        const statePrimary = document.getElementById('statePrimary').value;
        const insurancePrimary = insurance.value;
        updatePrimaryInsuranceFields(statePrimary, insurancePrimary);
  
        const stateSecondary = document.getElementById('stateSecondary').value;
        const insuranceSecondary = insurance2.value;
        updateSecondaryInsuranceFields(stateSecondary, insuranceSecondary);
  
        // Gather values from form fields
        const asdDiagnosis = asd.value;
        const hasInsurance = insuranceSelect.value;
        const childAge = parseInt(ageInput.value, 10);
        const state = select.value;
        const isMedicaid = type.value === "Yes" ? "Yes" : "No"; // Primary insurance plan type
        const insuranceProvider = insurance.value;
        const secondaryInsuranceProvider = insurance2.value;
        const mqlStatusField = document.getElementById('00NRc00000Nxa1C'); // Hidden MQL Status field
  
        // Get primary insurance's TOFU Status
        const insuranceData = findInsuranceData(state, insuranceProvider);
        const tofuStatus = insuranceData ? insuranceData.tofu_status : null;
  
        // Redirect Logic based on JSON tofu_status
        if (hasInsurance === 'No') {
          returnURL = "https://www.fortahealth.com/thank-you-2";
          mqlStatus = "DQ - No Insurance";
        } else if (tofuStatus === "Disqualify") {
          returnURL = "https://www.fortahealth.com/thank-you-2";
          mqlStatus = "DQ - Insurance not supported";
        } else if (asdDiagnosis === "No, have non-ASD diagnosis" || asdDiagnosis === "No, on a waitlist") {
          returnURL = "https://www.fortahealth.com/thank-you-2";
          mqlStatus = "DQ - No Diagnosis";
        } else if (childAge > 99) {
          returnURL = "https://www.fortahealth.com/thank-you-2";
          mqlStatus = "DQ - Age";
        } else if (tofuStatus === "Passing") {
          returnURL = "https://fortahealth.com/thank-you-schedule";
          mqlStatus = "MQL";
        } else {
          // Default fallback
          returnURL = "https://www.fortahealth.com/thank-you-2";
          mqlStatus = "DQ - Other";
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
    }
  });