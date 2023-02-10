import { Api } from "../axios-config";

export interface EventProps {
  id: number;
  title: string;
  subject: string;
  date: string;
  content: string;
}

export type EventListProps = {
  data: EventProps[];
}

const getAll = async (): Promise<EventListProps | Error> => {
  try {
    const urlRelativa = `/event`

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

const getById = async (id: number): Promise<EventProps | Error> => {
  try {
    const { data } = await Api.get(`/event/${id}`)

    if(data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.')
  }
};

const create = async (payload: Omit<EventProps, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<EventProps>('/event', payload);

    if(data) {
      return data.id
    }

    return  new Error('Erro ao criar o registro.')
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string}).message || 'Erro ao criar o registro.')
  }
};

const updateById = async (id: number, payload: EventProps): Promise<void | Error> => {
  try {
    const { data } = await Api.put(`/event/${id}`, payload);

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.')
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const { data } = await Api.delete(`/event/${id}`)

  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.')
  }
};

export const EventService = {
getAll,
getById,
create,
updateById,
deleteById
}