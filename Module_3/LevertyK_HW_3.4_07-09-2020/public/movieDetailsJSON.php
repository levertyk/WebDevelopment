<?php

    // Let the browser know we are returning JSON instead of HTML
    header('content-style: application/json;');

    // Make sure the required id was provided
    if(!isset($_GET['id'])) { die('No ID provided'); }

    // Get ID of movie from form GET data
    $movieId = $_GET['id'];

    // 1. CONNECT to the database
    $db = new mysqli("144.13.22.52", "webUser", "1788af70-e0ec-4640-9511-2d9aabb4a1dd", "myflix3");
    if ($db->connect_error) { die("DB connection failed\n"); }

    // 2. PREPARE the Query
    $query = "SELECT * FROM movies WHERE movies.id=?;";
    $stmt = $db->prepare($query);
    if (!$stmt) {
        die("Query Error");
    }

    if (!$stmt->bind_param("s", $movieId)) {
        die("Bind Error");
    }

    // 3. RUN the Query
    if (!$stmt->execute()) {
        die("Execution Error");
    }

    // 4. BIND/RETRIEVE the results
    $result = $stmt->get_result();
    if (!$result || $result->num_rows != 1) {
        die("Result Error");
    }

    // 5. FETCH the data and encode as JSON
    echo json_encode($result->fetch_assoc());


    // Clean up
    $db->close();
    $query->close();
    $stmt->close();
?>