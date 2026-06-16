import Pessoa from "./Pessoa.js";

/**
 * Classe Aluno
 * Herda de Pessoa e implementa a interface Autenticavel.
 * Atributos privados: #curso, #periodo
 */
class Aluno extends Pessoa {
  #curso;
  #periodo;

  constructor(nome, cpf, curso, periodo) {
    super(nome, cpf);
    this.#curso = curso;
    this.#periodo = periodo;
  }

  getCurso() { return this.#curso; }
  setCurso(curso) { this.#curso = curso; }

  getPeriodo() { return this.#periodo; }
  setPeriodo(periodo) { this.#periodo = periodo; }

  // Implementação da interface Autenticavel
  login() {
    return `Aluno ${this.getNome()} acessou o sistema.\n${this.getNome()} está estudando.`;
  }

  // Implementação do método abstrato de Pessoa
  mostrarDados() {
    return (
      `Aluno\n` +
      `Nome: ${this.getNome()}\n` +
      `CPF: ${this.getCpf()}\n` +
      `Curso: ${this.#curso}\n` +
      `Período: ${this.#periodo}`
    );
  }
}

export default Aluno;
