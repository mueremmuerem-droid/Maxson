import { useState } from "react";

// Models
import Aluno from "./models/Aluno.js";
import Professor from "./models/Professor.js";
import Secretaria from "./models/Secretaria.js";

// Components
import {
  TIPO,
  Card,
  LogEntry,
  PessoaCard,
  FormInput,
} from "./components/UI.jsx";

// ─── Instância global da Secretaria com dados iniciais ────────────────────────
const secretaria = new Secretaria();
secretaria.cadastrar(new Aluno("Antedigmon", "123456789", "Engenharia Civil", 4));
secretaria.cadastrar(new Professor("Tiringa", "987654321", "Técnico de Produção", "Mestre"));

// ─── Componente principal (Main) ──────────────────────────────────────────────
export default function App() {
  const [pessoas, setPessoas] = useState(secretaria.listarTodos());
  const [log, setLog] = useState([]);
  const [tipo, setTipo] = useState(TIPO.ALUNO);
  const [filtro, setFiltro] = useState("todos");
  const [erro, setErro] = useState("");
  const [form, setForm] = useState({
    nome: "", cpf: "", curso: "", periodo: "", disciplina: "", titulacao: "",
  });

  const campo = (k) => (v) => setForm(prev => ({ ...prev, [k]: v }));
  const atualizar = () => setPessoas(secretaria.listarTodos());
  const addLog = (msg) => setLog(prev => [msg, ...prev].slice(0, 30));

  const handleLogin = (p) => addLog(p.login());
  const handleDados = (p) => addLog(p.mostrarDados());

  const handleRemover = (cpf) => {
    secretaria.remover(cpf);
    atualizar();
    addLog(`Pessoa com CPF ${cpf} foi removida do sistema.`);
  };

  const handleCadastrar = () => {
    setErro("");
    if (!form.nome.trim() || !form.cpf.trim()) {
      setErro("Nome e CPF são obrigatórios."); return;
    }
    if (secretaria.buscarPorCpf(form.cpf.trim())) {
      setErro("CPF já cadastrado."); return;
    }
    try {
      if (tipo === TIPO.ALUNO) {
        if (!form.curso.trim() || !form.periodo) {
          setErro("Preencha curso e período."); return;
        }
        secretaria.cadastrar(
          new Aluno(form.nome.trim(), form.cpf.trim(), form.curso.trim(), parseInt(form.periodo))
        );
      } else {
        if (!form.disciplina.trim() || !form.titulacao.trim()) {
          setErro("Preencha disciplina e titulação."); return;
        }
        secretaria.cadastrar(
          new Professor(form.nome.trim(), form.cpf.trim(), form.disciplina.trim(), form.titulacao.trim())
        );
      }
      atualizar();
      addLog(`${tipo === TIPO.ALUNO ? "Aluno" : "Professor"} ${form.nome.trim()} cadastrado com sucesso.`);
      setForm({ nome: "", cpf: "", curso: "", periodo: "", disciplina: "", titulacao: "" });
    } catch (e) {
      setErro(e.message);
    }
  };

  const lista =
    filtro === "alunos" ? secretaria.listarAlunos()
    : filtro === "professores" ? secretaria.listarProfessores()
    : secretaria.listarTodos();

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", padding: "28px 32px", color: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.8, marginBottom: 4 }}>
            Sistema Acadêmico
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}> Gestão de Pessoas</h1>
          <div style={{ opacity: 0.75, fontSize: 14, marginTop: 4 }}>
            {pessoas.length} pessoa{pessoas.length !== 1 ? "s" : ""} cadastrada{pessoas.length !== 1 ? "s" : ""}
            &nbsp;·&nbsp; {secretaria.listarAlunos().length} aluno{secretaria.listarAlunos().length !== 1 ? "s" : ""}
            &nbsp;·&nbsp; {secretaria.listarProfessores().length} professor{secretaria.listarProfessores().length !== 1 ? "es" : ""}
          </div>
        </div>
      </div>

      {/* ── Grid principal ── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "28px 20px",
        display: "grid", gridTemplateColumns: "1fr 340px", gap: 24,
      }}>

        {/* ── Coluna esquerda ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Formulário de cadastro */}
          <Card>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: "#1e293b" }}>➕ Cadastrar Pessoa</h2>

            {/* Seletor Aluno / Professor */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[TIPO.ALUNO, TIPO.PROFESSOR].map(t => (
                <button key={t} onClick={() => setTipo(t)} style={{
                  flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer",
                  fontWeight: 700, fontSize: 13, transition: "all .2s",
                  background: tipo === t ? (t === TIPO.ALUNO ? "#3b82f6" : "#8b5cf6") : "#f1f5f9",
                  color: tipo === t ? "#fff" : "#64748b",
                }}>
                  {t === TIPO.ALUNO ? " Aluno" : " Professor"}
                </button>
              ))}
            </div>

            {/* Campos do formulário */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <FormInput label="Nome completo" value={form.nome} onChange={campo("nome")} placeholder="Ex: João Silva" />
              <FormInput label="CPF" value={form.cpf} onChange={campo("cpf")} placeholder="Ex: 111222333" />
              {tipo === TIPO.ALUNO ? (
                <>
                  <FormInput label="Curso" value={form.curso} onChange={campo("curso")} placeholder="Ex: Engenharia Civil" />
                  <FormInput label="Período" type="number" value={form.periodo} onChange={campo("periodo")} placeholder="Ex: 4" />
                </>
              ) : (
                <>
                  <FormInput label="Disciplina" value={form.disciplina} onChange={campo("disciplina")} placeholder="Ex: Cálculo I" />
                  <FormInput label="Titulação" value={form.titulacao} onChange={campo("titulacao")} placeholder="Ex: Doutor" />
                </>
              )}
            </div>

            {erro && <div style={{ marginTop: 10, color: "#dc2626", fontSize: 13, fontWeight: 600 }}>⚠ {erro}</div>}

            <button onClick={handleCadastrar} style={{
              marginTop: 16, width: "100%", padding: "11px 0",
              background: tipo === TIPO.ALUNO ? "#3b82f6" : "#8b5cf6",
              color: "#fff", border: "none", borderRadius: 10, fontWeight: 700,
              fontSize: 14, cursor: "pointer",
            }}>
              Cadastrar {tipo === TIPO.ALUNO ? "Aluno" : "Professor"}
            </button>
          </Card>

          {/* Lista de pessoas */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}> Pessoas Cadastradas</h2>
              <div style={{ display: "flex", gap: 6 }}>
                {["todos", "alunos", "professores"].map(f => (
                  <button key={f} onClick={() => setFiltro(f)} style={{
                    padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer",
                    fontSize: 12, fontWeight: 600,
                    background: filtro === f ? "#4f46e5" : "#e2e8f0",
                    color: filtro === f ? "#fff" : "#475569",
                  }}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {lista.length === 0
              ? <Card><p style={{ color: "#94a3b8", textAlign: "center", margin: 0 }}>Nenhuma pessoa encontrada.</p></Card>
              : <div style={{ display: "grid", gap: 14 }}>
                  {lista.map(p => (
                    <PessoaCard
                      key={p.getCpf()} pessoa={p}
                      onLogin={handleLogin} onDados={handleDados} onRemover={handleRemover}
                    />
                  ))}
                </div>
            }
          </div>
        </div>

        {/* ── Coluna direita: Console ── */}
        <div>
          <Card style={{ position: "sticky", top: 20, maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b" }}>🖥 Console do Sistema</h2>
              {log.length > 0 && (
                <button onClick={() => setLog([])} style={{ background: "none", border: "none", fontSize: 12, color: "#94a3b8", cursor: "pointer" }}>
                  Limpar
                </button>
              )}
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {log.length === 0
                ? <p style={{ color: "#cbd5e1", fontSize: 13, textAlign: "center", marginTop: 40 }}>
                    Clique em <strong>Dados</strong> ou <strong>Login</strong> para ver a saída aqui.
                  </p>
                : log.map((msg, i) => <LogEntry key={i} msg={msg} idx={i} />)
              }
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
