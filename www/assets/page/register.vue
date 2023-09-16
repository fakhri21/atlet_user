<template>
<div class="login-box">
          <div class="login-logo">
            <img src="img/logo.jpeg" height="100%" width="50%">
           <p>Register</p>
          </div>
          <!-- /.login-logo -->
          <div class="card">
            <div class="card-body login-card-body">
              <b-row>
                <b-col>
                       <b-form-input v-model="nik"
                                    type="text"
                                    placeholder="No. KTP"
                      ></b-form-input>
                       <b-form-input v-model="nama_depan"
                                    type="text"
                                    placeholder="Nama Depan"
                                    
                      ></b-form-input>
                       <b-form-input v-model="nama_belakang"
                                    type="text"
                                    placeholder="Nama Belakang"
                                    
                      ></b-form-input>
                       <b-form-input v-model="no_hp"
                                    type="text"
                                    placeholder="No. Handphone"
                                    
                      ></b-form-input>
                       <b-form-input v-model="email"
                                    type="email"
                                    placeholder="Email"
                                    
                      ></b-form-input>
                       <b-form-input v-model="password"
                                    type="password"
                                    placeholder="password"
                                    
                      ></b-form-input>
                </b-col>
              </b-row>
                <div class="row">
                  <!-- /.col -->
                  <div class="col-4">
                    <button @click="register()" class="btn btn-primary btn-block">Register</button>
                  </div>
                  <!-- /.col -->
                </div>
            </div>
            <!-- /.login-card-body -->
          </div>
        </div>
        <!-- /.login-box -->

</template>

<script>
module.exports = {
    computed: {
      data_login() {
        return Qs.stringify({username:this.username,password:this.password})
      },
      
    },
    created() {
        
    },
    data: function(){
      return{
  
        title : 'Login',
        gambar : 'img/visimisi.png',
        loading:false,
        
        nik:'',
        nama_depan:'',
        nama_belakang:'',
        no_hp:'',
        email:'',
        password:''
  
      }
    },

  
    methods: {
            goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
        },
        register(){
            this.loading = true
            var data_register=Qs.stringify({
              no_ktp:this.nik,
              first_name:this.nama_depan,
              last_name:this.nama_belakang,
              no_hp:this.no_hp,
              email:this.email,
              password:this.password
            })
            axios.post(base_url+"api/auth/register",data_register)
            .then(function (response) {
              Swal.fire('Registrasi Berhasil', '', 'success')
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
        }
        
  
      },
  }


</script>