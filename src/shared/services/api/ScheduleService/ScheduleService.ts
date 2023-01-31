import { Api } from "../axios-config";

type dayOfWeek = 'segunda'|'terca'|'quarta'|'quinta'|'sexta'|'sabado'|'domingo'

export interface ScheduleProps {
  id: number;
  subject: string;
  dayOfWeek: dayOfWeek| '';
  start: string;
  end: string;
}

export type ScheduleListProps = {
  data: ScheduleProps[];
}

const getAll = async (): Promise<ScheduleListProps | Error> => {
  try {
    const urlRelativa = `/schedule`

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

const getById = async (id: number): Promise<ScheduleProps | Error> => {
  try {
    const { data } = await Api.get(`/schedule/${id}`)

    if(data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.')
  }
};

const create = async (payload: Omit<ScheduleProps, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<ScheduleProps>('/schedule', payload);

    if(data) {
      return data.id
    }

    return  new Error('Erro ao criar o registro.')
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao criar o registro.')
  }
};

const updateById = async (id: number, payload: ScheduleProps): Promise<void | Error> => {
  try {
    const { data } = await Api.put(`/schedule/${id}`, payload);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.')
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const { data } = await Api.delete(`/schedule/${id}`)

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.')
  }
};

export const ScheduleService = {
getAll,
getById,
create,
updateById,
deleteById
}