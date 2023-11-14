import { rest } from 'msw';
import { petList, plans } from './__mock__';

export function handlers() {
  return [rest.get('/pets', getPetList), rest.get('/plans', getPlans)];
}

const getPetList: Parameters<typeof rest.get>[1] = async (_, res, ctx) => {
  return res(ctx.json(petList));
};

const getPlans: Parameters<typeof rest.get>[1] = async (_, res, ctx) => {
  return res(ctx.json(plans));
};
