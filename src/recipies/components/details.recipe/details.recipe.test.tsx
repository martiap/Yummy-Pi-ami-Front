import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useParams } from 'react-router-dom';
import { Recipe } from '../../../model/recipes';
import { appStore } from '../../../store/store';
import { useUsers } from '../../../users/hooks/use.users';
import { useRecipes } from '../../hooks/use.recipes';
import Details from './details.recipe';

jest.mock('../../hooks/use.recipes');
jest.mock('../../../users/hooks/use.users');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));
jest.mock('../../../../config.ts', () => ({
  url: '',
}));
describe('Given the component court-reviews', () => {
  describe('When it is rendered', () => {
    const mockRecipe = [
      { id: '1', img: { url: 'test' }, ingredients: 'test', mode: 'test' },
      { id: '2', img: { url: 'test' }, ingredients: 'test', mode: 'test' },
    ] as unknown as Recipe[];

    jest.spyOn(Array.prototype, 'find');

    (useRecipes as jest.Mock).mockReturnValue({
      recipes: mockRecipe,
      loadRecipes: jest.fn(),
    });
    const details = () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      render(
        <MemoryRouter>
          <Provider store={appStore}>
            <Details></Details>
          </Provider>
        </MemoryRouter>
      );
    };

    test('Then, the image alt text should be Receta', () => {
      (useUsers as jest.Mock).mockReturnValue({ token: 'test' });
      details();
      const receta = screen.getByAltText('Receta');
      expect(receta).toBeInTheDocument();
    });
    test('Then, loadRecipes should have been called', () => {
      expect(useRecipes().loadRecipes).toHaveBeenCalled();
    });
    test('Then, the text of the link should be in the Document', () => {
      (useUsers as jest.Mock).mockReturnValue({ token: null });
      details();
      const link = screen.getByText('Regístrate');
      expect(link).toBeInTheDocument();
    });
  });
});
