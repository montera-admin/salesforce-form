// -----------------------
// Script for GCLID Capture
// -----------------------
window.addEventListener('message', function (event) {
    var origin = event.origin || event.originalEvent.origin;
    if (event.data.call == 'gcValue') {
        document.getElementById("00N8b00000GjstL").value = event.data.value;
    }
}, false);

// -------------------------------
// Script for Communication Checkbox
// -------------------------------
const communicationYes = document.getElementById("communicationYes");
communicationYes.addEventListener("change", () => {
    const communicationField = document.getElementById("00N8b00000EQM3O");
    communicationField.value = communicationYes.checked ? "Yes" : "No";
});

// --------------------------
// Script for State Dropdown
// --------------------------
const select = document.getElementById("select");
const state2 = document.getElementById("input-field-1");
select.addEventListener("change", function () {
    state2.value = select.value;
});

// -------------------------
// Script for ASD Dropdown
// -------------------------
const asd = document.getElementById("asd");
const asdInput = document.getElementById("00N8b00000EQM2f");
asd.addEventListener("change", function () {
    asdInput.value = asd.value;
});

// --------------------------
// Script for Type Dropdowns
// --------------------------
const type = document.getElementById("type");
const typeInput = document.getElementById("00N8b00000Bz6ey");
type.addEventListener("change", function () {
    typeInput.value = type.value;
});

const type2 = document.getElementById("type2");
const type2Input = document.getElementById("00NRc00000KXQa0");
type2.addEventListener("change", function () {
    type2Input.value = type2.value;
});

// -------------------------------
// Script for Insurance Name Fields
// -------------------------------
const insurance = document.getElementById("insurance");
const insuranceInput = document.getElementById("00N8b00000EQM3J");
insurance.addEventListener("change", function () {
    const selectedState = document.getElementById('statePrimary').value;
    const insuranceData = findInsuranceData(selectedState, this.value);
    if (insuranceData) {
        // Set to payor_name from JSON
        insuranceInput.value = insuranceData.payor_name;
    } else {
        insuranceInput.value = "";
    }
});

const insurance2 = document.getElementById("insurance2");
const insurance2Input = document.getElementById("00NRc00000KXXrJ");
insurance2.addEventListener("change", function () {
    const selectedState = document.getElementById('stateSecondary').value;
    const insuranceData = findInsuranceData(selectedState, this.value);
    if (insuranceData) {
        // Set to payor_name from JSON
        insurance2Input.value = insuranceData.payor_name;
    } else {
        insurance2Input.value = "";
    }
});

// -----------------
// Script for Zip Code
// -----------------
document.getElementById('zip').oninput = function () {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
};

// -----------------
// Script for Age
// -----------------
document.getElementById('00N8b00000EQM2a').oninput = function () {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
};

// -----------------
// Script for Email Validation
// -----------------
document.getElementById('email').addEventListener('invalid', function () {
    this.setCustomValidity('Please enter a valid email');
});

document.getElementById('email').addEventListener('input', function () {
    this.setCustomValidity('');
});

// ----------------------------------------
// Remove Unnecessary Fields Upon Submission
// ----------------------------------------
const formSales = document.getElementById("form_wrapper");
formSales.addEventListener("submit", function (e) {
    communicationYes.remove();
    document.getElementById('consent').remove();
});

// -----------------------------------
// Script for Phone Number Formatting
// -----------------------------------
document.getElementById('phone').addEventListener('keyup', function (evt) {
    var phoneNumber = document.getElementById('phone');
    phoneNumber.value = phoneFormat(phoneNumber.value);
});

// Format the phone number on page load
document.getElementById('phone').value = phoneFormat(document.getElementById('phone').value);

