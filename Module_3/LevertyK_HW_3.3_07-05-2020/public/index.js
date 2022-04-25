/* eslint-disable no-undef */
// Variable boolean for if the passwords match
let passMatch

// Update submit event once page is loaded
document.body.onload = () => {
  $('#form-signin').on('submit', formSubmit)
}

// Check to see if the passwords match
document.getElementById('inputPassword1').onkeydown = (e) => { checkPassowrds() }
document.getElementById('inputPassword2').onkeydown = (e) => { checkPassowrds() }

// Runs when form is submitted
function formSubmit (event) {
  // Dismiss any existing Bootstrap alerts
  $('.alert').alert('close')

  // Check to make sure that the passwo4d match
  checkPassowrds()

  // Check the validity of the form
  const myForm = $('#form-signin')
  if (myForm[0].checkValidity() && passMatch) {
    // Form is valid so reset style and content
    myForm.removeClass('was-validated')

    // Show a successful alert message
    showAlert('Success', 'alert-success')
  } else {
    // Prevent default reloading of page
    event.preventDefault()

    // Form is invalid so turn on validation styling
    myForm.addClass('was-validated')

    // Check to see if the passwords match
    if (!myForm[0].checkValidity() && !passMatch) {
      invalidFormAlerts()
      passDontMatch()
    } else if (!passMatch) {
      passDontMatch()
    } else {
      invalidFormAlerts()
    }
  }
}

// Add an alert to the alert area
function showAlert (text, alertStyle) {
  // Create and setup alert div
  const alertDiv = $('<div>').addClass('text-left alert alert-dismissible fade show ' + alertStyle)
  alertDiv.attr('role', 'alert')

  // Add dismiss button and text to the alert div
  alertDiv.html(`
    ${text}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `)

  // Add alert div to the alert area
  $('#alertFeedback').append(alertDiv)
}

// Checks to see if the passwords are equal
function checkPassowrds () {
  const pass1 = document.getElementById('inputPassword1').value
  const pass2 = document.getElementById('inputPassword2').value

  passMatch = pass1 === pass2
}

// Finds all of the alerts if the form is not valid
function invalidFormAlerts () {
  // Loop through the form controls
  const inputs = $('#form-signin .form-control')
  for (let i = 0; i < inputs.length; i++) {
    // Check if they have a validation message
    const elem = inputs[i]
    if (elem.validationMessage !== '') {
      // Show validation message in the alert area
      showAlert(`<strong>${elem.name}:</strong> ${elem.validationMessage}`, 'alert-danger')
    }
  }
}

// Does all for styling and alerts for if the passwords do not match
function passDontMatch () {
  // Change box styles
  $('.inputPassword1', '.inputPassword2').addClass('is-invalid')
  // Show password alert
  showAlert('Passwords do not match', 'alert-danger')
}
