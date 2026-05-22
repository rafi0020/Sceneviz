import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Sceneviz/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        visualInspection: resolve(__dirname, 'capabilities/visual-inspection.html'),
        complianceEvidence: resolve(__dirname, 'capabilities/compliance-evidence.html'),
        floorIntelligence: resolve(__dirname, 'capabilities/floor-intelligence.html'),
        supportSla: resolve(__dirname, 'support-sla.html'),
        commercials: resolve(__dirname, 'commercials.html'),
        library: resolve(__dirname, 'library.html'),
        deployments: resolve(__dirname, 'deployments.html'),
        privacyDataCustody: resolve(__dirname, 'privacy-data-custody.html')
      }
    }
  }
})
