// Initialize Table Elements for global use
let table, tableHead, tableBody

// Array of strings to use for finding customer object properties
const customerProperties = ['firstName', 'lastName', 'email', 'phoneNumber', 'streetAddress', 'city', 'state', 'zip']

// JavaScript initialize after page load
function initialize () {
  // Referencing table and table elements
  table = document.getElementById('tableSection')
  tableHead = table.tHead
  tableHead.style.cursor = 'pointer'
  tableBody = table.tBodies[0]

  // Initial Construction of Table
  constructTable()
}

// Fill Table Header
function fillTableHeader () {
  const headerRow = tableHead.insertRow()

  for (let i = 0; i < columnNames.length; i++) {
    const newHeadCell = document.createElement('th')
    newHeadCell.innerHTML = columnNames[i]
    // Add Button Events
    newHeadCell.onclick = (e) => { sortTable(i) }
    headerRow.appendChild(newHeadCell)
  }
}

// Fill Table Body
function fillTableBody () {
  let bodyRow
  // Loop through customer objects
  for (let a = 0; a < customers.length; a++) {
    bodyRow = tableBody.insertRow()
    // Loop through customer properties
    for (let b = 0; b < customerProperties.length; b++) {
      const newTableCell = document.createElement('td')
      newTableCell.innerHTML = customers[a][customerProperties[b]]
      bodyRow.appendChild(newTableCell)
    }
  }
}

// Clear Table of all Customer Inforation
function clearTable () {
  for (let i = 0; i < customers.length + 1; i++) {
    table.deleteRow(-1)
  }
}

// Build Table by clearing, then filling
function constructTable () {
  clearTable()
  fillTableHeader()
  fillTableBody()
}

// Sort table using customer property based on column index
function sortTable (columnIndex) {
  const propertyString = String(customerProperties[columnIndex])

  customers.sort(
    (a, b) => {
      if (a[propertyString] > b[propertyString]) { return 1 }
      if (a[propertyString] < b[propertyString]) { return -1 }
      return 0
    }
  )

  // Reconstruct table with sorted data
  constructTable()
}
