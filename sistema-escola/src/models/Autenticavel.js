/**
 * Interface Autenticavel
 * Contrato que Aluno e Professor devem implementar.
 * Em JavaScript, interfaces são simuladas via convenção:
 * qualquer classe que implemente login() respeita este contrato.
 *
 * Método obrigatório:
 *   login() → string
 */
class Autenticavel {
  login() {
    throw new Error("login() deve ser implementado pela classe que implementa Autenticavel.");
  }
}

export default Autenticavel;
