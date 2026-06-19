package escola;

/**
 * Classe Professor
 * Herda de Pessoa e implementa a interface Autenticavel.
 */
public class Professor extends Pessoa implements Autenticavel {

    private String disciplina;
    private String titulacao;

    public Professor(String nome, String cpf, String disciplina, String titulacao) {
        super(nome, cpf);
        this.disciplina = disciplina;
        this.titulacao  = titulacao;
    }

    // Getters e Setters
    public String getDisciplina() { return disciplina; }
    public void   setDisciplina(String disciplina) { this.disciplina = disciplina; }

    public String getTitulacao() { return titulacao; }
    public void   setTitulacao(String titulacao) { this.titulacao = titulacao; }

    // Implementação da interface Autenticavel
    @Override
    public void login() {
        System.out.println("Professor " + getNome() + " acessou o sistema.");
        System.out.println(getNome() + " está dando aula.");
    }

    // Implementação do método abstrato de Pessoa
    @Override
    public void mostrarDados() {
        System.out.println("=== Professor ===");
        System.out.println("Nome:       " + getNome());
        System.out.println("Disciplina: " + disciplina);
        System.out.println("Titulação:  " + titulacao);
    }
}
