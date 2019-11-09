<?php

require 'vendor/autoload.php';

// membuat client
//// memakai namespace
use GuzzleHttp\Client;
//// lakukan inisialisasi objek
$client = new Client();
 
// mengirimkan request
$response = $client->request('GET','http://www.omdbapi.com/', [
    //// parameternya query kalau mau lewat 'params'
    'query' => [
        'apikey' => 'e0891497',
        's' => 'transformers'
    ]
]);

$result = json_decode($response->getBody()->getContents(), true);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Movie</title>
</head>
<body>
    <?php foreach ($result['Search'] as $movie): ?>
    <ul>
        <li>Title: <?= $movie['Title']; ?></li>
        <li>Year : <?= $movie['Year']; ?></li>
        <li>
            <img src="<?= $movie['Poster']; ?>" width="80">
        </li>
    </ul>
    <?php endforeach; ?>
</body>
</html>