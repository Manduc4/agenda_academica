import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface ListProps {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export interface ItemProps {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export type ListWithTotalType = {
  data: ListProps[];
  totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<ListWithTotalType | Error> => {
  try {
    const urlRelativa = `/list?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data, 
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
      }
    }

    return new Error('Erro ao listar os registros.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');

  }
};

const getById = async (id: number): Promise<ItemProps | Error> => {
  try {
    const { data } = await Api.get(`/list/${id}`)

    if(data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.')
  }
};

const create = async (payload: Omit<ItemProps, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ItemProps>('/list', payload);

    if(data) {
      return data.id
    }

    return  new Error('Erro ao criar o registro.')
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao criar o registro.')
  }
};

const updateById = async (id: number, payload: ItemProps): Promise<void | Error> => {
  try {
    const { data } = await Api.put(`/list/${id}`, payload);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.')
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const { data } = await Api.delete(`/list/${id}`)

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.')
  }
};

export const ExampleService = {
getAll,
getById,
create,
updateById,
deleteById
}