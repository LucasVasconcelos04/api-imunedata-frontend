import axios from 'axios';

// URL base do backend Spring Boot
const API_URL = 'http://localhost:8080/api/vacinacao';

// Cria uma instancia do axios com a URL base ja configurada
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ==========================================
// OPERACOES CRUD
// ==========================================

// Lista todos os registros
export const listarTodos = async () => {
    const response = await api.get('');
    return response.data;
};

// Busca um registro por ID
export const buscarPorId = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

// Cria um novo registro
export const criar = async (registro) => {
    const response = await api.post('', registro);
    return response.data;
};

// Atualiza um registro existente
export const atualizar = async (id, registro) => {
    const response = await api.put(`/${id}`, registro);
    return response.data;
};

// Deleta um registro
export const deletar = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

// ==========================================
// CONSULTAS ESPECIALIZADAS
// ==========================================

// Filtra registros por tipo de vacina
export const buscarPorVacina = async (vacina) => {
    const response = await api.get(`/vacina/${vacina}`);
    return response.data;
};

// Filtra registros por estado (sigla UF)
export const buscarPorEstado = async (estado) => {
    const response = await api.get(`/estado/${estado}`);
    return response.data;
};

// Filtra registros por regiao geografica
export const buscarPorRegiao = async (regiao) => {
    const response = await api.get(`/regiao/${regiao}`);
    return response.data;
};

// ==========================================
// IMPORTACAO DE CSV
// ==========================================

// Importa registros via arquivo CSV
export const importarCsv = async (arquivo) => {
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    const response = await api.post('/upload-csv', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};