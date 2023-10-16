import { loadEnvConfig } from '../config/load-env-config';

loadEnvConfig();

export const buildFullSponsorWebsitePath = (website: string): string => {
  if (website.startsWith('https://')) {
    return website;
  }
  return `https://www.${website}`;
};
