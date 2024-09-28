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
        const gclidInput = document.getElementById("00N8b00000GjstL");
        if (gclidInput) {
          gclidInput.value = event.data.value;
        }
      }
    }, false);
  
    // Script for communication checkbox
    if (communicationYes && communicationInput) {
      communicationYes.addEventListener("change", () => {
        if (communicationYes.checked) {
          communicationInput.setAttribute("value", "Yes");
        } else {
          communicationInput.setAttribute("value", "No");
        }
      });
    }
  
    // Script for state dropdown
    if (select && state2) {
      select.addEventListener("change", function () {
        state2.setAttribute("value", select.value);
      });
    }
  
    // Script for ASD dropdown
    if (asd && asdInput) {
      asd.addEventListener("change", function () {
        asdInput.setAttribute("value", asd.value);
      });
    } else {
      console.error('Element with id "asd" not found.');
    }
  
    // Script for type dropdown
    if (type && typeInput) {
      type.addEventListener("change", function () {
        typeInput.setAttribute("value", type.value);
      });
    }
  
    // Script for insuranceName dropdown
    if (insurance && insuranceInput) {
      insurance.addEventListener("change", function () {
        insuranceInput.setAttribute("value", insurance.value);
      });
    }
  
    // Script for zip code
    if (zip) {
      zip.oninput = function () {
        if (this.value.length > this.maxLength) {
          this.value = this.value.slice(0, this.maxLength);
        }
      };
    }
  
    // Script for age
    if (ageInput) {
      ageInput.oninput = function () {
        if (this.value.length > this.maxLength) {
          this.value = this.value.slice(0, this.maxLength);
        }
      };
    }
  
    // Script for email validation
    if (email) {
      email.addEventListener('invalid', function () {
        this.setCustomValidity('Please enter a valid email');
      });
  
      email.addEventListener('input', function () {
        this.setCustomValidity('');
      });
    }
  
    // Remove unnecessary fields upon submission
    if (formSales) {
      formSales.addEventListener("submit", function (e) {
        if (communicationYes) communicationYes.remove();
        const consent = document.getElementById('consent');
        if (consent) consent.remove();
      });
    }
  
    // Format the phone number as the user types it
    if (phone) {
      phone.addEventListener('keyup', function (evt) {
        phone.value = phoneFormat(phone.value);
      });
  
      // Format the phone number on page load
      phone.value = phoneFormat(phone.value);
    }
  
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
      const utmSourceInput = document.getElementById('00NRc0000083yKn');
      const utmMediumInput = document.getElementById('00NRc0000083yW5');
      const utmCampaignInput = document.getElementById('00NRc0000083yhN');
      const utmContentInput = document.getElementById('00NRc0000083pBL');
      const utmDomainInput = document.getElementById('00NRc00000D4OSr');
  
      if (utmSourceInput) utmSourceInput.value = utm_source || '';
      if (utmMediumInput) utmMediumInput.value = utm_medium || '';
      if (utmCampaignInput) utmCampaignInput.value = utm_campaign || '';
      if (utmContentInput) utmContentInput.value = utm_content || '';
      if (utmDomainInput) utmDomainInput.value = utm_domain || '';
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
      if (insuranceName) insuranceName.classList.add("is-hidden");
      if (insuranceName2) insuranceName2.classList.add("is-hidden");
      if (insurance) insurance.value = "";
      if (insurance2) insurance2.value = "";
      if (type) type.value = "";
      if (type2) type2.value = "";
      if (primaryInsuranceInput) primaryInsuranceInput.value = "";
      if (primaryMedicaidInput) primaryMedicaidInput.value = "";
      if (secondaryInsuranceInput) secondaryInsuranceInput.value = "";
      if (secondaryMedicaidInput) secondaryMedicaidInput.value = "";
  
      if (insurance) insurance.removeAttribute("required");
      if (type) type.removeAttribute("required");
      if (insurance2) insurance2.removeAttribute("required");
      if (type2) type2.removeAttribute("required");
    }
  
    // Event listener for insuranceSelect change
    if (insuranceSelect) {
      insuranceSelect.addEventListener("change", function () {
        resetForm();
        const selection = insuranceSelect.value.trim();
  
        if (selection === 'Yes, primary only') {
          if (insuranceName) insuranceName.classList.remove("is-hidden");
          if (insurance) insurance.setAttribute("required", "required");
          if (type) type.setAttribute("required", "required");
        } else if (selection === 'Yes, primary & secondary') {
          if (insuranceName) insuranceName.classList.remove("is-hidden");
          if (insuranceName2) insuranceName2.classList.remove("is-hidden");
          if (insurance) insurance.setAttribute("required", "required");
          if (type) type.setAttribute("required", "required");
          if (insurance2) insurance2.setAttribute("required", "required");
          if (type2) type2.setAttribute("required", "required");
        }
      });
    }
  
    function initializeScript() {
      // Function to find payor data from JSON
      function findInsuranceData(state, insuranceName) {
        return jsonData.find(item => item.state === state && item.tofu_payor_name === insuranceName);
      }
  
      // Function to update the hidden fields for primary insurance
      function updatePrimaryInsuranceFields(state, insuranceName) {
        const insuranceData = findInsuranceData(state, insuranceName);
        if (insuranceData) {
          const primaryInsuranceBay = document.getElementById('00NRc00000OHqQz');
          const primaryInsuranceStatus = document.getElementById('00NRc00000OHo1Z');
          if (primaryInsuranceBay) primaryInsuranceBay.value = insuranceData.payor_name;
          if (primaryInsuranceStatus) primaryInsuranceStatus.value = insuranceData.inn_oon_designation;
          if (primaryInsuranceInput) primaryInsuranceInput.value = insuranceData.payor_name;
        }
      }
  
      // Function to update the hidden fields for secondary insurance
      function updateSecondaryInsuranceFields(state, insuranceName) {
        const insuranceData = findInsuranceData(state, insuranceName);
        if (insuranceData) {
          const secondaryInsuranceBay = document.getElementById('00NRc00000OHWu6');
          const secondaryInsuranceStatus = document.getElementById('00NRc00000OHuZR');
          if (secondaryInsuranceBay) secondaryInsuranceBay.value = insuranceData.payor_name;
          if (secondaryInsuranceStatus) secondaryInsuranceStatus.value = insuranceData.inn_oon_designation;
          if (secondaryInsuranceInput) secondaryInsuranceInput.value = insuranceData.payor_name;
        }
      }
  
      // Event listener for state selection to mirror the state into both groups initially
      if (select) {
        select.addEventListener('change', function () {
          const selectedState = this.value;
  
          // Mirror selection into statePrimary and stateSecondary
          const statePrimary = document.getElementById('statePrimary');
          const stateSecondary = document.getElementById('stateSecondary');
          if (statePrimary) statePrimary.value = selectedState;
          if (stateSecondary) stateSecondary.value = selectedState;
  
          // Get current type values for each group
          const type1Value = type ? type.value : '';
          const type2Value = type2 ? type2.value : '';
  
          // Update insurance dropdowns for both groups based on the initial state and their respective types
          updateInsuranceDropdowns(selectedState, type1Value, 'insurance');
          updateInsuranceDropdowns(selectedState, type2Value, 'insurance2');
        });
      }
  
      // Event listener for changes in Group 1 (statePrimary, type, insurance)
      const statePrimary = document.getElementById('statePrimary');
      if (statePrimary) {
        statePrimary.addEventListener('change', function () {
          const selectedState = this.value;
          const selectedType = type ? type.value : '';
          updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
        });
      }
  
      if (type) {
        type.addEventListener('change', function () {
          const selectedState = statePrimary ? statePrimary.value : '';
          const selectedType = this.value;
          updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
        });
      }
  
      if (insurance) {
        insurance.addEventListener('change', function () {
          const selectedState = statePrimary ? statePrimary.value : '';
          updatePrimaryInsuranceFields(selectedState, this.value);
        });
      }
  
      // Event listener for changes in Group 2 (stateSecondary, type2, insurance2)
      const stateSecondary = document.getElementById('stateSecondary');
      if (stateSecondary) {
        stateSecondary.addEventListener('change', function () {
          const selectedState = this.value;
          const selectedType = type2 ? type2.value : '';
          updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
        });
      }
  
      if (type2) {
        type2.addEventListener('change', function () {
          const selectedState = stateSecondary ? stateSecondary.value : '';
          const selectedType = this.value;
          updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
        });
      }
  
      if (insurance2) {
        insurance2.addEventListener('change', function () {
          const selectedState = stateSecondary ? stateSecondary.value : '';
          updateSecondaryInsuranceFields(selectedState, this.value);
        });
      }
  
      // Update insurance dropdowns based on state and type
      function updateInsuranceDropdowns(state, typeValue, insuranceId) {
        const payorNames = filterPayors(state, typeValue);
        const insuranceDropdown = document.getElementById(insuranceId);
  
        if (!insuranceDropdown) return;
  
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
      if (formSales) {
        formSales.addEventListener('submit', function (e) {
          e.preventDefault();
  
          // Update hidden fields before submission
          const statePrimaryValue = statePrimary ? statePrimary.value : '';
          const insurancePrimaryValue = insurance ? insurance.value : '';
          updatePrimaryInsuranceFields(statePrimaryValue, insurancePrimaryValue);
  
          const stateSecondaryValue = stateSecondary ? stateSecondary.value : '';
          const insuranceSecondaryValue = insurance2 ? insurance2.value : '';
          updateSecondaryInsuranceFields(stateSecondaryValue, insuranceSecondaryValue);
  
          // Gather values from form fields
          const asdDiagnosis = asd ? asd.value : '';
          const hasInsurance = insuranceSelect ? insuranceSelect.value : '';
          const childAge = parseInt(ageInput ? ageInput.value : '0', 10);
          const stateValue = select ? select.value : '';
          const isMedicaid = type && type.value === "Yes" ? "Yes" : "No"; // Primary insurance plan type
          const mqlStatusField = document.getElementById('00NRc00000Nxa1C'); // Hidden MQL Status field
  
          // Get primary insurance's TOFU Status
          const insuranceData = findInsuranceData(stateValue, insurancePrimaryValue);
          const tofuStatus = insuranceData ? insuranceData.tofu_status : null;
  
          // Redirect Logic based on JSON tofu_status
          let returnURL = "https://www.fortahealth.com/thank-you-2"; // Default URL
          let mqlStatus = "DQ - Other"; // Default status
  
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
          }
  
          console.log("Redirecting to: " + returnURL); // Debugging line
          console.log("MQL Status: " + mqlStatus); // Debugging line
  
          // Set the MQL Status hidden field
          if (mqlStatusField) mqlStatusField.value = mqlStatus;
  
          // Delay the form submission by 500ms
          setTimeout(function () {
            const retURLInput = document.getElementsByName("retURL")[0];
            if (retURLInput) retURLInput.value = returnURL;
            e.target.submit(); // Submit the form after delay
          }, 500);
        });
      }
    }
  });