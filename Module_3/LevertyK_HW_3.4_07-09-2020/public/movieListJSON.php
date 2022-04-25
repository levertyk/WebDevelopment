<?php

    // Let the browser know we are returning JSON instead of HTML
    header('content-type: application/json;');

    // Retrieve all expected GET query-string parameters
    $orderBy = $_GET['orderBy'];
    $limit = $_GET['limit'];
    $offset = $_GET['offset'];

    if ($orderBy == 'none') {
        $orderBy = 'genres';
    }

    // 1. CONNECT to the DB
    $db = new mysqli("144.13.22.52", "webUser", "1788af70-e0ec-4640-9511-2d9aabb4a1dd", "myflix3");
    if ($db->connect_errno) { die("DB connection failed\n"); }

    // 2. PREPARE the query
    $query = "SELECT movies.id, movies.title, movies.genres, movies.image, movies.content_rating, movies.year FROM movies ORDER BY $orderBy LIMIT $offset, $limit;";
    $stmt = $db->prepare($query);
    if (!$stmt) {
        die("Query Error");
    }

    // 3. RUN the query
    if (!$stmt->execute()) {
        die("Execution Error");
    }

    // 4. BIND/RETRIEVE the results
    $result = $stmt->get_result();
    if (!$result || $result->num_rows < 1) {
        die("Result Error");
    }

    // 5. FETCH the data and encode as JSON
    echo "[\n";
    for ($i = 0; $i < $result->num_rows; $i++) {
        if ($i > 0) { echo ",\n"; }
        $movieData = $result->fetch_assoc();
        echo "    ", json_encode($movieData);
    }
    echo "\n]\n";

    // Clean up
    $db->close();
    $query->close();
    $stmt->close();
?>
