package escola;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Classe Secretaria
 * Responsável pelo gerenciamento (CRUD) das pessoas cadastradas no sistema.
 */
public class Secretaria {

    private List<Pessoa> pessoas = new ArrayList<>();

    // Cadastra uma nova pessoa (Aluno ou Professor)
    public void cadastrar(Pessoa pessoa) {
        pessoas.add(pessoa);
        System.out.println("✔ " + pessoa.getNome() + " cadastrado(a) com sucesso.");
    }

    // Remove uma pessoa pelo CPF
    public void remover(String cpf) {
        boolean removido = pessoas.removeIf(p -> p.getCpf().equals(cpf));
        if (removido) {
            System.out.println("✔ Pessoa com CPF " + cpf + " removida.");
        } else {
            System.out.println("✘ CPF " + cpf + " não encontrado.");
        }
    }

    // Busca uma pessoa pelo CPF
    public Optional<Pessoa> buscarPorCpf(String cpf) {
        return pessoas.stream()
                .filter(p -> p.getCpf().equals(cpf))
                .findFirst();
    }

    // Lista todas as pessoas cadastradas
    public List<Pessoa> listarTodos() {
        return new ArrayList<>(pessoas);
    }

    // Lista apenas os alunos
    public List<Aluno> listarAlunos() {
        return pessoas.stream()
                .filter(p -> p instanceof Aluno)
                .map(p -> (Aluno) p)
                .collect(Collectors.toList());
    }

    // Lista apenas os professores
    public List<Professor> listarProfessores() {
        return pessoas.stream()
                .filter(p -> p instanceof Professor)
                .map(p -> (Professor) p)
                .collect(Collectors.toList());
    }

    // Exibe um resumo do sistema
    public void exibirResumo() {
        System.out.println("─────────────────────────────────");
        System.out.println("Total cadastrados : " + pessoas.size());
        System.out.println("Alunos            : " + listarAlunos().size());
        System.out.println("Professores       : " + listarProfessores().size());
        System.out.println("─────────────────────────────────");
    }
}
