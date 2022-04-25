<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>LevertyK HW 3.1 06-28-2020</title>

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

		<!-- Our Custom CSS -->
		<link rel="stylesheet" href="sassStyle.css">
		<link rel="stylesheet" href="index.css">

	</head>
	<body>

		<nav class="navbar fixed-top nav-dark bg-secondary text-light"><header>Keenan Leverty - HW 3.1 - Basic PHP</header></nav>

		<div class="container pb-5">
			<!-- This duplicates the page-header from Bootstrap 3 (but in bootstrap 4) -->
			<header class="pb-2 mt-4 mb-2 border-bottom">
				<h1>PHP Basics <small class="subtitle">A simple list and simple table</small></h1>
			</header>

			<section>
                <!-- Clickable Header for collapsing section -->
				<h3 class="clickable" data-toggle="collapse" data-target="#listCollapse">Power of 2 list</h3>

<?php
    // Function to find powers base 2 based on index
    function generateListItems ($maxPower = 50, $base = 2) {
        for($i = 0; $i < $maxPower; $i++) {
            echo "<li class='list-group-item'>$base<sup>$i</sup> = ";
            echo number_format(pow($base, $i), 0, ".", ",");
            echo "</li>";
        }
    }

    // Output using function
    echo "<ol class='list-group collapse' id='listCollapse'>";
    generateListItems();
    echo "</ol";

?>
            </section>

            <hr>

            <section>
                <!-- Clickable header for collapsing section -->
                <h3 class="clickable" data-toggle="collapse" data-target="#tableCollapse">Table Generation</h3>

<?php
    // Specification of the amount idems to calculate up to
    $columns = 20;

    // Generate first row with labels of 1 to 20
    function generateHeaderRow ($columns) {
        echo "<tr><th></th>";

        for($i = 1; $i <= $columns; $i++) {
            echo "<th>$i</th>";
        }

        echo "</tr>";
    }

    // Generate one row given the row index
    function generateBodyRow ($rowNumber, $columns) {
        echo "<tr><th>$rowNumber</th>";

        for ($i = 1; $i <= $columns; $i++) {
            echo "<td>", str_pad($rowNumber * $i, 3, "0", STR_PAD_LEFT), "</td>";
        }

        echo "</tr>";
    }

    // Table set-up
    echo "<table class='table table-dark table-striped table-bordered collapse' id='tableCollapse'>";

    // Columns
    generateHeaderRow($columns);
    
    // Rows
    for($i = 1; $i <= $columns; $i++) {
        generateBodyRow($i, $columns);
    }

    // Closing
    echo "</table>";

?>

            </section>
		</div>

		<nav class="navbar fixed-bottom navbar-light bg-secondary text-light"><footer>For CS 248 at UW Stout | &copy; 2020 Keenan Leverty</footer></nav>

		<!-- Bootstrap JS, with dependencies Popper.js and jQuery -->
		<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
	</body>
</html>
