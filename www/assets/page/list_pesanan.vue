<template>
<div>
<!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">Daftar Pesanan Kantin</h1>
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
              <b-row mb-3>
                <b-col cols=4>
                   <b-form-input v-model="filter"
                                type="text"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                    <b-table striped hover
                           :items="pesanan_items"
                           :fields="fields"
                           :filter="filter"
                           stacked
                  >
                    <template #cell(status)="row">
                      <b-badge v-if="row.item.status==0" pill variant="warning">Belum Bayar</b-badge>
                      <b-badge v-else pill variant="success">Lunas</b-badge>
                    </template>
                    <template #cell(actions)="row">
                      <b-button size="sm" :to="'detail_pesanan/'+row.item.uniqid">Details</b-button>
                    </template>
                  </b-table>
                  <h4 v-if="pesanan_items.length==0">Belum ada pesanan</h4>
                </b-col>
              </b-row>                  
          </b-container>
      </div>
      <!-- /.content -->    
</div>    
</template>


<script>
    const formatTime = second => new Date(second * 1000).toISOString().substr(11, 8);

    module.exports = {

      data() {
        return {
          fields: [{
              key: 'no_pesanan',
              label: 'No Pesanan'
            },
            {
              key: 'no_kamar',
              label: 'No Kamar'
            },
            {
              key: 'waktu_pesanan',
              label: 'Waktu Pesanan'
            },
            {
              key: 'total',
              label: 'Total'
            },
            {
              key: 'status',
              label: 'Status'
            },
            {
              key: 'actions',
              label: 'Actions'
            }
          ],
          pesanan_items: [],
          filter:''

        }
      },

      methods: {
      
        showAll() {
          var start_index = this.indexAwal

          this.loading = true
          var _this = this

          axios.get(base_url + "Pesanan").then(function (response) {

              // _this.rows = response.data.recordsTotal
              _this.pesanan_items = response.data.data
              _this.pesanan_items = _.filter(_this.pesanan_items, ['id_user', localStorage.id_user]);

              console.log(response.data.data)
              console.log(_this.pesanan_items)
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
      mounted() {
        this.showAll()
      }

    }
</script>

<style>
  .invisible {
    visibility: hidden;
  }
</style>