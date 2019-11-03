<?php 
// Ini adalah file untuk membuat endpoint dari tabel Mahasiswa

use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Mahasiswa extends CI_Controller {
    
    // wajib ini ditambahkan
    use REST_Controller {
        REST_Controller::__construct as private __resTraitConstruct;
    }

    public function __construct(){
        // wajib ditambahkan
        parent::__construct();
        $this->__resTraitConstruct();

        // model
        $this->load->model('Mahasiswa_model', 'mahasiswa');

        // limit pengaksesan api
        $this->methods['index_get']['limit'] = 2;
    }

    public function index_get(){

        // mengecek ketersediaan 'id' di request, tidak ditaruh di method karena bukan URL
        $id = $this->get('id');
        
        if ($id == null) {
            $mahasiswa = $this->mahasiswa->getMahasiswa();
        } else {
            $mahasiswa = $this->mahasiswa->getMahasiswa($id);
        }
        
        if ($mahasiswa) {
            $this->response([
                'status' => true,
                'data' => $mahasiswa
            ], 200); // HTTP_OK
        } else {
            $this->response([
                'status' => false,
                'message' => 'ID Not Found'
            ], 404); // HTTP_NOT_FOUND
        }
    }

    public function index_delete(){

        $id = $this->delete('id');

        if ($id == null) {
            $this->response([
                'status' => false,
                'message' => 'Provide an ID!'
            ], 400); // HTTP_BAD_REQUEST
        } else {
            if ($this->mahasiswa->deleteMahasiswa($id) > 0) {
                // OK
                $this->response([
                    'status' => true,
                    'id' => $id,
                    'message' => 'DELETED!'
                ], 200); // HTTP_OK
            } else {
                // ID Not Found
                $this->response([
                    'status' => false,
                    'message' => 'ID Not Found'
                ], 404); // HTTP_NOT_FOUND
            }
            
        }   
    }

    public function index_post(){
        // asumsikan data yang didapatkan sudah bagus
        $data = [
            'nrp' => $this->post('nrp'),
            'nama' => $this->post('nama'),
            'email' => $this->post('email'),
            'jurusan' => $this->post('jurusan')
        ];

        if($this->mahasiswa->createMahasiswa($data) > 0){
            // OK
            $this->response([
                'status' => true,
                'message' => 'New Mahasiswa has been created.'
            ], 201); // HTTP_CREATED
        } else {
            $this->response([
                'status' => false,
                'message' => 'Failed to create new data!'
            ], 400); // HTTP_BAD_REQUEST
        }
    }

    public function index_put(){
        $id = $this->put('id');
        $data = [
            'nrp' => $this->put('nrp'),
            'nama' => $this->put('nama'),
            'email' => $this->put('email'),
            'jurusan' => $this->put('jurusan')
        ];

        if($this->mahasiswa->updateMahasiswa($data, $id) > 0){
            // OK
            $this->response([
                'status' => true,
                'message' => 'Data Mahasiswa has been updated.'
            ], 200); // HTTP_OK
        } else {
            $this->response([
                'status' => false,
                'message' => 'Failed to update data!'
            ], 400); // HTTP_BAD_REQUEST
        }
    }
}

?>