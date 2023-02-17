<template>
<div class="card">
    <div class="card-header">
        <span class="text-white">

    Airport Fuel Inventory
        </span>
  </div>
  <div class="card-body">
    <h4>Login</h4>
    <form v-on:submit.prevent="loginUser()">
    <div class="my-3">
  <input type="email" class="input-field" placeholder="Email" v-model="loginForm.email">
</div>
<div class="mb-2">
 <input type="password" class="input-field" placeholder="Password" v-model="loginForm.password">
</div>
<div v-if="error">
<span class="text-danger">{{errorMessage}}</span>
</div>
<div class="py-3">

<button class="login-button text-white" v-bind:class="[submitting ? 'button-disable' : '']">Login
    <i class="fas fa-spinner fa-spin ml-1" v-if="submitting"></i>
</button>
</div>


    </form>
  </div>

</div> 
    
</template>

<script>
import axios from "axios";
import {baseUrl} from '../baseUrl/baseUrl';

export default {
   name: 'Login',
   data(){
    return {
        errorMessage: null,
        submitting: false,
        error: false,
        loginForm: {
            email: null,
            password: null
        }
    }
   },
   methods: {
    loginUser() {
        this.submitting = true;
        axios.post(`${baseUrl}/user/login`, this.loginForm)
        .then((res)=>{
          localStorage.setItem('token', res.data.token)
          this.$router.push('/airport')
        })
        .catch((err)=>{
             this.submitting = false;
            this.errorMessage = err.response.data.message;
            this.error = true;
        })
    }
   } 
}
</script>

<style scoped>
.card {
  width: 400px;  
  height: auto;
  margin: auto;
  margin-top: 10%;
}

.card-header {
   background-color: #367;
    padding: 9px;
    font-size: 18px;
}

.input-field {
      border-radius: 3px;
    border: 1px solid #bcb9b9;
    padding: 4px;
    width: 17rem;
}
</style>