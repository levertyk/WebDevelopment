<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Validation</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="sassStyle.css">
    <link rel="stylesheet" href="index.css">

</head>
<body>

    <nav class="navbar fixed-top nav-dark bg-secondary text-light"><header>Server Validation Keenan Leverty - HW 3.3 - My SQL</header></nav>

    <div class="container">
        <!-- This duplicates the page-header from Bootstrap 3 (but in bootstrap 4) -->
        <header class="pb-2 mt-4 mb-2 border-bottom">
            <h1>Form Validation <small class="subtitle">Using My SQL</small></h1>
        </header>

        <section>
            <h3></h3>
<?php
    // Connect to the Server
    $db = new mysqli("144.13.22.52", "webUser", "1788af70-e0ec-4640-9511-2d9aabb4a1dd", "simpsons");

    // Check Connection
    if($db->connect_error) {
        echo "<p><strong>Connection Error: </strong>$db->connect_error</p>\n";
    } else {
        echo "<p><strong>Connection Successful</strong></p>\n";
    }

    // Check Method Used and that Name, Email and Password are present
    if(empty($_POST)) {
        echo "<p class=\"alert alert-danger\">Incorrect Method Used</p>";
    } else if (!isset($_POST['firstName']) || !isset($_POST['Email']) || !isset($_POST['Password'])) {
        echo "<p class=\"alert alert-danger\">Name, Email or Password not supplied.</p>";
    } else {
        $email = $_POST['Email'];
        $name = $_POST['firstName'];
        $password = $_POST['Password'];
        
        // Prepare Query
        $query = "SELECT students.name, students.password FROM students WHERE students.email = ?;";
        $stmt = $db->prepare($query);
        if (!$stmt) {
            echo "<p class=\"alert alert-danger\"><strong>Query Error: </strong>$db->error</p>\n";
        }

        // Bind Params
        $stmt->bind_param("s", $email);

        //Esecute Statement
        if (!$stmt->execute()) {
            echo "<p class=\"alert alert-danger\"><strong>Execution Error: </strong>$stmt->error</p>\n";
        }

        //Store Results
        $stmt->store_result();
        if ($stmt->num_rows < 1) {
            echo "<p class=\"alert alert-danger\"><strong>Error: </strong>No Rows Returned</p>\n";
        }

        // Bind Results
        if (!$stmt->bind_result($studentName, $studentPassword)) {
            echo "<p class=\"alert alert-danger\"><strong>Binding Error: </strong>$stmt->error</p>\n";
        }

        // Fetch and Compare
        if ($stmt->fetch() && $password === $studentPassword) {
            echo "<p class=\"alert alert-success\">Welcome $name</p>";
        } else {
            echo "<p class=\"alert alert-danger\">PASSWORDS DONT MATCH</p>";
        }
    }

    //Close Database
    $db->close();
?>

        </section>
    </div>

    <nav class="navbar fixed-bottom navbar-light bg-secondary text-light"><footer>For CS 248 at UW Stout | &copy; 2020 <b>Keenan Leverty</b></footer></nav>

    <!-- Bootstrap JS, with dependencies Popper.js and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>
</html>
