import { useState, useEffect } from 'react';
import { criar, atualizar } from '../services/vacinacaoService';

function Formulario({ registroEditando, onSucesso, onCancelarEdicao }) {
    const estadoInicial = {
        municipio: '',
        estado: '',
        vacina: '',
        dose: 'PRIMEIRA',
        quantidadeAplicada: '',
        dataRegistro: '',
    };

    const [dados, setDados] = useState(estadoInicial);
    const [dadosOriginais, setDadosOriginais] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState('');

    // Detecta se esta em modo edicao
    const modoEdicao = registroEditando !== null;

    // Quando recebe um registro para editar, preenche os campos
    useEffect(() => {
        if (registroEditando) {
            const dadosFormatados = {
                municipio: registroEditando.municipio,
                estado: registroEditando.estado,
                vacina: registroEditando.vacina,
                dose: registroEditando.dose,
                quantidadeAplicada: String(registroEditando.quantidadeAplicada),
                dataRegistro: registroEditando.dataRegistro,
            };
            setDados(dadosFormatados);
            setDadosOriginais(dadosFormatados);
            setMensagem(null);
        } else {
            setDados(estadoInicial);
            setDadosOriginais(null);
        }
    }, [registroEditando]);

    // Verifica se houve alteracao em relacao aos dados originais
    const houveAlteracao = () => {
        if (!dadosOriginais) return false;
        return JSON.stringify(dados) !== JSON.stringify(dadosOriginais);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensagem(null);

        try {
            const payload = {
                ...dados,
                municipio: dados.municipio.trim(),
                estado: dados.estado.trim().toUpperCase(),
                vacina: dados.vacina.trim(),
                quantidadeAplicada: parseInt(dados.quantidadeAplicada, 10),
            };

            let resultado;
            if (modoEdicao) {
                resultado = await atualizar(registroEditando.id, payload);
                setMensagem(`✅ Registro ID ${resultado.id} atualizado com sucesso!`);
            } else {
                resultado = await criar(payload);
                setMensagem(`✅ Registro cadastrado com sucesso! ID: ${resultado.id}`);
            }
            setTipoMensagem('sucesso');

            // Limpa o formulario se foi cadastro
            if (!modoEdicao) {
                setDados(estadoInicial);
            }

            // Avisa o Dashboard pra recarregar
            if (onSucesso) {
                onSucesso();
            }
        } catch (err) {
            console.error('Erro ao salvar:', err);
            const erroBackend = err.response?.data?.message || err.message;
            setMensagem(`❌ Erro: ${erroBackend}`);
            setTipoMensagem('erro');
        } finally {
            setEnviando(false);
        }
    };

    const handleCancelar = () => {
        setMensagem(null);
        if (onCancelarEdicao) {
            onCancelarEdicao();
        }
    };

    return (
        <div className="formulario-container">
            <h3>
                {modoEdicao
                    ? `✏️ Editando Registro #${registroEditando.id}`
                    : '➕ Novo Registro de Vacinação'}
            </h3>

            <form onSubmit={handleSubmit} className="formulario">
                <div className="formulario-grid">
                    <div className="form-item">
                        <label htmlFor="municipio">Município *</label>
                        <input
                            type="text"
                            id="municipio"
                            name="municipio"
                            placeholder="Ex: Santo André"
                            value={dados.municipio}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="estado">Estado (UF) *</label>
                        <input
                            type="text"
                            id="estado"
                            name="estado"
                            placeholder="Ex: SP"
                            maxLength="2"
                            value={dados.estado}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="vacina">Vacina *</label>
                        <input
                            type="text"
                            id="vacina"
                            name="vacina"
                            placeholder="Ex: BCG, Gripe, COVID-19"
                            value={dados.vacina}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="dose">Dose *</label>
                        <select
                            id="dose"
                            name="dose"
                            value={dados.dose}
                            onChange={handleChange}
                            required
                        >
                            <option value="PRIMEIRA">1ª dose</option>
                            <option value="SEGUNDA">2ª dose</option>
                            <option value="REFORCO">Reforço</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="quantidadeAplicada">Quantidade Aplicada *</label>
                        <input
                            type="number"
                            id="quantidadeAplicada"
                            name="quantidadeAplicada"
                            placeholder="Ex: 150"
                            min="1"
                            value={dados.quantidadeAplicada}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="dataRegistro">Data do Registro *</label>
                        <input
                            type="date"
                            id="dataRegistro"
                            name="dataRegistro"
                            value={dados.dataRegistro}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="formulario-acoes">
                    {modoEdicao && (
                        <button
                            type="button"
                            onClick={handleCancelar}
                            disabled={enviando}
                            className="btn-cancelar"
                        >
                            ❌ Cancelar
                        </button>
                    )}

                    {modoEdicao ? (
                        <button
                            type="submit"
                            disabled={enviando || !houveAlteracao()}
                            className="btn-cadastrar"
                        >
                            {enviando ? '⏳ Atualizando...' : '🔄 Atualizar Registro'}
                        </button>
                    ) : (
                        <button type="submit" disabled={enviando} className="btn-cadastrar">
                            {enviando ? '⏳ Cadastrando...' : '💾 Cadastrar Registro'}
                        </button>
                    )}
                </div>

                {mensagem && (
                    <div className={`form-mensagem form-${tipoMensagem}`}>{mensagem}</div>
                )}
            </form>
        </div>
    );
}

export default Formulario;