import { verify as jwtVerify, sign as jwtSign, VerifyErrors, SignOptions } from 'jsonwebtoken';

export async function verifyToken<T>(authToken: string, secret: string): Promise<[T, VerifyErrors?]> {
  try {
    const payload = await new Promise<T>((resolve, reject) => {
      const cb = (err: VerifyErrors, payload: T) => err ? reject(err) : resolve(payload);
      jwtVerify(authToken, secret, cb);
    });

    return [payload];
  } catch(err) {
    return [null, err];
  }
}

export async function signToken<T extends string | object | Buffer>(
  payload: T, 
  secret: string,
  options: SignOptions
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwtSign(payload, secret, options, (err, authToken) => {
      if (err) reject(err);
      else resolve(authToken);
    });
  });  
}