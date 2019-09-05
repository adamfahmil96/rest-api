// Mengubah Object menjadi JSON

let mahasiswa = {
    nama    : "Muhammad Adam",
    nim     : "M0514031",
    email   : "adamfahmil020@gmail.com"
}
console.log(JSON.stringify(mahasiswa));

// Mengubah JSON menjadi Object, pakai XMLHttpRequest

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) { // cek apabila ajax sudah siap
        let mahasiswa = JSON.parse(this.responseText); // mengambil hasil dari ajax, lalu di-parse untuk mengubah menjadi Object
        console.log(mahasiswa);
    }
}
// membuka ajax
xhr.open('GET','coba.json',true); // true --> asynchronous
xhr.send();

// Mengubah JSON menjadi Object, pakai JQuery

// lakukan ajax untuk mengambil data JSON
// lalu otomatis di-parsing, lalu dimasukkan ke dalam variabel 'data'
$.getJSON('coba.json', function (data) {
   console.log(data);
});