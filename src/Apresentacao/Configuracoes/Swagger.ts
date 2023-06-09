import { Router } from "express";
import { serve, setup } from "swagger-ui-express"
import apiClube from "../Swagger/apiClube.json";

const RotaSwagger = Router();

RotaSwagger.use("/", serve);
RotaSwagger.get("/", setup(apiClube));

const AdicionarInterfaceSwaggerAsRotas = (rotas: Router): Router => {
  rotas.use('/swagger', RotaSwagger);

  return rotas;
}

export { AdicionarInterfaceSwaggerAsRotas }