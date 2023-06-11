import { CONJUNTO_ALFABETO_MAIUSCULO, CONJUNTO_ALFABETO_MINUSCULO, CONJUNTO_CARACTERES_ESPECIAIS, CONJUNTO_NUMEROS } from "../Constantes";
import { Validadores } from "../Validadores";

describe('Módulo Validadores', () => {
  test('Ao enviar null para o validador EhValorInvalidoOuEspacoEmBranco, o validador deve retornar true', () => {
    const valor = null;

    expect(Validadores.EhValorInvalidoOuEspacoEmBranco(valor)).toBe(true);
  });

  test('Ao enviar espaco em branco para o validador EhValorInvalidoOuEspacoEmBranco, o validador deve retornar true', () => {
    const valor = '    ';

    expect(Validadores.EhValorInvalidoOuEspacoEmBranco(valor)).toBe(true);
  });

  test('Ao enviar undefined para o validador EhValorInvalidoOuEspacoEmBranco, o validador deve retornar true', () => {
    const valor = undefined;

    expect(Validadores.EhValorInvalidoOuEspacoEmBranco(valor)).toBe(true);
  });

  test('Ao enviar string preenchida para o validador EhValorInvalidoOuEspacoEmBranco, o validador deve retornar false', () => {
    const valor = 'valor válido';

    expect(Validadores.EhValorInvalidoOuEspacoEmBranco(valor)).toBe(false);
  });

  test('Ao enviar número para o validador EhValorInvalidoOuEspacoEmBranco, o validador deve retornar false', () => {
    const valor = 1 as any;

    expect(Validadores.EhValorInvalidoOuEspacoEmBranco(valor)).toBe(false);
  });

  test('Ao enviar undefined para o validador EhValorInvalido, o validador deve retornar true', () => {
    const valor = undefined;

    expect(Validadores.EhValorInvalido(valor)).toBe(true);
  });

  test('Ao enviar null para o validador EhValorInvalido, o validador deve retornar true', () => {
    const valor = null;

    expect(Validadores.EhValorInvalido(valor)).toBe(true);
  });

  test('Ao enviar texto prenchido para o validador EhValorInvalido, o validador deve retornar false', () => {
    const valor = 'texto';

    expect(Validadores.EhValorInvalido(valor)).toBe(false);
  });

  test('Ao enviar número para o validador EhValorInvalido, o validador deve retornar false', () => {
    const valor = 0;

    expect(Validadores.EhValorInvalido(valor)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 0;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar numero negativo para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = -0.01;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar numero maior que 0 para o validador EhNumeroMaiorQue, o validador deve retornar true', () => {
    const valor = 0.01;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 0)).toBe(true);
  });

  test('Ao enviar null para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMaiorQue(valor, null)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMaiorQue(valor, undefined)).toBe(false);
  });


  test('Ao enviar string como valor comparado para o validador EhNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMaiorQue(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador EhNumeroMaiorOuIgualA, o validador deve retornar true', () => {
    const valor = 0;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar numero maior que 0 para o validador EhNumeroMaiorOuIgualA, o validador deve retornar true', () => {
    const valor = 0.01;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar numero menor que 0 para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = -0.01;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar null para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, undefined)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, null)).toBe(false);
  });

  test('Ao enviar string como valor comparado para o validador EhNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMaiorOuIgualA(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 0;
    
    expect(Validadores.EhNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar numero negativo para o validador EhNumeroMenorQue, o validador deve retornar true', () => {
    const valor = -0.01;
    
    expect(Validadores.EhNumeroMenorQue(valor, 0)).toBe(true);
  });

  test('Ao enviar numero maior que 0 para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 0.01;
    
    expect(Validadores.EhNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar null para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.EhNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.EhNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.EhNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMenorQue(valor, undefined)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMenorQue(valor, null)).toBe(false);
  });

  test('Ao enviar string como valor comparado para o validador EhNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMenorQue(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador EhNumeroMenorOuIgualA, o validador deve retornar true', () => {
    const valor = 0;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar numero maior que 0 para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 0.01;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar numero menor que 0 para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = -0.01;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar null para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, undefined)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, null)).toBe(false);
  });

  test('Ao enviar string como valor comparado para o validador EhNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.EhNumeroMenorOuIgualA(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar dois números iguais para o validador EhIgual, o validador deve retornar true', () => {
    const valor1 = 1;
    const valor2 = 1;

    expect(Validadores.EhIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois números iguais, um inteiro e um float para o validador EhIgual, o validador deve retornar true', () => {
    const valor1 = 1;
    const valor2 = 1.0;

    expect(Validadores.EhIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois números, um inteiro e um float para o validador EhIgual, o validador deve retornar false', () => {
    const valor1 = 1;
    const valor2 = 1.001;

    expect(Validadores.EhIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar dois textos iguais para o validador EhIgual, o validador deve retornar true', () => {
    const valor1 = 'Texto 1';
    const valor2 = 'Texto 1';

    expect(Validadores.EhIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois textos diferentes para o validador EhIgual, o validador deve retornar false', () => {
    const valor1 = 'Texto 1';
    const valor2 = 'Texto';

    expect(Validadores.EhIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar dois valores null para o validador EhIgual, o validador deve retornar true', () => {
    const valor1 = null;
    const valor2 = null;

    expect(Validadores.EhIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois valores, um null e outro undefined para o validador EhIgual, o validador deve retornar false', () => {
    const valor1 = null;
    const valor2 = undefined;

    expect(Validadores.EhIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar  e outro undefined para o validador EhIgual, o validador deve retornar false', () => {
    const valor1 = null;
    const valor2 = undefined;

    expect(Validadores.EhIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar texto com comprimento entre mínimo e máximo para o validador TextoComComprimentoEntre, o validador deve retornar true', () => {
    const texto = 'Teste String';
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 13;

    expect(Validadores.TextoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(true);
  });

  test('Ao enviar texto com comprimento menor que o mínimo para o validador TextoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = 'Teste String';
    const comprimentoMinimo = 13;

    expect(Validadores.TextoComComprimentoEntre(texto, comprimentoMinimo)).toBe(false);
  });

  test('Ao enviar texto com comprimento maior que o máximo para o validador TextoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = 'Teste String 123';
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.TextoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar null para o validador TextoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = null;
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.TextoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar null para o validador TextoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = undefined;
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.TextoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar número para o validador TextoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = 1 as any;
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.TextoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar texto sem caracteres especiais para o validador TextoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = "Eu";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar texto com caracteres especiais para o validador TextoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar true', () => {
    const texto = "Eu!";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(true);
  });

  test('Ao enviar texto sem números para o validador TextoComUmDosCaracteres, especificando os números, o validador deve retornar false', () => {
    const texto = "Eu";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_NUMEROS)).toEqual(false);
  });

  test('Ao enviar texto com números para o validador TextoComUmDosCaracteres, especificando os números, o validador deve retornar true', () => {
    const texto = "Eu!7";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_NUMEROS)).toEqual(true);
  });

  test('Ao enviar texto sem letras minúsculas para o validador TextoComUmDosCaracteres, especificando as letras minúsculas, o validador deve retornar false', () => {
    const texto = "EU7";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MINUSCULO)).toEqual(false);
  });

  test('Ao enviar texto com letras minúsculas para o validador TextoComUmDosCaracteres, especificando as letras minúsculas, o validador deve retornar true', () => {
    const texto = "Eu7";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MINUSCULO)).toEqual(true);
  });

  test('Ao enviar texto sem letras maiúsculas para o validador TextoComUmDosCaracteres, especificando as letras maiúsculas, o validador deve retornar false', () => {
    const texto = "eu7!";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MAIUSCULO)).toEqual(false);
  });

  test('Ao enviar texto com letras maiúsculas para o validador TextoComUmDosCaracteres, especificando as letras maiúsculas, o validador deve retornar true', () => {
    const texto = "Eu7";

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MAIUSCULO)).toEqual(true);
  });

  test('Ao enviar undefined para o validador TextoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = undefined;

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar null para o validador TextoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = null;

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar espaço em branco para o validador TextoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = '  ';

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar número para o validador TextoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = 1 as any;

    expect(Validadores.TextoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar texto para o validador EhVariavelDoTipo, especificando um tipo número deve retornar false', () => {
    const variavel = '0';

    expect(Validadores.EhVariavelDoTipo(variavel, 'number')).toEqual(false);
  });

  test('Ao enviar número para o validador EhVariavelDoTipo, especificando um tipo número deve retornar true', () => {
    const variavel = 0;

    expect(Validadores.EhVariavelDoTipo(variavel, 'number')).toEqual(true);
  });

  test('Ao enviar undefined para o validador EhVariavelDoTipo, especificando um tipo número deve retornar false', () => {
    const variavel = undefined;

    expect(Validadores.EhVariavelDoTipo(variavel, 'number')).toEqual(false);
  });

  test('Ao enviar null para o validador EhVariavelDoTipo, especificando um tipo número deve retornar false', () => {
    const variavel = null;

    expect(Validadores.EhVariavelDoTipo(variavel, 'number')).toEqual(false);
  });

})