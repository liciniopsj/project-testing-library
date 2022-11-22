// import { screen } from '@testing-library/react';
import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente about.js', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    act(() => {
      history.push('/about');
    });

    const aboutHeader = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const aboutText = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const aboutText2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const aboutImg = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(aboutHeader).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg.src).toContain(imgURL);
  });
  // test('', () => {});
});
// test('', () => {});
