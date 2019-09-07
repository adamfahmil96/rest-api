// Sistem akan memanggil API apabila user mengklik button Search

function searchMovie() {
    $('#movie-list').html(''); // mengkosongkan list movie dulu, baru request, lalu tampilkan

    $.ajax({
        // mengakses API
        url: 'http://www.omdbapi.com/',
        type: 'GET',
        dataType: 'json',
        data: {
            'apikey': 'e0891497',
            's': $('#search-input').val()
        },
        // apabila berhasil, maka lakukan di bawah ini
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#modalDetail" data-id="`+ data.imdbID +`">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val(''); // menghapus input search
                
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">`+ result.Error +`</h1>
                    </div>
                `);
            }
        }
    });
}

// apabila user klik "Search", maka lakukan pencarian movie
$('#search-button').on('click', function () {
    searchMovie();
});

// apabila user tekan "Enter" di keyboard, maka lakukan pencarian movie
$('#search-input').on('keyup', function (e) {
    if (e.keyCode == 13) { // keycode 13 adalah "Enter"
        searchMovie();
    }
});

// JQuery carikan saya elemen "movie-list", lalu pada saat diklik elemen "see-detail" di dalam dari elemen "movie-list" (baik munculnya di awal atau nanti) maka jalankan fungsi di bawah ini
$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'GET',
        dataType: 'json',
        data: {
            'apikey': 'e0891497',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if(movie.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster+`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>`+ movie.Title+`</h3></li>
                                    <li class="list-group-item">Released: `+ movie.Released+`</li>
                                    <li class="list-group-item">Genre: `+ movie.Genre+`</li>
                                    <li class="list-group-item">Director: `+ movie.Director+`</li>
                                    <li class="list-group-item">Actors: `+ movie.Actors+`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});