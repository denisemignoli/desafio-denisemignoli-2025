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

    this.brinquedosValidos = new Set();
    for (const animalInfo of this.animaisMap.values()) {
      for (const brinquedo of animalInfo.brinquedos) {
        this.brinquedosValidos.add(brinquedo);
      }
    }
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

    if (new Set(brinquedosP1).size !== brinquedosP1.length) {
      return { erro: 'Brinquedo inválido' };
    }
    for (const brinquedo of brinquedosP1) {
      if (!this.brinquedosValidos.has(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    if (new Set(brinquedosP2).size !== brinquedosP2.length) {
      return { erro: 'Brinquedo inválido' };
    }
    for (const brinquedo of brinquedosP2) {
      if (!this.brinquedosValidos.has(brinquedo)) {
        return { erro: 'Brinquedo inválido' };
      }
    }

    const resultados = [];
    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;

    for (const nomeAnimal of ordem) {
      const animalInfo = this.animaisMap.get(nomeAnimal);
      
      const pessoa1Apta = this._verificaAptidao(nomeAnimal, animalInfo, brinquedosP1, adocoesPessoa1);
      const pessoa2Apta = this._verificaAptidao(nomeAnimal, animalInfo, brinquedosP2, adocoesPessoa2);

      if (pessoa1Apta && pessoa2Apta) {
        resultados.push(`${nomeAnimal} - abrigo`);
      } else if (pessoa1Apta) {
        if (adocoesPessoa1 < 3) {
          resultados.push(`${nomeAnimal} - pessoa 1`);
          adocoesPessoa1++;
        } else {
          resultados.push(`${nomeAnimal} - abrigo`);
        }
      } else if (pessoa2Apta) {
        if (adocoesPessoa2 < 3) {
          resultados.push(`${nomeAnimal} - pessoa 2`);
          adocoesPessoa2++;
        } else {
          resultados.push(`${nomeAnimal} - abrigo`);
        }
      } else {
        resultados.push(`${nomeAnimal} - abrigo`);
      }
    }

    resultados.sort();
    return { lista: resultados };
  }

  _verificaAptidao(nomeAnimal, animalInfo, brinquedosPessoa, adocoesAnteriores = 0) {
    const brinquedosAnimal = animalInfo.brinquedos;

    if (nomeAnimal === 'Loco') {
      const temCompanhia = adocoesAnteriores > 0;
      if (temCompanhia) {
        return brinquedosAnimal.every(brinquedo => brinquedosPessoa.includes(brinquedo));
      }
      return false;
    }

    let indiceBrinquedoAnimal = 0;
    for (const brinquedoDaPessoa of brinquedosPessoa) {
      if (indiceBrinquedoAnimal < brinquedosAnimal.length && brinquedoDaPessoa === brinquedosAnimal[indiceBrinquedoAnimal]) {
        indiceBrinquedoAnimal++;
      }
    }
    
    return (indiceBrinquedoAnimal === brinquedosAnimal.length);
  }
}

export { AbrigoAnimais as AbrigoAnimais };
