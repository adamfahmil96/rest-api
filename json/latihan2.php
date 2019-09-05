<?php 

// Mengambil data dari JSON lalu diubah ke array

$data = file_get_contents('coba.json');
$mahasiswa = json_decode($data, TRUE); // berubah menjadi array

var_dump($mahasiswa);

// mengambil salah satu value
echo $mahasiswa[0]["pembimbing"]["pembimbing1"];
?>