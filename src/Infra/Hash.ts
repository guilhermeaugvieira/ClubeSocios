import bcrypt from 'bcrypt';

class Hash{
  
  static criptografarTexto = (senha: string): string => {
    return bcrypt.hashSync(senha, parseInt(process.env.SENHA_SALTOS!));
  };

  static ehOTextoCorreto = (senha: string, senhaEncriptada: string): boolean => {
    return bcrypt.compareSync(senha, senhaEncriptada);
  };

}

export { Hash }