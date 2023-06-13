import { v4 as uuid } from 'uuid';
import jwt, { Jwt } from 'jsonwebtoken';

class Token{

  static gerarJwt = (tokenObject: Object, idClienteLogado: string, contexto: string, tempoExpiracao: string): string => {
    const token = jwt.sign(tokenObject, process.env.APP_SECRET!, {
      expiresIn: tempoExpiracao,
      issuer: idClienteLogado,
      audience: process.env.APP_NAME,
      jwtid: uuid(),
      subject: contexto,
    });

    return token;
  }

  static validarToken = (tokenJwt: string, contexto: string, tempoExpiracao: string) : Jwt => {
    const tokenData = jwt.verify(tokenJwt, process.env.APP_SECRET!, {
      audience: process.env.APP_NAME!,
      complete: true,
      ignoreExpiration: false,
      ignoreNotBefore: false,
      subject: contexto,
      maxAge: tempoExpiracao,
    });

    return tokenData;
  }

}

export { Token }