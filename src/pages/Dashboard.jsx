import { useState, useEffect, useMemo } from 'react';
import { listarTodos, deletar } from '../services/vacinacaoService';
import Tabela from '../components/Tabela';
import Filtros from '../components/Filtros';
import UploadCsv from '../components/UploadCsv';
import Formulario from '../components/Formulario';
import ResumoPorEstado from '../components/ResumoPorEstado';
import BarraAcoes from '../components/BarraAcoes';
import ModalConfirmacao from '../components/ModalConfirmacao';
import Abas from '../components/Abas';

const ESTADOS_POR_REGIAO = {
    NORTE: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
    NORDESTE: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
    CENTRO_OESTE: ['DF', 'GO', 'MT', 'MS'],
    SUDESTE: ['ES', 'MG', 'RJ', 'SP'],
    SUL: ['PR', 'RS', 'SC'],
};

function Dashboard() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    const [filtros, setFiltros] = useState({
        vacina: '',
        estado: '',
        regiao: '',
    });

    // Estados de edicao e delecao
    const [registroSelecionado, setRegistroSelecionado] = useState(null);
    const [registroEditando, setRegistroEditando] = useState(null);
    const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
    const [deletando, setDeletando] = useState(false);
    const [mensagemGlobal, setMensagemGlobal] = useState(null);

    // Estado da aba ativa
    const [abaAtiva, setAbaAtiva] = useState('registros');

    useEffect(() => {
        carregarTodos();
    }, []);

    const carregarTodos = async () => {
        setCarregando(true);
        setErro(null);
        try {
            const dados = await listarTodos();
            setRegistros(dados);
        } catch (err) {
            console.error('Erro ao carregar registros:', err);
            setErro('Erro ao carregar registros. Verifique se o backend esta rodando.');
        } finally {
            setCarregando(false);
        }
    };

    const registrosFiltrados = useMemo(() => {
        let resultado = [...registros];

        if (filtros.vacina.trim()) {
            const termo = filtros.vacina.trim().toLowerCase();
            resultado = resultado.filter((r) =>
                r.vacina.toLowerCase().includes(termo)
            );
        }

        if (filtros.estado.trim()) {
            const uf = filtros.estado.trim().toUpperCase();
            resultado = resultado.filter((r) => r.estado === uf);
        }

        if (filtros.regiao) {
            const estadosDaRegiao = ESTADOS_POR_REGIAO[filtros.regiao] || [];
            resultado = resultado.filter((r) => estadosDaRegiao.includes(r.estado));
        }

        return resultado;
    }, [registros, filtros]);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const handleLimparFiltros = () => {
        setFiltros({ vacina: '', estado: '', regiao: '' });
    };

    // Troca de aba
    const handleMudarAba = (novaAba) => {
        setAbaAtiva(novaAba);
    };

    const handleUploadSucesso = () => {
        handleLimparFiltros();
        carregarTodos();
        setRegistroSelecionado(null);
        setRegistroEditando(null);
        // Apos importar, vai pra aba Registros pra ver os dados
        setAbaAtiva('registros');
    };

    const handleSucessoFormulario = () => {
        carregarTodos();
        setRegistroSelecionado(null);
        setRegistroEditando(null);
        // Apos cadastrar/atualizar, vai pra aba Registros
        setAbaAtiva('registros');
    };

    // Selecao de registro
    const handleSelecionarRegistro = (registro) => {
        if (registroSelecionado?.id === registro.id) {
            setRegistroSelecionado(null);
        } else {
            setRegistroSelecionado(registro);
        }
    };

    const handleLimparSelecao = () => {
        setRegistroSelecionado(null);
    };

    // Iniciar edicao -> muda pra aba Cadastrar
    const handleIniciarEdicao = () => {
        setRegistroEditando(registroSelecionado);
        setRegistroSelecionado(null);
        setAbaAtiva('cadastrar');
    };

    const handleCancelarEdicao = () => {
        setRegistroEditando(null);
        // Ao cancelar edicao, volta pra aba Registros
        setAbaAtiva('registros');
    };

    // Delecao
    const handleAbrirModalDeletar = () => {
        setModalDeletarAberto(true);
    };

    const handleCancelarDelecao = () => {
        setModalDeletarAberto(false);
    };

    const handleConfirmarDelecao = async () => {
        if (!registroSelecionado) return;

        setDeletando(true);
        try {
            await deletar(registroSelecionado.id);
            setMensagemGlobal(
                `✅ Registro ID ${registroSelecionado.id} deletado com sucesso!`
            );
            setRegistroSelecionado(null);
            setModalDeletarAberto(false);
            await carregarTodos();

            setTimeout(() => setMensagemGlobal(null), 5000);
        } catch (err) {
            console.error('Erro ao deletar:', err);
            setMensagemGlobal(`❌ Erro ao deletar: ${err.message}`);
            setTimeout(() => setMensagemGlobal(null), 5000);
        } finally {
            setDeletando(false);
        }
    };

    // Renderiza o conteudo da aba ativa
    const renderConteudoAba = () => {
        switch (abaAtiva) {
            case 'registros':
                return (
                    <>
                        <Filtros
                            filtros={filtros}
                            onFiltroChange={handleFiltroChange}
                            onLimpar={handleLimparFiltros}
                        />

                        <div className="dashboard-conteudo">
                            <h2>📊 Registros de Vacinação</h2>
                            <p className="info-total">
                                Total exibido: <strong>{registrosFiltrados.length}</strong>
                                {registrosFiltrados.length !== registros.length && (
                                    <span> (de {registros.length} no total)</span>
                                )}
                            </p>

                            {mensagemGlobal && (
                                <div className="mensagem-global">{mensagemGlobal}</div>
                            )}

                            <BarraAcoes
                                registroSelecionado={registroSelecionado}
                                onAtualizar={handleIniciarEdicao}
                                onDeletar={handleAbrirModalDeletar}
                                onLimparSelecao={handleLimparSelecao}
                            />

                            {erro && <p className="erro">{erro}</p>}
                            {carregando && <p className="carregando">⏳ Carregando...</p>}

                            {!carregando && !erro && (
                                <Tabela
                                    registros={registrosFiltrados}
                                    registroSelecionadoId={registroSelecionado?.id}
                                    onSelecionarRegistro={handleSelecionarRegistro}
                                />
                            )}
                        </div>
                    </>
                );

            case 'resumo':
                return (
                    <div className="dashboard-conteudo">
                        {registros.length === 0 ? (
                            <p className="mensagem-vazia">
                                Nenhum registro disponível para análise.
                            </p>
                        ) : (
                            <ResumoPorEstado registros={registros} />
                        )}
                    </div>
                );

            case 'cadastrar':
                return (
                    <Formulario
                        registroEditando={registroEditando}
                        onSucesso={handleSucessoFormulario}
                        onCancelarEdicao={handleCancelarEdicao}
                    />
                );

            case 'importar':
                return <UploadCsv onUploadSucesso={handleUploadSucesso} />;

            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>💉 ImuniData</h1>
                <p>Sistema de Monitoramento de Vacinação</p>
            </header>

            <Abas
                abaAtiva={abaAtiva}
                onMudarAba={handleMudarAba}
                modoEdicao={registroEditando !== null}
            />

            <div className="conteudo-aba">{renderConteudoAba()}</div>

            <ModalConfirmacao
                aberto={modalDeletarAberto}
                mensagem={
                    registroSelecionado
                        ? `Deseja mesmo deletar o registro #${registroSelecionado.id} (${registroSelecionado.municipio}/${registroSelecionado.estado} - ${registroSelecionado.vacina})?`
                        : ''
                }
                onConfirmar={handleConfirmarDelecao}
                onCancelar={handleCancelarDelecao}
                enviando={deletando}
            />
        </div>
    );
}

export default Dashboard;