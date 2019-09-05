<?php 

// Mengakses data dari array lalu diubah ke JSON

$mahasiswa = [
    [
        "nama"  => "Muhammad Adam",
        "nim"   => "M0514031",
        "email" => "adamfahmil020@gmail.com"
    ],
    [
        "nama"  => "Eva Nur",
        "nim"   => "G0116086",
        "email" => "evanur@gmail.com"
    ]
];
var_dump($mahasiswa);
$data = json_encode($mahasiswa);


// Mengakses data dari MySQL lalu diubah ke JSON

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "latihan-rest-api";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare('SELECT * FROM mahasiswa');
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $data = json_encode($result);
    echo $data;
} catch (PDOException $e) {
    echo "Connection failed: ". $e->getMessage();
}

?>