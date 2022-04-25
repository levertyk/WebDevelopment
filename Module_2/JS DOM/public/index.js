// Getting main Content id from DOM tree
const mainDiv = document.getElementById('mainContent')

// Make a p tag and fill it with text
const myPTag = document.createElement('p')
myPTag.appendChild(
  document.createTextNode('Hello Create Element!')
)

// Add p tag to main content
mainDiv.appendChild(myPTag)

// ==================================== //

const tableElement = document.getElementById('myTable')
tableElement.className = 'table table-striped table-dark'

const tHead = tableElement.tHead
const tBody = tableElement.tBodies[0]

const headWords = ['#', 'Name', 'Age']
const names = ['Jeff', 'Martha', 'Jack', 'Jamye']
const ages = ['35', '25', '66', '43']

// Create header row
const headRow = tHead.insertRow(-1)

// Set up table header row
let newHeadCell
for (let i = 0; i < headWords.length; i++) {
  newHeadCell = headRow.insertCell()
  newHeadCell.outerHTML = '<th>' + headWords[i] + '</th>'
}

// Build Table Body
let bodyRow
let newBodyCell
let tempString = ''

for (let a = 0; a < names.length; a++) {
  bodyRow = tBody.insertRow()

  for (let b = 0; b < 3; b++) {
    newBodyCell = bodyRow.insertCell()
    if (b === 0) {
      tempString = String(a + 1)
    } else if (b === 1) {
      tempString = names[a]
    } else {
      tempString = ages[a]
    }

    newBodyCell.innerHTML = tempString
  }
}
