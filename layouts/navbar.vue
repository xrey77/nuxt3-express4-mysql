<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/"><img class="logo" src="/images/wincor.png" /></NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink class="nav-link active" to="/aboutus">About Us</NuxtLink>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul class="dropdown-menu">
                <li><NuxtLink class="dropdown-item" to="/services">Product Delivery</NuxtLink></li>
                <li><NuxtLink class="dropdown-item" to="/services">Home Service</NuxtLink></li>
                <li><hr class="dropdown-divider"></li>
                <li><NuxtLink class="dropdown-item" to="/services">Call Center</NuxtLink></li>
              </ul>
            </li>            
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Products
              </a>
              <ul class="dropdown-menu">
                <li><NuxtLink class="dropdown-item" to="/products">Electronics</NuxtLink></li>
                <li><NuxtLink class="dropdown-item" to="/products">Groceries</NuxtLink></li>
                <li><hr class="dropdown-divider"/></li>
                <li><NuxtLink class="dropdown-item" to="/products">Wears Clothings</NuxtLink></li>
              </ul>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link active" to="/contactus">Contact Us</NuxtLink>
            </li>
          </ul>
          <div v-if="username">          
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ username }}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a @click="logout" class="dropdown-item" href="#">Logout</a></li>
                      <li><NuxtLink class="dropdown-item" to="/profile">Profile</NuxtLink></li>
                      <li><hr class="dropdown-divider"/></li>
                      <li><NuxtLink class="dropdown-item" to="#">Messenger</NuxtLink></li>
                    </ul>
                  </li>                  
                </li>
              </ul>
            </div>
            <ul v-else class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="nav-link active" href="#" data-bs-toggle="modal" data-bs-target="#loginBackdrop">LogIn</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" href="#" data-bs-toggle="modal" data-bs-target="#registerBackdrop">Register</a>
                </li>              
            </ul>          
          </div>
      </div>
    </nav>
    <Login/>
    <Register/>
  </div>    
  <!-- DRAWER MENU -->
  <div class="offcanvas offcanvas-end bg-secondary xcanvas" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header bg-dark">
    <h5 class="offcanvas-title text-white" id="offcanvasScrollingLabel">MENU SELECTION</h5>
    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">

    <ul class="nav flex-column">
      <li data-bs-dismiss="offcanvas" class="nav-item">
        <NuxtLink class="nav-link text-white" to="/aboutus">About Us</NuxtLink>
      </li>
      <li class="nav-item">
        <hr class="text-white"/>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Services
        </a>
        <ul class="dropdown-menu">
          <li data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/services">Product Delivery</NuxtLink></li>
          <li data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/services">Home Service</NuxtLink></li>
          <li><hr class="dropdown-divider"></li>
          <li data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/services">Call Center</NuxtLink></li>
        </ul>
      </li>
      <li class="nav-item">
        <hr class="text-white"/>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Products
        </a>
        <ul class="dropdown-menu">
          <li data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/products">Electronics</NuxtLink></li>
          <li data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/products">Groceries</NuxtLink></li>
          <li data-bs-dismiss="offcanvas"><hr class="dropdown-divider"/></li>
          <li data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/products">Wears Clothings</NuxtLink></li>
        </ul>
      </li>
      <li class="nav-item">
        <hr class="text-white"/>
      </li>
      <li data-bs-dismiss="offcanvas" class="nav-item">
        <NuxtLink class="nav-link text-white" to="/contactus">Contact Us</NuxtLink>
      </li>
      <li class="nav-item">
        <hr class="text-white"/>
      </li>
  </ul>
            <div v-if="username">          
              <ul class="nav flex-column">
                <li class="nav-item">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ username }}
                    </a>
                    <ul class="dropdown-menu">
                      <li><a @click="logout" class="dropdown-item" href="#">Logout</a></li>
                      <li  data-bs-dismiss="offcanvas"><NuxtLink class="dropdown-item" to="/profile">Profile</NuxtLink></li>
                      <li><hr class="dropdown-divider"/></li>
                      <li><NuxtLink class="dropdown-item" to="#">Messenger</NuxtLink></li>
                    </ul>
                  </li>                  
                </li>
              </ul>
            </div>
            <ul v-else class="nav flex-column ">
                <li data-bs-dismiss="offcanvas"  class="nav-item">
                  <a class="nav-link text-white" href="#" data-bs-toggle="modal" data-bs-target="#loginBackdrop">LogIn</a>
                </li>
                <li class="nav-item">
                  <hr class="text-white"/>
                </li>
                <li class="nav-item">
                  <a data-bs-dismiss="offcanvas" class="nav-link text-white" href="#" data-bs-toggle="modal" data-bs-target="#registerBackdrop">Register</a>
                </li>              
            </ul>          
          </div>

</div>

  </template>

<script>
  import { setData ,getData } from 'nuxt-storage/local-storage';  
  import Login from '../components/Login.vue'
  import Register from '../components/Register.vue'
  
  export default {
    name: 'Navbar',
    data() {
      return {
        username: ''
      }
    },
    components: {
      Login,
      Register
    },
    mounted() {
      this.username = getData('USERNAME')
    },
    methods: {
      logout(event) {
          event.preventDefault()
          setData('USERID', null)
          setData('USERNAME', null)
          setTimeout(() => {
            window.location.replace('/');            
          }, 500);
      },
    }
  }
</script>