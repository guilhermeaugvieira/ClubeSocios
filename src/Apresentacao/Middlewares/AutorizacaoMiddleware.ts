import { Request, Response, NextFunction } from 'express';
import { Token } from '../../Infra/Token';

const AutorizacaoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  
  if(token === undefined){
    return res.status(401).json({
      sucesso: false,
      erros: [
        'Autorização JWT não foi enviada'
      ]
    });
  };

  try {
    const tokenData = Token.ValidarToken(token, "Acesso Aplicação Colaborador", process.env.TOKEN_TEMPO_EXPIRACAO!);
  }catch(exception: any){
    if(exception.message.includes("subject"))    
      return res.status(401).json({
        sucesso: false,
        erros: [
          'Contexto inválido'
        ]
      });

    if(exception.message.includes("maxAge"))    
      return res.status(401).json({
        sucesso: false,
        erros: [
          'Token Expirado'
        ]
      });

    if(exception.message.includes("signature"))    
      return res.status(401).json({
        sucesso: false,
        erros: [
          'Token Inválido'
        ]
      });
  }

  next();
}

export { AutorizacaoMiddleware }