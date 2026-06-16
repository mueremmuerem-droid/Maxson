import Pessoa from "./Pessoa.js";

/**
 * Classe Professor
 * Herda de Pessoa e implementa a interface Autenticavel.
 * Atributos privados: #disciplina, #titulacao
 */
class Professor extends Pessoa {
  #disciplina;
  #titulacao;

  constructor(nome, cpf, disciplina, titulacao) {
    super(nome, cpf);
    this.#disciplina = disciplina;
    this.#titulacao = titulacao;
  }

  getDisciplina() { return this.#disciplina; }
  setDisciplina(disciplina) { this.#disciplina = disciplina; }

  getTitulacao() { return this.#titulacao; }
  setTitulacao(titulacao) { this.#titulacao = titulacao; }

  // Implementação da interface Autenticavel
  login() {
    return `Professor ${this.getNome()} acessou o sistema.\n${this.getNome()} está dando aula.`;
  }

  // Implementação do método abstrato de Pessoa
  mostrarDados() {
    return (
      `Professor\n` +
      `Nome: ${this.getNome()}\n` +
      `Disciplina: ${this.#disciplina}\n` +
      `Titulação: ${this.#titulacao}`
    );
  }
}

export default Professor;
