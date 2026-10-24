import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/medium-feed': {
                target: 'https://medium-api-worker.rohitsh.workers.dev',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/medium-feed/, '/'),
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq) => {
                        proxyReq.removeHeader('origin');
                    });
                },
            },
        },
    },
});
