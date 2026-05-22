import { useMemo } from 'react';

function ResumoPorEstado({ registros }) {
    // Agrega os totais por estado usando useMemo (so recalcula quando registros mudam)
    const resumo = useMemo(() => {
        const totais = {};

        registros.forEach((registro) => {
            const estado = registro.estado;
            if (!totais[estado]) {
                totais[estado] = {
                    totalDoses: 0,
                    totalRegistros: 0,
                };
            }
            totais[estado].totalDoses += registro.quantidadeAplicada;
            totais[estado].totalRegistros += 1;
        });

        // Converte o objeto em array e ordena por total de doses (decrescente)
        return Object.entries(totais)
            .map(([estado, dados]) => ({ estado, ...dados }))
            .sort((a, b) => b.totalDoses - a.totalDoses);
    }, [registros]);

    if (registros.length === 0) {
        return null;
    }

    return (
        <div className="resumo-container">
            <h3>📈 Resumo por Estado</h3>
            <p className="resumo-info">
                Total de doses aplicadas agrupadas por unidade federativa
            </p>

            <div className="resumo-grid">
                {resumo.map((item) => (
                    <div key={item.estado} className="resumo-card">
                        <div className="resumo-estado">{item.estado}</div>
                        <div className="resumo-doses">
                            {item.totalDoses.toLocaleString('pt-BR')}
                        </div>
                        <div className="resumo-label">doses aplicadas</div>
                        <div className="resumo-registros">
                            {item.totalRegistros} {item.totalRegistros === 1 ? 'registro' : 'registros'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResumoPorEstado;