import { Router } from 'express';
import { RotasColaboradores } from '../Rotas/RotasColaboradores';
import { RotasPapeis } from '../Rotas/RotasPapeis';
import { RotasPlanos } from '../Rotas/RotasPlanos';
import { RotasSocios } from '../Rotas/RotasSocios';
import { RotaSwagger } from "./Swagger";

const Rotas = Router();

Rotas.use('/swagger', RotaSwagger);
Rotas.use('/api', RotasColaboradores);
Rotas.use('/api', RotasSocios);
Rotas.use('/api', RotasPapeis);
Rotas.use('/api', RotasPlanos);

export { Rotas };