<template>
<div>
<!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Reservasi Kamar</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
  
      <!-- Main content -->
      <div class="content">
          <b-container class="bv-example-row">
            <b-overlay :show="loading" rounded="sm">
            <b-row class="mb-3">
              <b-col>
                <b-button @click="filter_lantai('loby')"  variant="secondary">
                    Lobi
                </b-button>
                <b-button @click="filter_lantai(1)"  variant="secondary">
                    Lantai 1
                </b-button>
                <b-button @click="filter_lantai(2)"  variant="secondary">
                    Lantai 2
                </b-button>
                <b-button @click="filter_lantai(3)"  variant="secondary">
                    Lantai 3 / VIP
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4>{{ lantai }}</h4>
              </b-col>
            </b-row>
            <b-row style="border:solid" v-if="lantai=='loby'">
              <b-row class="mb-5" >
                <b-col class="m-3" style="border:solid">
                    <i class="fa-solid fa-handshake"></i> Meeting Room
                |
                <i class="fa-solid fa-elevator"></i> Lift
                </b-col>
                <b-col class="m-3"><i class="fa-solid fa-door-open"></i> Pintu keluar</b-col>
                <b-col class="m-3" style="border:solid">
                  <i class="fa-solid fa-handshake"></i> Meeting room
                  |
                  <i class="fas fa-toilet-paper"></i> Toilet 
                </b-col>
              </b-row>
              <b-row>
                <b-col class="m-3" style="border:solid"><i class="fas fa-chair"></i> Ruang tunggu</b-col>
                <b-col class="m-3"><i class="fa-solid fa-door-open"></i>Pintu Masuk</b-col>
                <b-col class="m-3" style="border:solid"><i class="fa fa-user" aria-hidden="true"></i> Resepsionis</b-col>
              </b-row>
            </b-row>

            <!-- Kamar -->
            <b-row style="border:solid" v-if="lantai!='loby'">
              <b-col  class="m-2">
                <!-- Baris atas -->
                <b-row class="mb-5" cols="2">
                  <b-col cols="3" class="m-1" v-for="(item,index) in kamar_kiri" :key="item.uniqid">
                    <b-button v-if="item.status==0" @click="pilih_kamar(index)"  variant="success" v-b-modal.modal-kamar>
                      <p>{{item.no_kamar}}</p>
                    </b-button>
                    <b-button v-else variant="danger">
                      <p>{{item.no_kamar}}</p>
                    </b-button>
                  </b-col>
                </b-row> 
              </b-col>
              <b-col class="m-2">
                <!-- Baris tengah -->
                <b-row class="mb-5" cols="2">
                  <b-col class="m-1" cols="3" v-for="(item,index) in kamar_kanan" :key="item.uniqid">
                    <b-button v-if="item.status==0" @click="pilih_kamar(index)"  variant="success" v-b-modal.modal-kamar>
                      <p>{{item.no_kamar}}</p>
                    </b-button>
                    <b-button v-else variant="danger">
                      <p>{{item.no_kamar}}</p>
                    </b-button>
                  </b-col>
                </b-row> 
              </b-col>
            
            </b-row>

            <b-row style="border:solid" v-if="lantai!='loby'">
              <b-col class="m-3" ><i class="fa-solid fa-elevator"></i> Lift</b-col>
              <b-col class="m-3"><span v-if="lantai==1"><i class="fa-solid fa-door-open"></i>Pintu Masuk</span></b-col>
              <b-col class="m-3"><i class="fa-solid fa-stairs"></i> Tangga</b-col>
            </b-row>

             <b-modal id="modal-kamar" @ok="pilih_reservasi()" title="Detail Kamar" >
                          <b-row class="mb-3">
                              <b-col>
                                  <p>Kamar : {{data_reservasi.no_kamar}}</p>
                                  <p><b>{{data_reservasi.jenis}}</b></p>
                                  <p>Lantai : {{data_reservasi.lantai}}</p>
                                  <p>Rp. {{data_reservasi.harga|currency}},-</p>
                                  Tanggal masuk<b-form-datepicker
                                    locale="id"
                                    v-model="data_reservasi.waktu_masuk"
                                  ></b-form-datepicker>
                                  Tanggal Keluar <b-form-datepicker
                                    locale="id"
                                    v-model="data_reservasi.waktu_keluar"
                                  ></b-form-datepicker>
                                  <h3> Total = Rp.{{grand_total|currency}} </h3>
                                  <br>
                                  Waktu Check-in maksimal pukul 14.00 dan Check-out 12.00
                              </b-col>
                          </b-row>
                          <b-row>
                              <b-col>
                                  <h3>Fasilitas Tersedia</h3>
                                  <p><i class="fa fa-bed" aria-hidden="true"></i> Tempat Tidur tersedia : {{data_reservasi.tempat_tidur}} Bed</p>
                                  <p><i class="fa fa-wifi" aria-hidden="true"></i> Free Wi-Fi</p>
                                  <p><i class="fas fa-parking"></i> Parkir Luas</p>
                                  <p><i class="fa fa-user-police"></i> Security 24 jam</p>
                                  <p><i class="fas fa-tv"></i> TV tersedia</p>
                                  <p><i class="fas fa-smoking-ban"></i> Dilarang merokok</p>
                              </b-col>
                          </b-row>
                      <template #modal-footer="{ ok, cancel}">
      <b-button variant="success" @click="ok()">
        Pesan
      </b-button>
      <b-button variant="danger" @click="cancel()">
        Kembali
      </b-button>
      <!-- Button with custom close trigger value -->
    </template>

                      </b-modal>
                     
          
          
                </b-overlay>
          </b-container>
      </div>
      <!-- /.content -->    
