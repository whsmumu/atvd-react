import { useState } from 'react';
import { useToast } from '../ToastContext.jsx';
import Paginacao from './Paginacao.jsx';

const POR_PAGINA = 4;

export default function ListaTarefas({ tarefas, onAlternar, onRemover }) {
  const [pagina, setPagina] = useState(1);
  const mostrarToast = useToast();

  if (tarefas.length === 0) {
    return <p className="vazio">Nenhuma tarefa aqui.</p>;
  }

  const totalPaginas = Math.ceil(tarefas.length / POR_PAGINA);
  const paginaAtual = Math.min(pagina, totalPaginas);
  const visiveis = tarefas.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

  return (
    <>
      <ul className="lista">
        {visiveis.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.feita ? 'tarefa feita' : 'tarefa'}>
            <label>
              <input
                type="checkbox"
                checked={tarefa.feita}
                onChange={() => onAlternar(tarefa.id)}
              />
              {tarefa.texto}
            </label>
            <span className={'etiqueta ' + tarefa.prioridade}>{tarefa.prioridade}</span>
            <button
              onClick={() => {
                onRemover(tarefa.id);
                mostrarToast('Tarefa removida', 'info');
              }}
              aria-label={'Remover ' + tarefa.texto}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {totalPaginas > 1 && (
        <Paginacao totalPaginas={totalPaginas} paginaAtual={paginaAtual} onMudar={setPagina} />
      )}
    </>
  );
}