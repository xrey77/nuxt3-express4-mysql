<template>
    <div class="modal fade" id="registerBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="registerBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header bg-primary">
            <h1 class="modal-title fs-5 text-white" id="registerBackdropLabel">User's Registration</h1>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

            <form @submit="submitRegistration">
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <input type="text" v-model="firstname" class="form-control" name="firstname" placeholder="enter First Name" autocomplete="off" required />
                        </div>

                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <input type="text" v-model="lastname" class="form-control" name="lastname" placeholder="enter Last Name" autocomplete="off" required />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <input type="email" v-model="emailadd" class="form-control" name="emailadd" placeholder="enter First Email Address" autocomplete="off" required />
                        </div>

                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <input type="text" v-model="mobileno" class="form-control" name="mobileno" placeholder="enter Mobile No." autocomplete="off" required />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <input type="text" v-model="username" class="form-control" name="username" placeholder="enter Username" autocomplete="off" required />
                        </div>

                    </div>
                    <div class="col">
                        <div class="mb-3">
                            <input type="password" v-model="pwd" class="form-control" name="password" placeholder="enter Password" autocomplete="off" required />
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">register</button>
            </form>

        </div>
        <div class="modal-footer">
            <div id="msg" class="w-100 text-center text-danger msg">{{ msg  }}</div>
        </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
  .msg {
    font-size: 12px;
  }
</style>

<script>
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
})

export default {
    name: 'Register',
    data() {
        return {
            firstname: null,
            lastname: null,
            emailadd: null,
            mobileno: null,
            username: null,
            pwd: null,
            msg: null
        }
    },
    methods: {
        async submitRegistration(e) {
            e.preventDefault();
            const data =JSON.stringify({
                lastname: this.lastname,
                firstname: this.firstname,
                email: this.emailadd,
                mobile: this.mobileno,
                username: this.username,
                password: this.pwd })
            await api.post(`/api/auth/signup`, data)
            .then(res => {
                if (res.data.statuscode == 200) {
                    this.msg = res.data.message;
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else {
                    this.msg = res.data.message;
                }
            }, (error) => {
                this.msg = error.message;
            });
        }
    }
}
</script>