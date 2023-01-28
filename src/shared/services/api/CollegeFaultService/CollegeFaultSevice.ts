import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface CollegeFaultProps {
  id: number;
  title: string;
  value: string;
  maxValue: string;
  subject: string;
}

export type CollegeFaultListProps = {
  data: CollegeFaultProps[];
}

const getAll = async (): Promise<CollegeFaultListProps | Error> => {
  try {
    const urlRelativa = `/falta`

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data, 
      }
    }

    return new Error('Erro ao listar os registros.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');

  }
};

const getById = async (id: number): Promise<CollegeFaultProps | Error> => {
  try {
    const { data } = await Api.get(`/falta/${id}`)

    if(data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.')
  }
};

const create = async (payload: Omit<CollegeFaultProps, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<CollegeFaultProps>('/falta', payload);

    if(data) {
      return data.id
    }

    return  new Error('Erro ao criar o registro.')
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao criar o registro.')
  }
};

const updateById = async (id: number, payload: CollegeFaultProps): Promise<void | Error> => {
  try {
    const { data } = await Api.put(`/falta/${id}`, payload);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.')
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const { data } = await Api.delete(`/falta/${id}`)

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.')
  }
};

export const NoteService = {
getAll,
getById,
create,
updateById,
deleteById
}