import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App-spesifikke CSP-direktiver (ikke fra dekoratøren)
const appDirectives = {
    'connect-src': ['m3pb011r.apicdn.sanity.io', 'sentry.gc.nav.no'],
};

async function generateCspHeaders() {
    try {
        // Hent CSP for begge miljøer med timeout
        const timeout = 15000; // 15 sekunder

        const fetchWithTimeout = async () => {
            const devCsp = await buildCspHeader(appDirectives, { env: 'dev' });
            const prodCsp = await buildCspHeader(appDirectives, { env: 'prod' });
            return { devCsp, prodCsp };
        };

        const timeoutPromise = new Promise((resolve, reject) =>
            setTimeout(
                () => reject(new Error('Timeout ved henting av CSP fra dekoratøren')),
                timeout
            )
        );

        const { devCsp, prodCsp } = await Promise.race([fetchWithTimeout(), timeoutPromise]);

        // Generer TypeScript-filinnhold
        const fileContent = `
        // Denne filen er auto-generert av scripts/generate-csp.ts
        // Ikke rediger manuelt - endringer vil bli overskrevet ved neste bygg

        export const DEV_CSP = '${devCsp.replace(/'/g, "\\'")}';
        export const PROD_CSP = '${prodCsp.replace(/'/g, "\\'")}';
        `;

        const outputPath = path.resolve(__dirname, '../generated/csp-headers.ts');
        const outputDir = path.dirname(outputPath);

        // Opprett mappe hvis den ikke eksisterer
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, fileContent, 'utf-8');

        console.log('✓ CSP-headere generert');
        console.log(`  - Dev CSP: ${devCsp.length} tegn`);
        console.log(`  - Prod CSP: ${prodCsp.length} tegn`);
        console.log(`  - Output: ${outputPath}`);
    } catch (error) {
        console.error('✗ Kunne ikke generere CSP-headere:', error);
        console.error('Dette kan skyldes nettverksproblemer med dekoratørtjenesten.');
        process.exit(1);
    }
}

generateCspHeaders();
