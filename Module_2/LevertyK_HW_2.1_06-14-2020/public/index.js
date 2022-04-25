let prompt, answer, maxNum

// eslint-disable-next-line no-unused-vars
function initialize () {
  // Reference to sections
  prompt = document.getElementById('promptSection')

  // Reference to Buttons
  const btnEasy = document.getElementById('btnEasy')
  const btnMed = document.getElementById('btnMed')
  const btnHard = document.getElementById('btnHard')
  const btnSumbit = document.getElementById('btnSubmit')
  const btnRestart = document.getElementById('btnRestart')

  // Click Events
  btnEasy.onclick = (e) => { setRange(1) }
  btnMed.onclick = (e) => { setRange(2) }
  btnHard.onclick = (e) => { setRange(3) }

  btnSumbit.onclick = (e) => { checkGuess(document.getElementById('guess').value) }

  btnRestart.onclick = (e) => { resetGame() }
}

// Define what the paramaters are for the person to guess based on button selection
function setRange (difficulty) {
  // Calculate Limit
  maxNum = Math.pow(10, difficulty)

  // Generage Secret Answer
  generateAnswer(difficulty)

  // Toggle Visibilities
  showHidden()

  // Display Calculated Range
  prompt.innerHTML += maxNum

  // Disable difficulty buttons to prevent backtracking
  disableDiffButtons()
}

// Reveal hidden guessing section after difficulty is chosen
function showHidden () {
  const visToggle = document.getElementById('visToggle')

  if (visToggle.hidden) {
    visToggle.hidden = false
  }
}

// Generate Secret Answer
function generateAnswer (difficulty) {
  // (Random 0 - 1) X (10 ^ difficulty)
  answer = Math.ceil(Math.random() * Math.pow(10, difficulty))
}

// Check Guess to Secret Answer
function checkGuess (num) {
  let response
  const guessFeedback = document.getElementById('guessFeedback')

  if (!validGuess(num)) {
    guessFeedback.innerHTML = '<h2 class="tCenter bg-danger text-light">Invalid Guess</h2>'
    return
  // eslint-disable-next-line eqeqeq
  } else if (num == answer) {
    response = 'You Win!'
    disableButtons()
  } else if (num > answer) {
    response = 'Too High'
  } else { response = 'Too Low' }

  // Combine response
  guessFeedback.innerHTML = '<h2 class="tCenter">' + response + '</h2>'

  // Reset Response
  response = ''
}

function validGuess (num) {
  return num <= maxNum && num > 0
}

// Disable only difficulty buttons
function disableDiffButtons () {
  const btnNames = ['btnEasy', 'btnMed', 'btnHard']

  for (let i = 0; i < 4; i++) {
    document.getElementById(btnNames[i]).disabled = true
  }
}

// Disable difficulty and submission buttons
function disableButtons () {
  const btnNames = ['btnEasy', 'btnMed', 'btnHard', 'btnSubmit']

  // Disable Difficumly and Sumbission buttons
  for (let i = 0; i < 4; i++) {
    document.getElementById(btnNames[i]).disabled = true
  }

  // Show Hidden Restart Button
  document.getElementById('btnRestart').hidden = false
}

// Enable difficulty and submission buttons
function enableButtons () {
  const btnNames = ['btnEasy', 'btnMed', 'btnHard', 'btnSubmit']

  for (let i = 0; i < 4; i++) {
    document.getElementById(btnNames[i]).disabled = false
  }

  // Hide Restart Button
  document.getElementById('btnRestart').hidden = true
}

// Reset Game
function resetGame () {
  // Hide Results Section
  document.getElementById('visToggle').hidden = true

  // Enable Buttons and hide restart
  enableButtons()

  // Reset Feedback
  document.getElementById('guessFeedback').innerHTML = ''
}
