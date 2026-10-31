import { useEffect, useRef, useState } from 'react';

export default function MenuSuspenso({ titulo, opcoes, onSelecionar }) {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function cliqueFora(evento) {
      if (!menuRef.current.contains(evento.target)) {
        setAberto(false);
      }
    }
    document.addEventListener('click', cliqueFora);
    return () => document.removeEventListener('click', cliqueFora);
  }, []);

  function escolher(opcao) {
    onSelecionar(opcao);
    setAberto(false);
  }

  return (
    <div className="menu" ref={menuRef}>
      <button type="button" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
        {titulo} ▾
      </button>

      {aberto && (
        <ul className="menu-lista">
          {opcoes.map((opcao) => (
            <li key={opcao}>
              <button type="button" onClick={() => escolher(opcao)}>{opcao}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}