// Function to format text to look like a phone number
function phoneFormat(input) {
    input = input.replace(/\D/g, '');
    input = input.substring(0, 10);
    var size = input.length;
    if (size === 0) {
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

// -------------------------------
// Function to Get URL Parameters
// -------------------------------
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

// ----------------------
// Capture UTM Parameters
// ----------------------
function populateHiddenFields() {
    var utm_source = getURLParameter('utm_source');
    var utm_medium = getURLParameter('utm_medium');
    var utm_campaign = getURLParameter('utm_campaign');
    var utm_content = getURLParameter('utm_content');
    var utm_domain = getURLParameter('utm_domain');

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

// -----------------------
// Load JSON Data and Initialize Script
// -----------------------
let jsonData = [];

document.addEventListener('DOMContentLoaded', function () {
    // Populate hidden fields
    populateHiddenFields();

    // Fetch JSON data
    fetch('https://cdn.prod.fortahealth.com/assets/tofu_payor_status.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            initializeScript(); // Initialize the rest of the script after data is loaded
        });
});

function initializeScript() {
    // ----------------------------
    // Variable Declarations
    // ----------------------------
    const insuranceSelect = document.getElementById("InsuranceSelect");
    const insuranceName = document.getElementById("insuranceName");
    const insuranceName2 = document.getElementById("insuranceName2");
    const insurance = document.getElementById("insurance");
    const insurance2 = document.getElementById("insurance2");
    const primaryInsuranceInput = document.getElementById("00N8b00000EQM3J");
    const secondaryInsuranceInput = document.getElementById("00NRc00000KXXrJ");
    const type = document.getElementById("type");
    const type2 = document.getElementById("type2");

    // --------------------------
    // Reset Form Functionality
    // --------------------------
    function resetForm() {
        insuranceName.classList.add("is-hidden");
        insuranceName2.classList.add("is-hidden");
        insurance.value = "";
        insurance2.value = "";
        type.value = "";
        type2.value = "";
        primaryInsuranceInput.value = "";
        secondaryInsuranceInput.value = "";

        insurance.removeAttribute("required");
        type.removeAttribute("required");
        insurance2.removeAttribute("required");
        type2.removeAttribute("required");
    }

    // ----------------------------------------
    // Event Listener for Insurance Selection
    // ----------------------------------------
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

    // ------------------------------------------
    // Functions to Find Insurance Data from JSON
    // ------------------------------------------
    function findInsuranceData(state, insuranceName) {
        return jsonData.find(item =>
            item.state === state &&
            item.tofu_payor_name === insuranceName
        );
    }

    // --------------------------------------------------
    // Update Hidden Fields for Primary Insurance
    // --------------------------------------------------
    function updatePrimaryInsuranceFields(state, insuranceName) {
        const insuranceData = findInsuranceData(state, insuranceName);
        if (insuranceData) {
            document.getElementById('00NRc00000OHqQz').value = insuranceData.final_forta_bay; // Primary Insurance Bay
            document.getElementById('00NRc00000OHo1Z').value = insuranceData.inn_oon_designation; // Primary Insurance Status
            primaryInsuranceInput.value = insuranceData.payor_name; // Set to payor_name
        } else {
            // Clear hidden fields if no matching data is found
            document.getElementById('00NRc00000OHqQz').value = '';
            document.getElementById('00NRc00000OHo1Z').value = '';
            primaryInsuranceInput.value = '';
        }
    }

    // --------------------------------------------------
    // Update Hidden Fields for Secondary Insurance
    // --------------------------------------------------
    function updateSecondaryInsuranceFields(state, insuranceName) {
        const insuranceData = findInsuranceData(state, insuranceName);
        if (insuranceData) {
            document.getElementById('00NRc00000OHWu6').value = insuranceData.final_forta_bay; // Secondary Insurance Bay
            document.getElementById('00NRc00000OHuZR').value = insuranceData.inn_oon_designation; // Secondary Insurance Status
            secondaryInsuranceInput.value = insuranceData.payor_name; // Set to payor_name
        } else {
            // Clear hidden fields if no matching data is found
            document.getElementById('00NRc00000OHWu6').value = '';
            document.getElementById('00NRc00000OHuZR').value = '';
            secondaryInsuranceInput.value = '';
        }
    }

    // --------------------------------------------
    // Event Listener for Main State Selection
    // --------------------------------------------
    document.getElementById('select').addEventListener('change', function () {
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

    // ----------------------------------------------------
    // Event Listeners for Changes in Primary Insurance
    // ----------------------------------------------------
    document.getElementById('statePrimary').addEventListener('change', function () {
        const selectedState = this.value;
        const selectedType = type.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance');
    });

    type.addEventListener("change", function () {
        const selectedState = document.getElementById('statePrimary').value;
        const selectedType = this.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance');

        // Reset insurance dropdown to 'Select provider'
        insurance.selectedIndex = 0;
        primaryInsuranceInput.value = '';
    });

    insurance.addEventListener("change", function () {
        const selectedState = document.getElementById('statePrimary').value;
        updatePrimaryInsuranceFields(selectedState, this.value);
    });

    // -----------------------------------------------------
    // Event Listeners for Changes in Secondary Insurance
    // -----------------------------------------------------
    document.getElementById('stateSecondary').addEventListener('change', function () {
        const selectedState = this.value;
        const selectedType = type2.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');
    });

    type2.addEventListener("change", function () {
        const selectedState = document.getElementById('stateSecondary').value;
        const selectedType = this.value;
        updateInsuranceDropdowns(selectedState, selectedType, 'insurance2');

        // Reset insurance2 dropdown to 'Select provider'
        insurance2.selectedIndex = 0;
        secondaryInsuranceInput.value = '';
    });

    insurance2.addEventListener("change", function () {
        const selectedState = document.getElementById('stateSecondary').value;
        updateSecondaryInsuranceFields(selectedState, this.value);
    });

    // -------------------------------------------------
    // Update Insurance Dropdowns Based on State and Type
    // -------------------------------------------------
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

        // Filter out entries with null or empty 'tofu_payor_name' and sort alphabetically
        const filteredPayors = payorNames.filter(payor => payor.tofu_payor_name && payor.tofu_payor_name.trim() !== '');
        filteredPayors.sort((a, b) => {
            const nameA = a.tofu_payor_name.toUpperCase();
            const nameB = b.tofu_payor_name.toUpperCase();
            return nameA.localeCompare(nameB);
        });

        // Add new options
        filteredPayors.forEach(payor => {
            const option = document.createElement('option');
            option.value = payor.tofu_payor_name;
            option.text = payor.tofu_payor_name;
            insuranceDropdown.appendChild(option);
        });

        // Ensure default option is selected
        insuranceDropdown.selectedIndex = 0;

        // Clear corresponding hidden fields
        if (insuranceId === 'insurance') {
            primaryInsuranceInput.value = '';
            document.getElementById('00NRc00000OHqQz').value = '';
            document.getElementById('00NRc00000OHo1Z').value = '';
        } else {
            secondaryInsuranceInput.value = '';
            document.getElementById('00NRc00000OHWu6').value = '';
            document.getElementById('00NRc00000OHuZR').value = '';
        }
    }

    // -------------------------------------------------
    // Function to Filter Payors Based on State and Type
    // -------------------------------------------------
    function filterPayors(state, type) {
        if (type === 'Yes') {
            return jsonData.filter(item =>
                item.state === state &&
                (item.payor_type === 'Medicaid' || item.payor_type === 'MCO') &&
                item.tofu_payor_name != null &&
                item.tofu_payor_name.trim() !== ''
            );
        } else if (type === 'No') {
            return jsonData.filter(item =>
                item.state === state &&
                (item.payor_type === 'Commercial' || item.payor_type === 'Government Plan') &&
                item.tofu_payor_name != null &&
                item.tofu_payor_name.trim() !== ''
            );
        }
        return [];
    }

    // ----------------------------------------------
    // Main Form Submission Logic with MQL Status
    // ----------------------------------------------
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
        const hasInsurance = document.getElementById('InsuranceSelect').value;
        const childAge = parseInt(document.getElementById('00N8b00000EQM2a').value, 10);
        const state = document.getElementById('select').value;
        const insuranceProvider = document.getElementById('insurance').value;
        const mqlStatusField = document.getElementById('00NRc00000Nxa1C'); // Hidden MQL Status field

        // Diagnosis Disqualify States
        const diagnosisDisqualifyStates = ["OH", "TX", "IN", "MD", "KS", "MO", "NC"];

        // Function to find payor data from JSON
        function findInsuranceData(state, insuranceProvider) {
            return jsonData.find(item =>
                item.state === state &&
                item.tofu_payor_name === insuranceProvider
            );
        }

        // Get primary insurance's TOFU Status
        const insuranceData = findInsuranceData(state, insuranceProvider);
        const tofuStatus = insuranceData ? insuranceData.tofu_status : null;

        // ---------------------------------------
        // Redirect Logic Based on Business Rules
        // ---------------------------------------
        let returnURL = '';
        let mqlStatus = '';

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
        // DISQUALIFY based on adjusted ASD diagnosis logic
        else if (
            asdDiagnosis === "No, have non-ASD diagnosis" ||
            (diagnosisDisqualifyStates.includes(state) && asdDiagnosis.includes('No'))
        ) {
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

        // Set the MQL Status hidden field
        mqlStatusField.value = mqlStatus;

        // Delay the form submission by 500ms
        setTimeout(function () {
            document.getElementsByName("retURL")[0].value = returnURL;
            e.target.submit(); // Submit the form after delay
        }, 500);
    });
}