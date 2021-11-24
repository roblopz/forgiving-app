import { IAppUser } from '@domain/entities';
import { verify as jwtVerify, sign as jwtSign, VerifyErrors } from 'jsonwebtoken';

const jwtSecret = 'shhh';
const expiration = 3600; // 1hour

export interface IAuthPayload {
  userId: string;
}

export async function verify(authToken: string): Promise<[IAuthPayload, VerifyErrors?]> {
  try {
    const payload = await new Promise<IAuthPayload>((resolve, reject) => {
      const cb = (err: VerifyErrors, payload: IAuthPayload) => err ? reject(err) : resolve(payload);
      jwtVerify(authToken, jwtSecret, cb);
    });

    return [payload];
  } catch(err) {
    return [null, err];
  }  
}

export async function getAuthToken(usr: IAppUser): Promise<string> {
  const payload: IAuthPayload = { userId: usr.id as string };

  return new Promise<string>((resolve, reject) => {
    jwtSign(payload, jwtSecret, {
      expiresIn: expiration
    }, (err, authToken) => {
      if (err) reject(err);
      else resolve(authToken);
    });
  });  
}