</div>    
</template>


<script>
    
    module.exports =  {
      
        
        data () {
            return {
                loading:true,
                kamar_items:[],
                vip:[],
                reguler:[],
                data_reservasi:[],
                kamar:[],
                kamar_kiri:[],
                kamar_kanan:[],
                hari:1,
                lantai:1,
            }
        },
        computed: {
          grand_total(){
            var x=moment(this.data_reservasi.waktu_masuk)
            var y=moment(this.data_reservasi.waktu_keluar)
            var durasi=y.diff(x,'days')
            return durasi * this.data_reservasi.harga
          }
        },

        methods: {
            

            pilih_kamar(index){
                this.data_reservasi=this.kamar[index]
                this.data_reservasi.id_user=localStorage.id_user

            },

            pilih_reservasi(){
                Swal.fire({
  title: 'Apakah anda ingin reservasi kamar ini ?',
  showCancelButton: true,
  confirmButtonText: 'Pilih',
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    this.post_reservasi()
  } 
})

            },
            post_reservasi(){
                this.loading = true
                var data=this.data_reservasi
                data.harga=this.grand_total
            axios.post(base_url+"/Reservasi",Qs.stringify(data))
            .then(function (response) {
            Swal.fire('Reservasi Berhasil, data akan diverifikasi', '', 'success')
            v.nama_user=localStorage.getItem('nama_user')
            v.$router.push('/')
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Maaf Terjadi Kesalahan',
              html: err.response.data.status
            })
          })
          .finally(() => {
            this.loading = false
          });
            },
            filter_lantai(lantai){
              this.lantai=lantai
              this.showAll()
            },
            
            ketersediaan(status){
              this.kamar=_.filter(
              this.kamar_items, function(o) {
                if (status!=0) {
                  return o.status!=0
                }
                else{
                  return o.status==status;
                }
              })
              console.log(this.kamar)

            },

             showAll() {
        var start_index = this.indexAwal
        
        this.loading = true
        var _this=this

        axios.get(base_url + "M_kamar",{params:{'lantai':this.lantai}}).then(function (response) {

             // _this.rows = response.data.recordsTotal
              _this.kamar_items = response.data.data
              _this.kamar=_this.kamar_items
              //_this.ketersediaan(0)
              console.log(response.data.data) 
              _this.kamar_kiri = _.filter(
                _this.kamar,
                function (o) {
                  return o.letak=='kiri';
                }
              );
              _this.kamar_kanan = _.filter(
                _this.kamar,
                function (o) {
                  return o.letak=='kanan';
                }
              );
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Maaf Terjadi Kesalahan',
              text: 'Silahkan coba kembali'
            })
          })
          .finally(() => {
            this.loading = false
          });
      },
        
        },
        mounted () {
        this.showAll()
        }

    }
</script>

<style>
  .invisible {
    visibility: hidden;
  }
</style>