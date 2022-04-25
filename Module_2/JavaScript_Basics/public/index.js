// Get main Div from DOM
const mainDiv = document.getElementById('mainContent')
mainDiv.innerHTML = '<p>Hello World</p>'

// Add scripts into Variables
const a = 7
const b = 100
const c = Math.floor(b / a)

const prefix = 'b / a = '
console.info(prefix + c)

// Make an array of table rows
const myRows = [
  '<tr><td>Seth</td><td>41</td></tr>',
  '<tr><td>Chris</td><td>22</td></tr>',
  '<tr><td>Monica</td><td>33</td></tr>'
]

// Long multi line string
let tableString = `
<table class="table table-striped">
  <tbody>
    '<tr><th>Name</th><th>Age</th></tr>'
`

function addRowToContent (row, i) {
  if (i >= 2) {
    tableString += row
  }
}

// Add Table Rows to String
myRows.forEach(addRowToContent)

tableString += `
  </tbody>
</table>
`

// Place Table in Content

mainDiv.innerHTML = tableString
