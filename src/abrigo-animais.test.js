import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,FOGUETE', 'RATO,BOLA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  test('Deve rejeitar ordem com animal repetido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'BOLA,CAIXA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
  });

  test('Loco deve ir para o abrigo se não houver companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('SKATE,RATO', 'SKATE,RATO', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
  });

  test('Loco pode ser adotado se já houver outro animal adotado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,SKATE', 'BOLA,NOVELO', 'Rex,Loco');
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Loco - pessoa 1');
  });

  test('Pessoa não pode adotar mais que 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,SKATE,LASER',
      'BOLA,CAIXA',
      'Rex,Bola,Bebe,Mimi,Fofo'
    );
    const adotadosPessoa1 = resultado.lista.filter(l => l.endsWith('pessoa 1'));
    expect(adotadosPessoa1.length).toBe(3);
  });
});
