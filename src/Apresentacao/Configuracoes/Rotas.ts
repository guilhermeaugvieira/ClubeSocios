import { Router } from 'express';
import { RotasColaboradores } from '../Rotas/RotasColaboradores';
import { RotasPapeis } from '../Rotas/RotasPapeis';
import { RotasPlanos } from '../Rotas/RotasPlanos';
import { RotasSocios } from '../Rotas/RotasSocios';

const Rotas = Router();

Rotas.use('/api/colaboradores', RotasColaboradores);
Rotas.use('/api/socios', RotasSocios);
Rotas.use('/api/papeis', RotasPapeis);
Rotas.use('/api/planos', RotasPlanos);

export { Rotas };