package escola;

/**
 * Classe Aluno
 * Herda de Pessoa e implementa a interface Autenticavel.
 */
public class Aluno extends Pessoa implements Autenticavel {

    private String curso;
    private int    periodo;

    public Aluno(String nome, String cpf, String curso, int periodo) {
        super(nome, cpf);
        this.curso   = curso;
        this.periodo = periodo;
    }

    // Getters e Setters
    public String getCurso() { return curso; }
    public void   setCurso(String curso) { this.curso = curso; }

    public int  getPeriodo() { return periodo; }
    public void setPeriodo(int periodo) { this.periodo = periodo; }

    // Implementação da interface Autenticavel
    @Override
    public void login() {
        System.out.println("Aluno " + getNome() + " acessou o sistema.");
        System.out.println(getNome() + " está estudando.");
    }

    // Implementação do método abstrato de Pessoa
    @Override
    public void mostrarDados() {
        System.out.println("=== Aluno ===");
        System.out.println("Nome:    " + getNome());
        System.out.println("CPF:     " + getCpf());
        System.out.println("Curso:   " + curso);
        System.out.println("Período: " + periodo);
    }
}
