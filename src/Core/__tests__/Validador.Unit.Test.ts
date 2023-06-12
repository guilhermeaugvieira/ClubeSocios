import { CONJUNTO_ALFABETO_MAIUSCULO, CONJUNTO_ALFABETO_MINUSCULO, CONJUNTO_CARACTERES_ESPECIAIS, CONJUNTO_NUMEROS } from "../Constantes";
import { Validadores } from "../Validadores";

describe('Módulo Validadores', () => {
  test('Ao enviar null para o validador ehValorInvalidoOuEspacoEmBranco, o validador deve retornar true', () => {
    const valor = null;

    expect(Validadores.ehValorInvalidoOuEspacoEmBranco(valor)).toBe(true);
  });

  test('Ao enviar espaco em branco para o validador ehValorInvalidoOuEspacoEmBranco, o validador deve retornar true', () => {
    const valor = '    ';

    expect(Validadores.ehValorInvalidoOuEspacoEmBranco(valor)).toBe(true);
  });

  test('Ao enviar undefined para o validador ehValorInvalidoOuEspacoEmBranco, o validador deve retornar true', () => {
    const valor = undefined;

    expect(Validadores.ehValorInvalidoOuEspacoEmBranco(valor)).toBe(true);
  });

  test('Ao enviar string preenchida para o validador ehValorInvalidoOuEspacoEmBranco, o validador deve retornar false', () => {
    const valor = 'valor válido';

    expect(Validadores.ehValorInvalidoOuEspacoEmBranco(valor)).toBe(false);
  });

  test('Ao enviar número para o validador ehValorInvalidoOuEspacoEmBranco, o validador deve retornar false', () => {
    const valor = 1 as any;

    expect(Validadores.ehValorInvalidoOuEspacoEmBranco(valor)).toBe(false);
  });

  test('Ao enviar undefined para o validador ehValorInvalido, o validador deve retornar true', () => {
    const valor = undefined;

    expect(Validadores.ehValorInvalido(valor)).toBe(true);
  });

  test('Ao enviar null para o validador ehValorInvalido, o validador deve retornar true', () => {
    const valor = null;

    expect(Validadores.ehValorInvalido(valor)).toBe(true);
  });

  test('Ao enviar texto prenchido para o validador ehValorInvalido, o validador deve retornar false', () => {
    const valor = 'texto';

    expect(Validadores.ehValorInvalido(valor)).toBe(false);
  });

  test('Ao enviar número para o validador ehValorInvalido, o validador deve retornar false', () => {
    const valor = 0;

    expect(Validadores.ehValorInvalido(valor)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 0;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar numero negativo para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = -0.01;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar numero maior que 0 para o validador ehNumeroMaiorQue, o validador deve retornar true', () => {
    const valor = 0.01;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 0)).toBe(true);
  });

  test('Ao enviar null para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMaiorQue(valor, null)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMaiorQue(valor, undefined)).toBe(false);
  });


  test('Ao enviar string como valor comparado para o validador ehNumeroMaiorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMaiorQue(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador ehNumeroMaiorOuIgualA, o validador deve retornar true', () => {
    const valor = 0;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar numero maior que 0 para o validador ehNumeroMaiorOuIgualA, o validador deve retornar true', () => {
    const valor = 0.01;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar numero menor que 0 para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = -0.01;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar null para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, undefined)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, null)).toBe(false);
  });

  test('Ao enviar string como valor comparado para o validador ehNumeroMaiorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMaiorOuIgualA(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 0;
    
    expect(Validadores.ehNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar numero negativo para o validador ehNumeroMenorQue, o validador deve retornar true', () => {
    const valor = -0.01;
    
    expect(Validadores.ehNumeroMenorQue(valor, 0)).toBe(true);
  });

  test('Ao enviar numero maior que 0 para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 0.01;
    
    expect(Validadores.ehNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar null para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.ehNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.ehNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.ehNumeroMenorQue(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMenorQue(valor, undefined)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMenorQue(valor, null)).toBe(false);
  });

  test('Ao enviar string como valor comparado para o validador ehNumeroMenorQue, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMenorQue(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar numero 0 para o validador ehNumeroMenorOuIgualA, o validador deve retornar true', () => {
    const valor = 0;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar numero maior que 0 para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 0.01;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar numero menor que 0 para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = -0.01;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 0)).toBe(true);
  });

  test('Ao enviar null para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = null;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = undefined;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar string para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 'teste' as any;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 0)).toBe(false);
  });

  test('Ao enviar undefined como valor comparado para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, undefined)).toBe(false);
  });

  test('Ao enviar null como valor comparado para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, null)).toBe(false);
  });

  test('Ao enviar string como valor comparado para o validador ehNumeroMenorOuIgualA, o validador deve retornar false', () => {
    const valor = 1;
    
    expect(Validadores.ehNumeroMenorOuIgualA(valor, 'teste' as any)).toBe(false);
  });

  test('Ao enviar dois números iguais para o validador ehIgual, o validador deve retornar true', () => {
    const valor1 = 1;
    const valor2 = 1;

    expect(Validadores.ehIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois números iguais, um inteiro e um float para o validador ehIgual, o validador deve retornar true', () => {
    const valor1 = 1;
    const valor2 = 1.0;

    expect(Validadores.ehIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois números, um inteiro e um float para o validador ehIgual, o validador deve retornar false', () => {
    const valor1 = 1;
    const valor2 = 1.001;

    expect(Validadores.ehIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar dois textos iguais para o validador ehIgual, o validador deve retornar true', () => {
    const valor1 = 'Texto 1';
    const valor2 = 'Texto 1';

    expect(Validadores.ehIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois textos diferentes para o validador ehIgual, o validador deve retornar false', () => {
    const valor1 = 'Texto 1';
    const valor2 = 'Texto';

    expect(Validadores.ehIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar dois valores null para o validador ehIgual, o validador deve retornar true', () => {
    const valor1 = null;
    const valor2 = null;

    expect(Validadores.ehIgual(valor1, valor2)).toBe(true);
  });

  test('Ao enviar dois valores, um null e outro undefined para o validador ehIgual, o validador deve retornar false', () => {
    const valor1 = null;
    const valor2 = undefined;

    expect(Validadores.ehIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar  e outro undefined para o validador ehIgual, o validador deve retornar false', () => {
    const valor1 = null;
    const valor2 = undefined;

    expect(Validadores.ehIgual(valor1, valor2)).toBe(false);
  });

  test('Ao enviar texto com comprimento entre mínimo e máximo para o validador textoComComprimentoEntre, o validador deve retornar true', () => {
    const texto = 'Teste String';
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 13;

    expect(Validadores.textoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(true);
  });

  test('Ao enviar texto com comprimento menor que o mínimo para o validador textoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = 'Teste String';
    const comprimentoMinimo = 13;

    expect(Validadores.textoComComprimentoEntre(texto, comprimentoMinimo)).toBe(false);
  });

  test('Ao enviar texto com comprimento maior que o máximo para o validador textoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = 'Teste String 123';
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.textoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar null para o validador textoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = null;
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.textoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar null para o validador textoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = undefined;
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.textoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar número para o validador textoComComprimentoEntre, o validador deve retornar false', () => {
    const texto = 1 as any;
    const comprimentoMinimo = 10;
    const comprimentoMaximo = 12;

    expect(Validadores.textoComComprimentoEntre(texto, comprimentoMinimo, comprimentoMaximo)).toBe(false);
  });

  test('Ao enviar texto sem caracteres especiais para o validador textoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = "Eu";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar texto com caracteres especiais para o validador textoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar true', () => {
    const texto = "Eu!";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(true);
  });

  test('Ao enviar texto sem números para o validador textoComUmDosCaracteres, especificando os números, o validador deve retornar false', () => {
    const texto = "Eu";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_NUMEROS)).toEqual(false);
  });

  test('Ao enviar texto com números para o validador textoComUmDosCaracteres, especificando os números, o validador deve retornar true', () => {
    const texto = "Eu!7";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_NUMEROS)).toEqual(true);
  });

  test('Ao enviar texto sem letras minúsculas para o validador textoComUmDosCaracteres, especificando as letras minúsculas, o validador deve retornar false', () => {
    const texto = "EU7";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MINUSCULO)).toEqual(false);
  });

  test('Ao enviar texto com letras minúsculas para o validador textoComUmDosCaracteres, especificando as letras minúsculas, o validador deve retornar true', () => {
    const texto = "Eu7";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MINUSCULO)).toEqual(true);
  });

  test('Ao enviar texto sem letras maiúsculas para o validador textoComUmDosCaracteres, especificando as letras maiúsculas, o validador deve retornar false', () => {
    const texto = "eu7!";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MAIUSCULO)).toEqual(false);
  });

  test('Ao enviar texto com letras maiúsculas para o validador textoComUmDosCaracteres, especificando as letras maiúsculas, o validador deve retornar true', () => {
    const texto = "Eu7";

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_ALFABETO_MAIUSCULO)).toEqual(true);
  });

  test('Ao enviar undefined para o validador textoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = undefined;

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar null para o validador textoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = null;

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar espaço em branco para o validador textoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = '  ';

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar número para o validador textoComUmDosCaracteres, especificando os caracteres especiais, o validador deve retornar false', () => {
    const texto = 1 as any;

    expect(Validadores.textoComUmDosCaracteres(texto, CONJUNTO_CARACTERES_ESPECIAIS)).toEqual(false);
  });

  test('Ao enviar texto para o validador ehVariavelDoTipo, especificando um tipo número deve retornar false', () => {
    const variavel = '0';

    expect(Validadores.ehVariavelDoTipo(variavel, 'number')).toEqual(false);
  });

  test('Ao enviar número para o validador ehVariavelDoTipo, especificando um tipo número deve retornar true', () => {
    const variavel = 0;

    expect(Validadores.ehVariavelDoTipo(variavel, 'number')).toEqual(true);
  });

  test('Ao enviar undefined para o validador ehVariavelDoTipo, especificando um tipo número deve retornar false', () => {
    const variavel = undefined;

    expect(Validadores.ehVariavelDoTipo(variavel, 'number')).toEqual(false);
  });

  test('Ao enviar null para o validador ehVariavelDoTipo, especificando um tipo número deve retornar false', () => {
    const variavel = null;

    expect(Validadores.ehVariavelDoTipo(variavel, 'number')).toEqual(false);
  });

})