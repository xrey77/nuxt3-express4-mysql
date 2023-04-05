export default defineNuxtConfig({ 
    css: [
        '~/assets/scss/main.scss',
        '~/assets/css/wincor.css'
    ],
    app: {
      head: {
        script: [
          {
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
            type: "text/javascript"
          },
        ],
      },
    },  
    vite: {
        define: {
          "process.env.DEBUG": true,
        },
    },
    runtimeConfig: {
      public: {
        dbHost: process.env.DB_HOST,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbName: process.env.DB_NANE,
        tokenSecret: process.env.TOKEN_SECRET,
        mlDriver: process.env.MAIL_DRIVER,
        mlHost: process.env.MAIL_HOST,
        mlPort: process.env.MAIL_PORT,
        mlUsername: process.env.MAIL_USERNAME,
        mlFromAddress: process.env.MAIL_FROM_ADDRESS,
        mlPassword: process.env.MAIL_PASSWORD,
        mlFromName: process.env.MAIL_FROM_NAME,
        mlTo: process.env.MAIL_TO,   
      }
    },
    modules: [
      '@nuxt/image-edge',
      'formidable',
    ],      
    plugins: [
    ],


    
})


// nitro: {
//     prerender: {
//        routes: ['/user/1', '/user/2']
//     },
      //  plugins: ["@/server/db/mongo.ts"]

//  }
