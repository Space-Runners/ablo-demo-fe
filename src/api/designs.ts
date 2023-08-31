import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Design, DesignSide } from '@/components/types';

const URL = `/designs`;

const getDesignSides = (designId, includeCanvasState = false) =>
  axios.get<DesignSide[]>(`${URL}/${designId}/sides`).then(({ data }) => {
    if (!includeCanvasState) {
      return data;
    }

    return Promise.all(
      data.map((side) =>
        axios
          .get<string>(side.canvasStateUrl)
          .then(({ data: canvasState }) => ({ ...side, canvasState }))
      )
    );
  });

const getDesigns = () =>
  axios
    .get<Design[]>(URL)
    .then(({ data }) =>
      Promise.all(
        data.map((design) =>
          getDesignSides(design.id).then((sides) => ({ ...design, sides: sides.reverse() }))
        )
      )
    );

export const useDesigns = () => useQuery(['designs'], () => getDesigns());

export const getDesign = (id: string) =>
  axios.get<Design>(`${URL}/${id}`).then(({ data }) =>
    getDesignSides(id, true).then((sides) => ({
      ...data,
      sides,
    }))
  );

export const useDesign = (id: string) => useQuery(['design', id], () => getDesign(id));

const createDesignSide = (designSide: DesignSide, designId): Promise<DesignSide> =>
  axios.post<DesignSide>(`${URL}/${designId}/sides`, designSide).then(({ data }) => data);

const createDesign = (design: Design): Promise<Design> => {
  const { sides } = design;

  return axios.post<Design>(URL, design).then(({ data }) => {
    const designId = data.id;

    return Promise.all(sides.map((side) => createDesignSide(side, designId))).then((newSides) => ({
      ...data,
      sides: newSides,
    }));
  });
};

const updateDesign = (design: Design) => {
  return axios.put<Design>(`${URL}/${design.id}`, design).then(({ data }) => data);
};

export const saveDesign = (design: Design) => {
  const method = design.id ? updateDesign : createDesign;

  return method(design);
};

export const useDeleteDesign = () => {
  const client = useQueryClient();

  const { mutate: removeDesign } = useMutation((id: number) => axios.delete(`${URL}/${id}`), {
    onSuccess: () => client.invalidateQueries(['designs']),
  });

  return {
    removeDesign,
  };
};
