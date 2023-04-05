<template>
    <head>
        <title>Wincor-Nixdorf</title>
    </head>
    <div>
        <div>
            <Navbar />
        </div>
        <slot />
        <div>
            <Footer />
        </div>
    </div>
</template>

<script >
  import Navbar from "./navbar.vue"
  import Footer from "./footer.vue"

  export default {
    
    components: {
        Navbar,
        Footer
    },
  }
</script>