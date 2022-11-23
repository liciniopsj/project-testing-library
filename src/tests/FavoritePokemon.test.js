// import { screen } from '@testing-library/react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemon', () => {
  test('se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/favorites');
    });

    const favoritesHeader = screen.getByRole('heading', {
      name: /favorite pokémon/i,
      level: 2,
    });
    const noFavoritesText = screen.getByText(/no favorite pokémon found/i);

    expect(favoritesHeader).toBeInTheDocument();
    expect(noFavoritesText).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de Pokémon favoritados', () => {
    // Esse teste foi exagerado de propósito, tentei seguir como um script, ação por ação que o usuario tomaria
    // para favoritar dois pokemons (pikachu e charmander). O Objetivo é treinar a sintaxe e a ordem com que os
    // elementos devem ser capturados e usados
    const { history } = renderWithRouter(<App />);
    // rota /
    // sabendo que o card para pikachu é o primeiro, procura direto o link pra mais detalhes dele
    const pikachuMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pikachuMoreDetails); // entra em /pokemon/25

    const pikachuDeatlsHeader = screen.getByRole('heading', { // captura o nome no header
      name: /pikachu details/i,
      level: 2,
    });
    expect(pikachuDeatlsHeader).toBeInTheDocument(); // checa de o header esta no documento
    expect(history.location.pathname).toBe('/pokemon/25'); // checa se esta na rota /pokemon/25
    // Não desestruture location.pathname, deixa assim mesmo.
    // Ao desestruturar pathname eu reparei que é criado um retrato no momento que ele foi declarado
    // e pathname para de atualizar caso eu mude de rota.

    const pikachuSprite = screen.getByRole('img', { // chega se o sprite é o correto para pikachu
      name: /pikachu sprite/i,
    });
    expect(pikachuSprite).toBeInTheDocument();

    const favoriteChkBx = screen.getByRole('checkbox', { // encontra o checkbox
      name: /pokémon favoritado\?/i,
    });
    expect(favoriteChkBx).toBeInTheDocument();
    userEvent.click(favoriteChkBx);
    expect(favoriteChkBx).toBeChecked(); // atua e checa se o checkbox esta marcado

    const starIcon = screen.getByRole('img', { // depois de marcar o checkbox, tenta encontrar a estrela no card
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /home/i }); // vai pra home '/' pra encontrar outro pokemon
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const fireTypeBtn = screen.getByRole('button', { name: /fire/i });
    expect(fireTypeBtn).toBeInTheDocument();
    userEvent.click(fireTypeBtn); // aperta o botao para fire type

    const charmanderName = screen.getByText(/charmander/i); // testa se os componentes do card de charmander estao la
    const charmanderSprite = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(charmanderName).toBeInTheDocument();
    expect(charmanderSprite).toBeInTheDocument();

    // Vai para a pagina detalhada de charmander /pokemon/4 e testa se os elementos estão corretos para o card de charmander

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

    // após favoritar charmandar e checar pela estrela e status do checkbox, vai direto pro /favorites via "url"
    // ! usar history.push até nunca mais esquecer que precisa do act.

    act(() => {
      history.push('/favorites');
    });

    // verifica na rota /favorites se os cards presentes possuem os elementos apropriados para pikachu e charmander.

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
