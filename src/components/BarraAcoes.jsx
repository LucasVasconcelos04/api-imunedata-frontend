function BarraAcoes({ registroSelecionado, onAtualizar, onDeletar, onLimparSelecao }) {
    if (!registroSelecionado) {
        return null;
    }

    return (
        <div className="barra-acoes">
            <div className="barra-acoes-info">
                <span className="barra-acoes-icon">✓</span>
                <span>
          <strong>1 registro selecionado:</strong> ID {registroSelecionado.id} —{' '}
                    {registroSelecionado.municipio}/{registroSelecionado.estado} —{' '}
                    {registroSelecionado.vacina}
        </span>
            </div>
            <div className="barra-acoes-botoes">
                <button onClick={onAtualizar} className="btn-acao btn-acao-atualizar">
                    ✏️ Atualizar
                </button>
                <button onClick={onDeletar} className="btn-acao btn-acao-deletar">
                    🗑️ Deletar
                </button>
                <button onClick={onLimparSelecao} className="btn-acao btn-acao-fechar">
                    ✕
                </button>
            </div>
        </div>
    );
}

export default BarraAcoes;