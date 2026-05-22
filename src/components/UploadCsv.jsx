import { useState, useRef } from 'react';
import { importarCsv } from '../services/vacinacaoService';

function UploadCsv({ onUploadSucesso }) {
    const [enviando, setEnviando] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const [tipoMensagem, setTipoMensagem] = useState(''); // 'sucesso' ou 'erro'
    const inputFileRef = useRef(null);

    // Funcao chamada quando o usuario seleciona um arquivo
    const handleArquivoSelecionado = async (e) => {
        const arquivo = e.target.files[0];

        // Validacao: nenhum arquivo selecionado
        if (!arquivo) {
            return;
        }

        // Validacao: extensao .csv
        if (!arquivo.name.toLowerCase().endsWith('.csv')) {
            setMensagem('O arquivo deve ter extensão .csv');
            setTipoMensagem('erro');
            return;
        }

        // Envia o arquivo pro backend
        setEnviando(true);
        setMensagem(null);

        try {
            const resultado = await importarCsv(arquivo);

            setMensagem(
                `✅ Importação concluída! ${resultado.totalRegistrosImportados} registro(s) adicionado(s).`
            );
            setTipoMensagem('sucesso');

            // Notifica o componente pai pra recarregar a lista
            if (onUploadSucesso) {
                onUploadSucesso();
            }
        } catch (err) {
            console.error('Erro ao enviar CSV:', err);
            const erroBackend = err.response?.data?.erro || err.message;
            setMensagem(`❌ Erro ao importar: ${erroBackend}`);
            setTipoMensagem('erro');
        } finally {
            setEnviando(false);
            // Limpa o input pra permitir reenviar o mesmo arquivo
            if (inputFileRef.current) {
                inputFileRef.current.value = '';
            }
        }
    };

    // Funcao que abre o seletor de arquivo (botao customizado)
    const handleClickBotao = () => {
        inputFileRef.current.click();
    };

    return (
        <div className="upload-container">
            <h3>📁 Importar CSV</h3>

            <div className="upload-conteudo">
                <input
                    type="file"
                    accept=".csv"
                    ref={inputFileRef}
                    onChange={handleArquivoSelecionado}
                    style={{ display: 'none' }}
                />

                <button
                    onClick={handleClickBotao}
                    disabled={enviando}
                    className="btn-upload"
                >
                    {enviando ? '⏳ Enviando...' : '📤 Selecionar arquivo CSV'}
                </button>

                <p className="upload-info">
                    Formato esperado: separador <code>;</code> e encoding UTF-8
                </p>

                {mensagem && (
                    <div className={`upload-mensagem upload-${tipoMensagem}`}>
                        {mensagem}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UploadCsv;