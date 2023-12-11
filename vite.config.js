import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    plugins: [vue()],
    // server: {
    //     proxy: {
    //         "/api": {
    //             target: process.env.VITE_SERVER_BASE_URL,
    //             changeOrigin: true
    //         }
    //     }
    // }
})
