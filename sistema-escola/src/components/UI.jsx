import Aluno from "../models/Aluno.js";

// ─── Constantes ───────────────────────────────────────────────────────────────
export const TIPO = { ALUNO: "aluno", PROFESSOR: "professor" };

// ─── Badge de tipo ────────────────────────────────────────────────────────────
export function Badge({ tipo }) {
  const isAluno = tipo === TIPO.ALUNO;
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
      padding: "2px 10px", borderRadius: 20,
      background: isAluno ? "#dbeafe" : "#ede9fe",
      color: isAluno ? "#1d4ed8" : "#6d28d9",
      textTransform: "uppercase",
    }}>
      {isAluno ? "Aluno" : "Professor"}
    </span>
  );
}

// ─── Card genérico ────────────────────────────────────────────────────────────
export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      padding: "20px 24px", ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Linha do console ─────────────────────────────────────────────────────────
export function LogEntry({ msg, idx }) {
  return (
    <div style={{
      fontFamily: "'Fira Mono', 'Courier New', monospace", fontSize: 13,
      background: idx % 2 === 0 ? "#f8fafc" : "#f1f5f9",
      borderLeft: "3px solid #6366f1", padding: "10px 14px",
      marginBottom: 6, borderRadius: "0 8px 8px 0",
      whiteSpace: "pre-wrap", color: "#1e293b",
    }}>
      <span style={{ color: "#94a3b8", marginRight: 8 }}>[{idx + 1}]</span>
      {msg}
    </div>
  );
}

// ─── Estilo de botão ──────────────────────────────────────────────────────────
export function btnStyle(bg, color) {
  return {
    background: bg, color, border: "none", borderRadius: 8,
    padding: "6px 14px", fontWeight: 600, fontSize: 12,
    cursor: "pointer", transition: "opacity .15s",
  };
}

// ─── Input de formulário ──────────────────────────────────────────────────────
export function FormInput({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "8px 12px",
          fontSize: 14, outline: "none", color: "#0f172a",
          background: "#f8fafc", transition: "border .15s",
        }}
        onFocus={e => (e.target.style.borderColor = "#6366f1")}
        onBlur={e => (e.target.style.borderColor = "#e2e8f0")}
      />
    </div>
  );
}

// ─── Card de pessoa ───────────────────────────────────────────────────────────
export function PessoaCard({ pessoa, onLogin, onDados, onRemover }) {
  const isAluno = pessoa instanceof Aluno;
  const cor = isAluno ? "#3b82f6" : "#8b5cf6";
  return (
    <Card style={{ borderTop: `4px solid ${cor}`, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#0f172a" }}>{pessoa.getNome()}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>CPF: {pessoa.getCpf()}</div>
        </div>
        <Badge tipo={isAluno ? TIPO.ALUNO : TIPO.PROFESSOR} />
      </div>
      <div style={{ fontSize: 13, color: "#475569" }}>
        {isAluno
          ? <><strong>Curso:</strong> {pessoa.getCurso()} &nbsp;|&nbsp; <strong>Período:</strong> {pessoa.getPeriodo()}º</>
          : <><strong>Disciplina:</strong> {pessoa.getDisciplina()} &nbsp;|&nbsp; <strong>Titulação:</strong> {pessoa.getTitulacao()}</>
        }
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => onDados(pessoa)} style={btnStyle("#e0f2fe", "#0369a1")}>📋 Dados</button>
        <button onClick={() => onLogin(pessoa)} style={btnStyle("#ede9fe", "#5b21b6")}>🔑 Login</button>
        <button onClick={() => onRemover(pessoa.getCpf())} style={btnStyle("#fee2e2", "#b91c1c")}>🗑 Remover</button>
      </div>
    </Card>
  );
}
