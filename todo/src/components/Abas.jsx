import { useState } from "react";

export default function Abas({ abas }) {
  const [ativa, setAtiva] = useState(0);

  return (
    <div>
      <div className="abas-botoes" role="tablist">
        {abas.map((aba, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={ativa === i}
            className={ativa === i ? 'ativo' : ''}
            onClick={() => setAtiva(i)}
          >
            {aba.titulo}
          </button>
        ))}
      </div>

      <div role="tabpanel">{abas[ativa].conteudo}</div>
    </div>
  );
}