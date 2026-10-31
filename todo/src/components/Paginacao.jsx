export default function Paginacao({ totalPaginas, paginaAtual, onMudar }) {
  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <nav className="paginacao" aria-label="Paginação">
      <button onClick={() => onMudar(paginaAtual - 1)} disabled={paginaAtual === 1}>
        Anterior
      </button>

      {paginas.map((numero) => (
        <button
          key={numero}
          className={numero === paginaAtual ? 'ativo' : ''}
          aria-current={numero === paginaAtual ? 'page' : undefined}
          onClick={() => onMudar(numero)}
        >
          {numero}
        </button>
      ))}

      <button onClick={() => onMudar(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
        Próxima
      </button>
    </nav>
  );
}