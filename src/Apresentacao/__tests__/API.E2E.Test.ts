import Supertest from 'supertest'
import { Servidor } from '../Configuracoes/Servidor';

describe('Módulo API - Base', () => {

  test('Servidor apresenta mensagem que está funcionando corretamente', async () => {
    const resposta = await Supertest(Servidor)
      .get("/")
      .send()
      .set('Accept', 'application/json');

    const respostaEsperada = "Servidor funcionando";

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body).toEqual(respostaEsperada);
  })

});