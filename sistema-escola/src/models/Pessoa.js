/**
 * Classe Abstrata: Pessoa
 * Não pode ser instanciada diretamente.
 * Atributos privados: #nome, #cpf
 */
class Pessoa {
  #nome;
  #cpf;

  constructor(nome, cpf) {
    if (new.target === Pessoa) {
      throw new Error("Pessoa é uma classe abstrata e não pode ser instanciada diretamente.");
    }
    this.#nome = nome;
    this.#cpf = cpf;
  }

  getNome() { return this.#nome; }
  setNome(nome) { this.#nome = nome; }

  getCpf() { return this.#cpf; }
  setCpf(cpf) { this.#cpf = cpf; }

  // Método abstrato — deve ser sobrescrito pelas subclasses
  mostrarDados() {
    throw new Error("mostrarDados() deve ser implementado pela subclasse.");
  }

  // Método da interface Autenticavel — deve ser sobrescrito
  login() {
    throw new Error("login() deve ser implementado pela subclasse.");
  }
}

export default Pessoa;
