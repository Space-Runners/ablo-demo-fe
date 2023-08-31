import { Template } from '@/components/types';

export const getOptions = (templates: Template[], property) =>
  templates
    .reduce((result, template) => {
      if (!template[property] || result.find((item) => item === template[property])) {
        return result;
      }

      return [...result, template[property]];
    }, [])
    .map((name) => ({ name, value: name }));
