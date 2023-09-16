import * as dotenv from 'dotenv';
import path from 'path';

export function loadEnvConfig() {
  dotenv.config({ path: path.join(__dirname, '../../../.env') });
}
