function Filtros({ filtros, onFiltroChange, onLimpar }) {
    return (
        <div className="filtros-container">
            <h3>🔍 Filtros</h3>

            <div className="filtros-grid">
                <div className="filtro-item">
                    <label htmlFor="vacina">Vacina:</label>
                    <input
                        type="text"
                        id="vacina"
                        name="vacina"
                        placeholder="Ex: BCG, Gripe, COVID-19"
                        value={filtros.vacina}
                        onChange={onFiltroChange}
                    />
                </div>

                <div className="filtro-item">
                    <label htmlFor="estado">Estado (UF):</label>
                    <input
                        type="text"
                        id="estado"
                        name="estado"
                        placeholder="Ex: SP, RJ, MG"
                        maxLength="2"
                        value={filtros.estado}
                        onChange={onFiltroChange}
                    />
                </div>

                <div className="filtro-item">
                    <label htmlFor="regiao">Região:</label>
                    <select
                        id="regiao"
                        name="regiao"
                        value={filtros.regiao}
                        onChange={onFiltroChange}
                    >
                        <option value="">Todas as regiões</option>
                        <option value="NORTE">Norte</option>
                        <option value="NORDESTE">Nordeste</option>
                        <option value="CENTRO_OESTE">Centro-Oeste</option>
                        <option value="SUDESTE">Sudeste</option>
                        <option value="SUL">Sul</option>
                    </select>
                </div>

                <div className="filtro-item">
                    <button onClick={onLimpar} className="btn-limpar">
                        Limpar filtros
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filtros;