import { useState } from 'react';

export default function Acordeao({ itens }) {
  const [aberto, setAberto] = useState(null);

  return (
    <div>
      {itens.map((item, i) => (
        <div key={i}>
          <button
            className="acordeao-titulo"
            aria-expanded={aberto === i}
            onClick={() => setAberto(aberto === i ? null : i)}
          >
            {item.titulo}
            <span>{aberto === i ? '−' : '+'}</span>
          </button>

          <div className={aberto === i ? 'acordeao-painel aberto' : 'acordeao-painel'}>
            <p>{item.texto}</p>
          </div>
        </div>
      ))}
    </div>
  );
}