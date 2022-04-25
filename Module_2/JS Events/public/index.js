
let dataSection, dataDiv

function initialize () {
  // Reference to Data Section
  dataSection = document.getElementById('dataPassingSection')
  dataDiv = document.getElementById('data')

  // Get Reference to Button
  const toggleButton1 = document.getElementById('toggleButton1')
  const toggleButton2 = document.getElementById('toggleButton2')
  const toggleButton3 = document.getElementById('toggleButton3')
  toggleButton1.onclick = (e) => { toggleDataSection(1) }
  toggleButton2.onclick = (e) => { toggleDataSection(2) }
  toggleButton3.onclick = (e) => { toggleDataSection(3) }
}

function toggleDataSection (buttonNumber) {
  if (dataSection.hidden) {
    dataSection.hidden = false
  } else {
    dataSection.hidden = true
  }
  dataDiv.innerHTML = 'Toggled By Button ' + buttonNumber
}

initialize()
