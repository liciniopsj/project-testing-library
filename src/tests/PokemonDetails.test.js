import { screen } from '@testing-library/react';
// import { act, getByAltText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Elementos de pokemon details', () => {
    const { history } = renderWithRouter(<App />);

    const pikachuMoreDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(pikachuMoreDetailsLink).toBeInTheDocument();
    expect(pikachuMoreDetailsLink.href).toContain('/pokemon/25');

    userEvent.click(pikachuMoreDetailsLink);

    expect(history.location.pathname).toBe('/pokemon/25');

    const pikachuDetailsHeader = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });

    expect(pikachuDetailsHeader).toBeInTheDocument();

    const pikachuDetailsSummaryHeader = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });

    expect(pikachuDetailsSummaryHeader).toBeInTheDocument();

    const pikachuDetailsSummary = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    expect(pikachuDetailsSummary).toBeInTheDocument();

    const pikachuDetailsGameLocationsHeader = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });

    expect(pikachuDetailsGameLocationsHeader).toBeInTheDocument();

    const pikachuDetailsGameLocationsImgs = screen.getAllByAltText(/Pikachu location/i);

    expect(pikachuDetailsGameLocationsImgs[0]).toBeInTheDocument();
    expect(pikachuDetailsGameLocationsImgs[1]).toBeInTheDocument();

    expect(pikachuDetailsGameLocationsImgs[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuDetailsGameLocationsImgs[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const favoriteChkbxLabel = screen.getByText(/pokémon favoritado\?/i);

    expect(favoriteChkbxLabel).toBeInTheDocument();
  });
});
// test('', () => {});
