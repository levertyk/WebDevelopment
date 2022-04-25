/* global columnNames $ */

// Initialize Table Elements, Data, and current page for global use
let table, tableHead, tableBody, pageData, currentPage

// Array of strings to use for finding customer object properties
const customerProperties = ['firstName', 'lastName', 'email', 'phoneNumber', 'streetAddress', 'city', 'state', 'zip']

// JavaScript initialize after page load
// eslint-disable-next-line no-unused-vars
function initialize () {
  // Referencing table and table elements
  table = document.getElementById('tableSection')
  tableHead = table.tHead
  tableBody = table.tBodies[0]

  // Initial Construction of Table with first data set
  setPage(0)

  // Establishing button events corresponding to the correct data set
  for (let i = 0; i < 8; i++) {
    $('#btn' + i).click(() => { setPage(i) })
  }

  // Previous and Next Buttons with Alerts
  $('#btnPrev').click(() => { if (currentPage !== 0) { setPage(currentPage - 1) } else { alert('Already on the first page') } })
  $('#btnNext').click(() => { if (currentPage !== 7) { setPage(currentPage + 1) } else { alert('No more pages') } })
}

// Changes the page that is currently being showed
function setPage (page) {
  // Change current page
  currentPage = page

  // Set page Number on page
  $('#pageNumber').text(page + 1)

  // New HTTP Request
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'data/data' + page + '.json', true)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      pageData = JSON.parse(xhr.responseText)
      constructTable()
    }
  }

  xhr.send()
}

// Fill Table Header
function fillTableHeader () {
  const headerRow = tableHead.insertRow()

  for (let i = 0; i < columnNames.length; i++) {
    const newHeadCell = document.createElement('th')
    newHeadCell.innerHTML = columnNames[i]
    headerRow.appendChild(newHeadCell)
  }
}

// Fill Table Body
function fillTableBody () {
  let bodyRow
  // Loop through customer objects
  for (let a = 0; a < 25; a++) {
    bodyRow = tableBody.insertRow()
    // Loop through customer properties
    for (let b = 0; b < customerProperties.length; b++) {
      const newTableCell = document.createElement('td')
      newTableCell.innerHTML = pageData[a][customerProperties[b]]
      bodyRow.appendChild(newTableCell)
    }
  }
}

// Clear Table of all Customer Inforation
function clearTable () {
  for (let i = 0; i < 26; i++) {
    table.deleteRow(-1)
  }
}

// Build Table by clearing, then filling
function constructTable () {
  clearTable()
  fillTableHeader()
  fillTableBody()
}
