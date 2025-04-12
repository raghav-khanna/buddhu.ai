import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs'; // Import the Node.js file system module
import path from 'path'; // Optional: for cleaner path joining

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      // Adjust paths if mkcert generated different filenames or you moved the files
      key: fs.readFileSync(path.resolve('certs', 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve('certs', 'localhost.pem'))
    },
    host: '0.0.0.0'
  }
});
