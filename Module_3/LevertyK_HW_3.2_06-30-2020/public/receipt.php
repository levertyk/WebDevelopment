<?php
function outputError($title, $message) {
    echo <<<EOF
    <div class="card bg-warning">
        <div class="card-header">$title:</div>
        <div class="card-body">$message</div>
    </div>
    EOF;
}

function moneyRound($amount) {
    return number_format(ceil($amount * 100.00) / 100, 2, ".", ",");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Pizza Receipt</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="sassStyle.css">
    <link rel="stylesheet" href="index.css">

</head>
<body>

    <nav class="navbar fixed-top nav-dark bg-secondary text-light"><header>Keenan Leverty - HW 3.2 - Advanced PHP</header></nav>

    <div class="container">
        <!-- This duplicates the page-header from Bootstrap 3 (but in bootstrap 4) -->
        <header class="pb-2 mt-4 mb-2 border-bottom">
            <h1>Pizza Receipt <small class="subtitle">Thank you for buying the goods</small></h1>
        </header>

        <section>

<?php
    //Check Request Method and that required data is present
    if(empty($_POST)) {
        outputError('Method Error', 'Incorrect Method Used');
    } else if (!isset($_POST['size']) || !isset($_POST['crustType'])) {
        outputError('Missing Data Error', 'Pizza Size and Crust Type are required to submit the order');
    } else {
        // Processing Data
        $size = $_POST['size'];
        $price = $_POST['price'];
        $crustType = $_POST['crustType'];
        $toppingsPremium = $_POST['toppingsPremium'];
        $toppingsStandard = $_POST['toppingsStandard'];
        $charityRound = $_POST['charityRound'];
        $priceTotal;

        switch ($size) {
            case "12in":
                $price = 9.99;
            break;
            case "14in":
                $price = 15.99;
            break;
            default:
                $price = 18.99;
        }

        // Size and Base Price
        echo "<h3>$size $crustType pizza<span class=\"float-right\">\$$price</span></h3>";

        // Toppings
        echo "<p class=\"pl-5\">";

            for ($i = 0; $i < count($toppingsPremium); $i++) {
                echo "$toppingsPremium[$i] <span class=\"float-right\">$2.50</span><br>";
                $price += 2.5;
            }

            for ($i = 0; $i < count($toppingsStandard); $i++) {
                echo "$toppingsStandard[$i] <span class=\"float-right\">$1.75</span><br>";
                $price += 1.75;
            }

        echo "</p>";

        // Subtotal
        echo "<h5>Subtotal<span class=\"float-right\">\$", moneyRound($price), "</span></h5>";

        // Tax
        echo "<h5>Tax<span class=\"float-right\">\$", moneyRound($price * .07), "</span></h5>";
        $priceTotal += moneyRound($price * 1.075);

        // Round Up Donation
        if(isset($_POST['charityRound'])) {
            echo "<h5>Charity Round<span class=\"float-right\">\$", moneyRound(ceil($priceTotal) - $priceTotal) - .01, "</span></h5>";
            $priceTotal += moneyRound(ceil($priceTotal) - $priceTotal) - .01;
        }

        // Total to Pay
        echo "<hr><h3>Total:<span class=\"float-right\">\$", moneyRound($priceTotal), "</span></h3>";
    }
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
