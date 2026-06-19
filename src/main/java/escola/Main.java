package escola;

/**
 * Classe Main
 * Ponto de entrada do sistema de gestão de pessoas.
 * Demonstra o uso de todas as classes e da interface Autenticavel.
 */
public class Main {

    public static void main(String[] args) {

        // ── Instância da Secretaria ───────────────────────────────────────────
        Secretaria secretaria = new Secretaria();

        // ── Cadastro de pessoas ───────────────────────────────────────────────
        Aluno aluno1 = new Aluno("Antedigmon", "123456789", "Engenharia Civil", 4);
        Professor prof1 = new Professor("Tiringa", "987654321", "Técnico de Produção", "Mestre");

        secretaria.cadastrar(aluno1);
        secretaria.cadastrar(prof1);

        System.out.println();

        // ── Exibir dados ──────────────────────────────────────────────────────
        aluno1.mostrarDados();
        System.out.println();
        prof1.mostrarDados();
        System.out.println();

        // ── Login (interface Autenticavel) ────────────────────────────────────
        aluno1.login();
        System.out.println();
        prof1.login();
        System.out.println();

        // ── Resumo da Secretaria ──────────────────────────────────────────────
        secretaria.exibirResumo();

        // ── Busca por CPF ─────────────────────────────────────────────────────
        System.out.println("\nBusca por CPF 123456789:");
        secretaria.buscarPorCpf("123456789")
                .ifPresentOrElse(
                        Pessoa::mostrarDados,
                        () -> System.out.println("Pessoa não encontrada.")
                );

        // ── Cadastro extra + remoção ──────────────────────────────────────────
        System.out.println();
        Aluno aluno2 = new Aluno("Maria Souza", "111222333", "Ciência da Computação", 2);
        secretaria.cadastrar(aluno2);
        secretaria.exibirResumo();

        System.out.println("\nRemovendo Maria Souza...");
        secretaria.remover("111222333");
        secretaria.exibirResumo();

        // ── Listagem final ────────────────────────────────────────────────────
        System.out.println("Alunos cadastrados:");
        secretaria.listarAlunos().forEach(a -> System.out.println("  • " + a.getNome()));

        System.out.println("Professores cadastrados:");
        secretaria.listarProfessores().forEach(p -> System.out.println("  • " + p.getNome()));
    }
}
