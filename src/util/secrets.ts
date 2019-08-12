import fs from 'fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('.env file not found');
    process.exit(1);
}

export const API_KEY: string = process.env.API_KEY;

if (!API_KEY) {
    console.error('Set API_KEY env variable.');
    process.exit(1);
}
