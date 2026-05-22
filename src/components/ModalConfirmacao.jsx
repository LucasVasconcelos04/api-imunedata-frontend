function ModalConfirmacao({ aberto, mensagem, onConfirmar, onCancelar, enviando }) {
    if (!aberto) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onCancelar}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>⚠️ Confirmação</h3>
                </div>
                <div className="modal-body">
                    <p>{mensagem}</p>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={onCancelar}
                        disabled={enviando}
                        className="btn-modal btn-modal-cancelar"
                    >
                        Não
                    </button>
                    <button
                        onClick={onConfirmar}
                        disabled={enviando}
                        className="btn-modal btn-modal-confirmar"
                    >
                        {enviando ? '⏳ Deletando...' : 'Sim, deletar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacao;