import { screen } from '@testing-library/react';
// import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import App from '../App';
import { NotFound } from '../pages';

describe('Teste o componente NotFound.js', () => {
  test('se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    renderWithRouter(<NotFound />);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const pageNotFoundHeader = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const pageNotFoundImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(pageNotFoundHeader).toBeInTheDocument();
    expect(pageNotFoundImg).toBeInTheDocument();
    expect(pageNotFoundImg.src).toContain(imgURL);
  });
});

// test('', () => {});
