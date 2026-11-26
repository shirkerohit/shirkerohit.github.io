import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const source = join(dist, 'index.html');

const routes = [
    'writing',
    'bookshelf',
    'projects',
    'projects/expense-tracker',
    'projects/expense-tracker/privacy',
    'projects/expense-tracker/terms',
];

for (const route of routes) {
    const directory = join(dist, route);
    mkdirSync(directory, { recursive: true });
    copyFileSync(source, join(directory, 'index.html'));
}

console.log(`SPA shell copied to ${routes.length} route directories.`);
