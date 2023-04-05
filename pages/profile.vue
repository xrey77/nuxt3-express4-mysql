<template>
 <div class="card profile-card">
  <div class="card-header bg-primary">
    <h5 class="text-white">User Profile No. {{ idno }}</h5>
  </div>
  <div class="card-body">
    <form @submit="submitProfile" enctype="multipart/form-data" method="PUT">
        <div class="row">
            <div class="col col-9">
                <div class="mb-3">
                    <label for="fname" class="form-label fontsize-12">First Name</label>
                    <input type="text" class="form-control" id="fname" v-model="fname" required>
                </div>
                <div class="mb-3">
                    <label for="fname" class="form-label fontsize-12">Last Name</label>
                    <input type="text" class="form-control" id="fname" v-model="lname" required>
                </div>
            </div>
            <div class="col">
                
                <nuxt-img id="pic" class="user rounded" v-bind:src="`${userpic}`"/>
                <input @change="changePicture" class="form-control form-control-sm" id="userpic" name="userpic" type="file" accept=".jpeg,.jpg,.png,image/jpeg,image/png">

            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="fname" class="form-label fontsize-12">Email Address</label>
                    <input type="email" class="form-control" id="emailadd" v-model="email" readonly>
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="fname" class="form-label fontsize-12">Mobile No.</label>
                    <input type="text" class="form-control" id="mobileno" v-model="mobile" required>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="form-check">
                    <input  @change="changePassword($event.target.value)" class="form-check-input" type="checkbox" v-model="chgpwd" id="chgpwd">
                    <label class="form-check-label" for="flexCheckDefault">
                        Change Password
                    </label>
                </div>
            </div>
            <div class="col">
                <div class="form-check">
                    <input @change="twoFactor($event)" class="form-check-input" type="checkbox" v-model="totp" id="otp">
                    <label class="form-check-label" for="flexCheckDefault">
                        2-Factor Authenticator
                    </label>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col">
                <!-- CHANGE PASSWORD -->
                <div v-if="showChgPwd">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="newpwd" v-model="newpwd" placeholder="New Password">
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" id="confpwd" v-model="confpwd" placeholder="Confirm New Password">
                    </div>
                </div>                
                <div v-if="showTotp">
                    <img class="qrcode1" src="/images/qrcode.png" alt="QRCODE"/>
                </div>
            </div>
            <div class="col">
            <!-- 2-FACTOR AUTHENTICATION -->
              <div v-if="showTotp">
                <p class="qr-fontsize">Please install Microsoft or Google Authenticator Application from your Mobile Phone, after installation, click Enable Button below and Scan QRCODE using your Authenticator Application, everytime you Log-In to this Web Application, you have to open your Mobile Authenticator and enter OTP code from your Mobile Authenticator.</p>
                <button class="btn btn-success">Enable</button>
                <button class="btn btn-secondary ml">Disable</button>
              </div>
            </div>

        </div>

        <button type="submit" class="btn btn-primary save">save</button>
    </form>
</div>
<div class="card-footer text-danger fontsize-12">{{ msg }}</div>
 </div>
</template>

<script>
import axios from 'axios';
import { getData } from 'nuxt-storage/local-storage';

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
});

export default {
    name: 'Profile',
    data() {
        return {
            idno: null,
            fname: null,
            lname: null,
            email: null,
            mobile: null,
            newpwd: null,
            confpwd: null,
            msg: null,
            chgpwd: null,
            totp: null,
            token: null,
            userpic: null,
            newpic: null,
            showChgPwd: false,
            showTotp: false,
        }        
    },
    mounted() {
        this.idno = getData('USERID');
        this.token = getData('TOKEN');
        this.getuser();
    },
    methods: {
        submitProfile: async function(e) {
            e.preventDefault();
            if (this.chgpwd) {
                if (this.newpwd == '' || this.confpwd == '') {
                    this.msg = "You have checked the Change Password checkbox, please enter your new password.";
                    window.setTimeout(() => {
                        this.msg = '';
                    }, 3000);
                    return;
                }
                if (this.newpwd !== this.confpwd) {
                    this.msg = "Password does not match.";
                    window.setTimeout(() => {
                        this.msg = '';
                    }, 3000);
                    return;
                }
            }
            const data =JSON.stringify({
                lastname: this.lname,
                firstname: this.fname,
                mobile: this.mobile,
                password: this.newpwd});

            await api.put(`/api/users/updateuser?id=${this.idno}`,data, {headers: {
                Authorization: `Bearer ${this.token}`}})
                .then(res => {
                    if (res.data.statuscode == 200) {
                        this.msg = res.data.message;
                    } else {
                        this.msg = res.data.message;
                    }
                }, (error) => {
                    this.msg = error;
                });        
                        
        },
        changePassword: function() {
            if (this.chgpwd) {
                if (this.showTotp) {
                    this.showTotp = false;
                    this.totp = '';
                }
                this.showChgPwd = true;
            } else {
                this.showChgPwd = false;
            }
        },
        twoFactor: function() {
            if (this.totp) {
                if (this.showChgPwd) {
                    this.chgpwd = '';
                    this.showChgPwd = false;
                    this.newpwd = '';
                    this.confpwd = '';
                }
                this.showTotp = true;
            } else {
                this.showTotp = false;
            }
        },
        getuser: async function(){
            await api.get(`/api/users/getuser?id=${this.idno}`, {headers: {
                Authorization: `Bearer ${this.token}`
            }})
            .then(res => {
                    if (res.data.statuscode == 200) {
                        this.fname = res.data.user[0].firstname;
                        this.lname = res.data.user[0].lastname;
                        this.email = res.data.user[0].email;
                        this.mobile = res.data.user[0].mobile;
                        this.userpic = res.data.user[0].picture;
                    } else {
                        this.msg = res.data.message;
                    }
            }, (error) => {
                this.msg = error;
            });        
        },
        convertToBase64: async function(file, cb) {
            var reader = new FileReader();
            reader.onload = function (e) {
                cb(null, e.target.result)
            };
            reader.onerror = function (e) {
                cb(e);
            };
            reader.readAsDataURL(file);
        },        
        updatepicture: async function(base64) {
                               
        },
        changePicture: async function(e) {
            e.preventDefault();
            this.userpic = URL.createObjectURL(e.target.files[0]);
            let imgFile = e.target.files[0];



            this.convertToBase64(imgFile,  function(err, data) {
                if (err) {
                    this.msg = err;
                    console.log(err);
                    return;
                }
                let idno = getData('USERID');
                const jsondata = JSON.stringify({userpic: data});
                    api.post(`/api/users/uploadpicture?idno=${idno}`, jsondata, {headers: {
                    'Content-Type': 'application/json'}})
                    .then(res => {
                        if (res.data.statuscode == 200) {
                            this.msg = res.data.message;
                        } else {
                            this.msg = res.data.message;
                        }
                    }, (error) => {
                        this.msg = error;
                    });                   

            });
            console.log("here...");



        }        
    }
}
</script>