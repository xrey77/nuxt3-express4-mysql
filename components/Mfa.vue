<template>
    <div>
       <div class="modal" id="mfaBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mfaBackdropLabel" aria-hidden="true">
       <div class="modal-dialog modal-sm modal-dialog-centered">
           <div class="modal-content">
           <div class="modal-header bg-warning">
               <h1 class="modal-title fs-5 text-white" id="mfaBackdropLabel">2-Factor Authentication</h1>
               <button @click="closeModal" type="button" class="btn-close btn-close-white"  data-bs-dismiss="modal" aria-label="Close"/>
           </div>
           <div class="modal-body">
   
               <form  accept-charset="UTF-8" @submit="submitOtp" method="POST">
                   <div class="mb-3">
                       <input type="number" class="form-control" placeholder="enter 6 digits OTP Code" v-model="otp" autocomplete="off" required >
                   </div>
                   <button type="submit" class="btn btn-warning text-white">submit</button>
               </form>
               
           </div>
           <div class="modal-footer">
               <div id="msg" class="w-100 text-center msg-fsize text-danger">{{ msg }}</div>
           </div>
           </div>
       </div>
       </div>
    </div>
   </template>
   
   <style scoped>
    .msg-fsize {
       font-size: 12px;
    }
   </style>
   
   
   <script>
   import axios from 'axios';
   import { setData, getData } from 'nuxt-storage/local-storage';
   
   const api = axios.create({
       baseURL: "http://localhost:3000",
       headers: {'Accept': 'application/json',
                 'Content-Type': 'application/json'}
   });
   
   export default {
       name: 'Mfa',
       data() {
           return {
               id: null,
               otp: null,
               msg: null
           }
       },
       mounted() {
        this.id = getData('USERID');
        this.msg="Get OTP Code from your Mobile Phone Autheticator.";
       },
       methods: {
           submitOtp: async function(e) {
               e.preventDefault()
               const data =JSON.stringify({
                   id: this.id,
                   otpcode: this.otp
               });

               await api.post('/api/users/validatetotp', data)
                   .then(res => {
                       if (res.data.statuscode == 200) {
                           this.msg = res.data.message;
                           setTimeout(() => {
                               window.location.reload();
                           }, 3000);
                       } else {
                           this.msg = res.data.message;
                           setTimeout(() => {
                              this.msg = "";
                           }, 3000);
                       }
                   }, (error) => {
                      this.msg = error.message;
                   });                
           },
           closeModal() {
                setData('USERNAME', null);
                setData('USERID', null);
                setData('TOKEN', null);
                setTimeout(() => {                    
                    window.location.reload();
                }, 3000);            
           }
       }
   }
   </script>