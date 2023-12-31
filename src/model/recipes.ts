import { WithId } from '../types/id';
import { ImgData } from '../types/image';
import { User } from './user';

export type RecipeNoId = {
  name: string;
  category: string;
  ingredients: string;
  mode: string;
  author: User;
  img: ImgData;
};

export type Recipe = WithId & RecipeNoId;
