import Pessoa from "./Pessoa.js";
import Aluno from "./Aluno.js";
import Professor from "./Professor.js";

/**
 * Classe Secretaria
 * Responsável pelo gerenciamento (CRUD) das pessoas cadastradas no sistema.
 * Atributo privado: #pessoas[] — lista de instâncias de Pessoa
 */
class Secretaria {
  #pessoas = [];

  // Cadastra uma nova pessoa (Aluno ou Professor)
  cadastrar(pessoa) {
    if (!(pessoa instanceof Pessoa)) {
      throw new Error("Apenas instâncias de Pessoa podem ser cadastradas.");
    }
    this.#pessoas.push(pessoa);
  }

  // Remove uma pessoa pelo CPF
  remover(cpf) {
    this.#pessoas = this.#pessoas.filter(p => p.getCpf() !== cpf);
  }

  // Busca uma pessoa pelo CPF
  buscarPorCpf(cpf) {
    return this.#pessoas.find(p => p.getCpf() === cpf) || null;
  }

  // Retorna cópia da lista com todas as pessoas
  listarTodos() {
    return [...this.#pessoas];
  }

  // Retorna apenas os alunos cadastrados
  listarAlunos() {
    return this.#pessoas.filter(p => p instanceof Aluno);
  }

  // Retorna apenas os professores cadastrados
  listarProfessores() {
    return this.#pessoas.filter(p => p instanceof Professor);
  }
}

export default Secretaria;
