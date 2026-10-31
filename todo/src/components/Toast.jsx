export default function Toast({ mensagem, tipo, onFechar }) {
  return (
    <div className={`toast ${tipo}`} role="status">
      {mensagem}
      <button onClick={onFechar} aria-label="Fechar">×</button>
    </div>
  );
}