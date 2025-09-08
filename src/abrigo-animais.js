class AbrigoAnimais {
  constructor() {
    this.animaisMap = new Map();
    this.animaisMap.set('Rex', { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] });
    this.animaisMap.set('Mimi', { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] });
    this.animaisMap.set('Fofo', { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] });
    this.animaisMap.set('Zero', { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] });
    this.animaisMap.set('Bola', { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] });
    this.animaisMap.set('Bebe', { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] });
    this.animaisMap.set('Loco', { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] });
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let brinquedosP1 = brinquedosPessoa1.split(',');
    let brinquedosP2 = brinquedosPessoa2.split(',');
    let ordem = ordemAnimais.split(',');

    if (new Set(ordem).size !== ordem.length) {
      return { erro: 'Animal inválido' };
    }

    for (let i = 0; i < ordem.length; i++) {
      const nomeAnimal = ordem[i];
      if (!this.animaisMap.has(nomeAnimal)) {
        return { erro: 'Animal inválido' };
      }
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
