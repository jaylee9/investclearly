import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { loadEnvConfig } from '../../config/load-env-config';

loadEnvConfig();

export const verifyGoogleUser = async (token: string) => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const client = new OAuth2Client(clientID);
  const ticket: LoginTicket = await client.verifyIdToken({
    idToken: token,
    audience: clientID,
  });
  const payload = ticket.getPayload();

  if (payload) {
    const { sub, given_name, family_name, email, picture } = payload;
    const user = {
      googleId: sub,
      email,
      firstName: given_name,
      lastName: family_name,
      profilePicture: picture,
    };

    return user;
  }
};
