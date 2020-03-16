module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'components': '@/components',
          'content': 'components/content',
          'common': 'components/common',
          'assets': '@/assets',
          'network': '@/network',
          'views': '@/views',
        }
      }
    },
       devServer: {
         
         port: 8080,
         proxy: {
          
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                ws:true,
                pathRewrite: {
                  '^/api':' '
                }
            }
         }
     }

  }
