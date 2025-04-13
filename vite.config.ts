import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs'; // Import the Node.js file system module
import path from 'path'; // Optional: for cleaner path joining

const backendUrl = 'http://localhost:8000';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false
      },

      // Proxy Socket.IO requests
      // Vite automatically handles the /socket.io path by default when ws is true
      // If your Socket.IO server uses a different path, configure it here
      '/socket.io': {
        target: backendUrl, // Your backend server address
        ws: true, // IMPORTANT: Enable WebSocket proxying
        secure: false, // Allow proxying from HTTPS frontend to HTTP backend
        changeOrigin: true
      }
    },
    https: {
      // Adjust paths if mkcert generated different filenames or you moved the files
      key: fs.readFileSync(path.resolve('certs', 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve('certs', 'localhost.pem'))
    },
    host: '0.0.0.0'
  }
});
