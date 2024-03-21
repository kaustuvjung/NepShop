import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  // define: {
  //   'process.env.VITE_APP_BACKEND_URL': JSON.stringify(process.env.VITE_APP_BACKEND_URL),
  //   'process.env.VITE_APP_Frontend_URL': JSON.stringify(process.env.VITE_APP_Frontend_URL)
  // }
  
});
