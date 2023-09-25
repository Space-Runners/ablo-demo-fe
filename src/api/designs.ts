import axios from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Design, DesignSide } from '@/components/types';

const URL = `/designs`;

// TODO: Change this back to axios when S3 bucket where canvas states are stored enables CORS with our domain
const getCanvasStates = (sides) =>
  Promise.all(
    sides.map((side) => {
      if (side.canvasStateUrl) {
        return fetch(side.canvasStateUrl)
          .then((response) => response.text())
          .then((canvasState) => ({ ...side, canvasState }))
          .catch(() => side);
      } else {
        return side;
      }
    })
  );

const getDesigns = () => axios.get<Design[]>(URL).then(({ data }) => data);

export const useDesigns = () => useQuery(['designs'], () => getDesigns());

export const getDesign = (id: string) =>
  axios.get<Design>(`${URL}/${id}`).then(({ data }) =>
    getCanvasStates(data.sides).then((sides) => ({
      ...data,
      sides,
    }))
  );

export const useDesign = (id: string) => useQuery(['designs', id], () => getDesign(id));

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

const updateDesignSide = (designId, side: DesignSide) => {
  const { canvasState, designImage, previewImage } = side;

  return axios
    .patch<DesignSide>(`${URL}/${designId}/sides/${side.id}`, {
      canvasState,
      designImage,
      previewImage,
    })
    .then(({ data }) => data);
};

const updateDesign = (design: Design) => {
  const { sides } = design;

  return Promise.all(sides.map((side) => updateDesignSide(design.id, side))).then((newSides) => ({
    ...design,
    sides: newSides,
  }));
};

export const saveDesign = (design: Design) => {
  const method = design.id ? updateDesign : createDesign;

  return method(design);
};

const updateBasicDesign = (design: Partial<Design>) => {
  const { id, ...rest } = design;

  return axios.patch<Design>(`${URL}/${id}`, rest);
};

export const useUpdateBasicDesign = () => {
  const client = useQueryClient();

  const { mutateAsync: updateDesign, isLoading } = useMutation(updateBasicDesign, {
    onSuccess: () => {
      client.invalidateQueries(['designs']);
    },
  });

  return {
    updateDesign,
    isUpdating: isLoading,
  };
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
