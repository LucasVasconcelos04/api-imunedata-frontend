function Abas({ abaAtiva, onMudarAba, modoEdicao }) {
    const abas = [
        { id: 'registros', label: '📊 Registros', cor: 'roxo' },
        { id: 'resumo', label: '📈 Resumo por Estado', cor: 'verde' },
        {
            id: 'cadastrar',
            label: modoEdicao ? '✏️ Editar Registro' : '➕ Cadastrar',
            cor: 'azul',
        },
        { id: 'importar', label: '📁 Importar CSV', cor: 'laranja' },
    ];

    return (
        <div className="abas-container">
            {abas.map((aba) => (
                <button
                    key={aba.id}
                    onClick={() => onMudarAba(aba.id)}
                    className={`aba-botao aba-${aba.cor} ${
                        abaAtiva === aba.id ? 'aba-ativa' : ''
                    }`}
                >
                    {aba.label}
                </button>
            ))}
        </div>
    );
}

export default Abas;