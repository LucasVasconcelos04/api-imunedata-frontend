function Tabela({ registros, registroSelecionadoId, onSelecionarRegistro }) {
    if (registros.length === 0) {
        return <p className="mensagem-vazia">Nenhum registro encontrado.</p>;
    }

    return (
        <div className="tabela-container">
            <table className="tabela">
                <thead>
                <tr>
                    <th className="th-checkbox"></th>
                    <th>ID</th>
                    <th>Município</th>
                    <th>Estado</th>
                    <th>Vacina</th>
                    <th>Dose</th>
                    <th>Quantidade Aplicada</th>
                    <th>Data do Registro</th>
                </tr>
                </thead>
                <tbody>
                {registros.map((registro) => {
                    const estaSelecionado = registro.id === registroSelecionadoId;
                    return (
                        <tr
                            key={registro.id}
                            className={estaSelecionado ? 'linha-selecionada' : ''}
                        >
                            <td className="td-checkbox">
                                <input
                                    type="checkbox"
                                    checked={estaSelecionado}
                                    onChange={() => onSelecionarRegistro(registro)}
                                    className="checkbox-registro"
                                />
                            </td>
                            <td>{registro.id}</td>
                            <td>{registro.municipio}</td>
                            <td>{registro.estado}</td>
                            <td>{registro.vacina}</td>
                            <td>{registro.dose}</td>
                            <td>{registro.quantidadeAplicada.toLocaleString('pt-BR')}</td>
                            <td>{new Date(registro.dataRegistro).toLocaleDateString('pt-BR')}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Tabela;