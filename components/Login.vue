<template>
 <div>
    <Mfa/>
    <div class="modal" id="loginBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="loginBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-danger">
            <h1 class="modal-title fs-5 text-white" id="loginBackdropLabel">User's Login</h1>
            <button id="modalx" type="button" class="btn-close btn-close-white"  data-bs-dismiss="modal" aria-label="Close"/>
        </div>
        <div class="modal-body">

            <form accept-charset="UTF-8" @submit="submitLogin" method="POST">
                <div class="mb-3">
                    <input type="text" class="form-control"  placeholder="enter username" v-model="username" autocomplete="off" required >
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control" placeholder="enter password" v-model="password" autocomplete="off"  required >
                </div>
                <button type="submit" class="btn btn-danger">login</button>
            </form>
            
        </div>
        <div class="modal-footer">
            <div id="msg" class="w-100 text-center text-danger msg">{{ msg }}</div>
        </div>
        <button id="otp" type="button" class="btn btn-hide" data-bs-toggle="modal" data-bs-target="#mfaBackdrop"/>

        </div>
    </div>
    </div>
 </div>
</template>

<style scoped>
 .msg {
    font-size: 12px;
 }
 .btn-hide {
    visibility: hidden;
 }
</style>


<script>
import axios from 'axios'
import { setData } from 'nuxt-storage/local-storage';
import Mfa from './Mfa.vue';
import $ from 'jquery/dist/jquery';

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default {
    name: 'Login',
    components: {
        Mfa,
    },
    data() {
        return {
            username: null,
            password: null,
            msg: null
        }
    },
    methods: {
        submitLogin: async function(e) {
            e.preventDefault()
            const data =JSON.stringify({
                username: this.username,
                password: this.password});
            await api.post(`/api/auth/signin`, data)
                .then(res => {
                    if (res.data.statuscode == 200) {
                        this.msg = res.data.message;
                        if (res.data.mfa == 0) {
                            setData('USERID', res.data.user.id)
                            setData('USERNAME', res.data.user.username)
                            setData('TOKEN', res.data.user.token)
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        } else {
                            $(document).ready(function(){ 
                                $('#modalx')[0].click(); 
                                $('#otp')[0].click(); 
                            });
                            setData('USERID', res.data.user.id)
                            setData('TOKEN', res.data.user.token)
                            // var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('loginBackdrop'));
                            // myModal.hide();

                            // const truck_modal = document.querySelector('#loginBackdrop');
                            // const modal = new bootstrap.Modal(truck_modal, {
                            //     backdrop: 'static'
                            // });
                            // modal.hide();
                        }

                    } else {
                        this.msg = res.data.message;
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                }, (error) => {
                   this.msg = error.message;
                });                

        },
        // closeModal() {
        //     window.location.reload()
        //     $("#loginBackdrop").modal('close');
        // }
    }
}
</script>

<!-- api.post(`/api/register/`, data,{headers: {
    Authorization: `Bearer ${this.token}`
}}) -->

