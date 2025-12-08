import { api } from '../api';
import { Prioridade, Status } from '../types';

export interface Ocorrencia {
  id: number;
  tipo: string;
  bairro: string;
  prioridade: Prioridade;
  status: Status;
  numVitimas: number;
  custo: number;
  batalhao?: string;
  descricao?: string;
  createdAt: string;
  updatedAt: string;
}

export type CriarOcorrenciaDTO = {
  tipo: string;
  bairro: string;
  prioridade?: Prioridade;
  status?: Status;
  numVitimas?: number;
  custo?: number;
  batalhao?: string;
  descricao?: string;
};

export type AtualizarOcorrenciaDTO = Partial<CriarOcorrenciaDTO>;

export async function listarOcorrencias(): Promise<Ocorrencia[]> {
  const response = await api.get<Ocorrencia[]>('/ocorrencias');
  return response.data;
}

export async function buscarOcorrencia(id: number): Promise<Ocorrencia> {
  const response = await api.get<Ocorrencia>(`/ocorrencias/${id}`);
  return response.data;
}

export async function criarOcorrencia(data: CriarOcorrenciaDTO): Promise<Ocorrencia> {
  const response = await api.post<Ocorrencia>('/ocorrencias', data);
  return response.data;
}

export async function atualizarOcorrencia(id: number, data: AtualizarOcorrenciaDTO): Promise<Ocorrencia> {
  const response = await api.put<Ocorrencia>(`/ocorrencias/${id}`, data);
  return response.data;
}

export async function deletarOcorrencia(id: number): Promise<void> {
  await api.delete(`/ocorrencias/${id}`);
}