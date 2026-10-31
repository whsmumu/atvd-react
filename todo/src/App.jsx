import { useEffect, useState } from 'react';
import Abas from './components/Abas.jsx';
import Acordeao from './components/Acordeao.jsx';
import BarraProgresso from './components/BarraProgresso.jsx';
import MenuSuspenso from './components/MenuSuspenso.jsx';
import ListaTarefas from './components/ListaTarefas.jsx';
import { useToast } from './ToastContext.jsx';


export default function App() {
  const mostrarToast = useToast();

  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem('tarefas'))
  );
  const [texto, setTexto] = useState('');
  const [prioridade, setPrioridade] = useState('Média');

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionar(evento) {
    evento.preventDefault();

    if (texto.trim() === '') {
      mostrarToast('Digite uma tarefa primeiro', 'erro');
      return;
    }

    const nova = { id: Date.now(), texto: texto.trim(), prioridade, feita: false };
    setTarefas([nova, ...tarefas]);
    setTexto('');
    mostrarToast('Tarefa adicionada', 'sucesso');
  }

  function alternar(id) {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t)));
  }

  function remover(id) {
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  const pendentes = tarefas.filter((t) => !t.feita);
  const concluidas = tarefas.filter((t) => t.feita);
  const progresso =
    tarefas.length === 0 ? 0 : Math.round((concluidas.length / tarefas.length) * 100);

  const abas = [
    {
      titulo: `Todas (${tarefas.length})`,
      conteudo: <ListaTarefas key="todas" tarefas={tarefas} onAlternar={alternar} onRemover={remover} />,
    },
    {
      titulo: `Pendentes (${pendentes.length})`,
      conteudo: <ListaTarefas key="pendentes" tarefas={pendentes} onAlternar={alternar} onRemover={remover} />,
    },
    {
      titulo: `Concluídas (${concluidas.length})`,
      conteudo: <ListaTarefas key="concluidas" tarefas={concluidas} onAlternar={alternar} onRemover={remover} />,
    },
  ];

  const resumo = ['Alta', 'Média', 'Baixa'].map((nivel) => {
    const doNivel = pendentes.filter((t) => t.prioridade === nivel);
    return {
      titulo: `${nivel} (${doNivel.length})`,
      texto: doNivel.length > 0 ? doNivel.map((t) => t.texto).join(', ') : 'Nada pendente.',
    };
  });

  return (
    <>
      <header className="topo">
        <h1>Minhas Tarefas</h1>
      </header>

      <main className="conteudo">
        <section className="caixa">
          <h2>Nova tarefa</h2>
          <form className="formulario" onSubmit={adicionar}>
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="O que precisa ser feito?"
              aria-label="Nova tarefa"
            />
            <MenuSuspenso
              titulo={'Prioridade: ' + prioridade}
              opcoes={['Alta', 'Média', 'Baixa']}
              onSelecionar={setPrioridade}
            />
            <button type="submit" className="principal">Adicionar</button>
          </form>
        </section>

        <div className="colunas">
          <section className="caixa">
            <h2>Tarefas</h2>
            <Abas abas={abas} />
          </section>

          <aside className="lateral">
            <section className="caixa">
              <h2>Progresso</h2>
              <BarraProgresso valor={progresso} />
              <p className="dica">{concluidas.length} de {tarefas.length} concluídas</p>
            </section>

            <section className="caixa">
              <h2>Pendentes por prioridade</h2>
              <Acordeao itens={resumo} />
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}