package escola;

/**
 * Classe Abstrata: Pessoa
 * Não pode ser instanciada diretamente.
 * Atributos privados: nome e cpf.
 */
public abstract class Pessoa {

    private String nome;
    private String cpf;

    public Pessoa(String nome, String cpf) {
        this.nome = nome;
        this.cpf  = cpf;
    }

    // Getters e Setters
    public String getNome() { return nome; }
    public void   setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void   setCpf(String cpf) { this.cpf = cpf; }

    // Método abstrato — obrigatório nas subclasses
    public abstract void mostrarDados();
}
