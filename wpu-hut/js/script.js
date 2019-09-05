function tampilkanSemuaMenu() {
    $.getJSON('data/pizza.json', function (data) {
        
        let menu = data.menu; // menghilangkan indeks menu
        
        // looping pada jquery terhadap object
        $.each(menu, function(i, data){
            $('#daftar-menu').append('<div class="col-md-4"><div class="card mb-3"><img src="img/menu/'+ data.gambar+'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama+'</h5><p class="card-text">'+ data.deskripsi+'</p><h5 class="card-title">Rp. '+ data.harga+',-</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>');
        });
    });
}

tampilkanSemuaMenu(); // menampilkan default awal

// JQuery tolong carikan saya elemen yang nama kelas "nav-link"

$('.nav-link').on('click', function () {
    // hilangkan semua kelas 'active'
    $('.nav-link').removeClass('active');
    // khusus kelas yang diklik, maka
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h1').html(kategori);


    if (kategori == 'All Menu') {
        tampilkanSemuaMenu();
        return;
    }

    $.getJSON('data/pizza.json', function (data) {
       let menu = data.menu;
       let content = '' ;

       $.each(menu, function(i, data){
            if (data.kategori == kategori.toLowerCase()) {
                content += '<div class="col-md-4"><div class="card mb-3"><img src="img/menu/'+ data.gambar+'" class="card-img-top"><div class="card-body"><h5 class="card-title">'+ data.nama+'</h5><p class="card-text">'+ data.deskripsi+'</p><h5 class="card-title">Rp. '+ data.harga+',-</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>';
            }
       });

       $('#daftar-menu').html(content);
    });
})