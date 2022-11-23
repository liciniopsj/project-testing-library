// import { screen } from '@testing-library/react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  test('elementos do card pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const pikachuCardType = screen.getByTestId('pokemon-type');

    expect(pikachuCardType).toBeInTheDocument();
    expect(pikachuCardType.textContent).toBe('Electric');

    const pikachuMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pikachuMoreDetails).toHaveAttribute('href', '/pokemon/25');
    // Metodo alternativo
    // expect(pikachuMoreDetails.href).toContain('/pokemon/25');
    userEvent.click(pikachuMoreDetails);

    const pikachuCardTypeDetails = screen.getByTestId('pokemon-type');

    expect(pikachuCardTypeDetails).toBeInTheDocument();
    expect(pikachuCardTypeDetails.textContent).toBe('Electric');

    const pikachuDeatlsHeader = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(pikachuDeatlsHeader).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemon/25');

    const pikachuSprite = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuSprite).toBeInTheDocument();
    expect(pikachuSprite.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const favoriteChkBx = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteChkBx).toBeInTheDocument();
    userEvent.click(favoriteChkBx);
    expect(favoriteChkBx).toBeChecked();

    const starIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('/star-icon.svg');

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const fireTypeBtn = screen.getByRole('button', { name: /fire/i });
    expect(fireTypeBtn).toBeInTheDocument();
    userEvent.click(fireTypeBtn);

    const charmanderName = screen.getByText(/charmander/i);
    const charmanderSprite = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(charmanderName).toBeInTheDocument();
    expect(charmanderSprite).toBeInTheDocument();
    expect(charmanderSprite.src).toContain('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    const charmanderMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(charmanderMoreDetails);
    const charmanderDetailsHeader = screen.getByRole('heading', {
      name: /charmander details/i,
      level: 2,
    });
    expect(charmanderDetailsHeader).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemon/4');

    const charmanderFavoriteChkbx = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(charmanderFavoriteChkbx);
    expect(charmanderFavoriteChkbx).toBeChecked();
    const charmanderStar = screen.getByRole('img', {
      name: /charmander is marked as favorite/i,
    });
    expect(charmanderStar).toBeInTheDocument();
    expect(charmanderStar.src).toContain('/star-icon.svg');

    act(() => {
      history.push('/favorites');
    });

    const pikachuCardName = screen.getByText(/pikachu/i);
    const pikachuCardStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    const charmanderCardName = screen.getByText(/charmander/i);
    const charmanderCardStar = screen.getByRole('img', { name: /charmander is marked as favorite/i });

    expect(pikachuCardName).toBeInTheDocument();
    expect(pikachuCardStar).toBeInTheDocument();
    expect(charmanderCardName).toBeInTheDocument();
    expect(charmanderCardStar).toBeInTheDocument();
  });
});
// test('', () => {});
