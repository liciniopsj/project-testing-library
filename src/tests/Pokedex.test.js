import { screen } from '@testing-library/react';
// import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import { Pokedex } from '../pages';
import App from '../App';

describe('Teste o componente Pokedex.js', () => {
  test('se os botoes de filtragem por tipo possuem o nome correto', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const electricBtn = screen.getByRole('button', {
      name: /electric/i,
    });
    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    const bugBtn = screen.getByRole('button', {
      name: /bug/i,
    });
    const poisonBtn = screen.getByRole('button', {
      name: /poison/i,
    });
    const psychicBtn = screen.getByRole('button', {
      name: /psychic/i,
    });
    const normalBtn = screen.getByRole('button', {
      name: /normal/i,
    });
    const dragonBtn = screen.getByRole('button', {
      name: /dragon/i,
    });

    // Buttons exist, are in the document and have the correct name

    expect(allBtn).toBeInTheDocument();
    expect(electricBtn).toBeInTheDocument();
    expect(fireBtn).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
    expect(poisonBtn).toBeInTheDocument();
    expect(psychicBtn).toBeInTheDocument();
    expect(normalBtn).toBeInTheDocument();
    expect(dragonBtn).toBeInTheDocument();
  });

  test('Se os botões de filtragem por tipo possuem o data-testid=pokemon-type-button exceto o botão All', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const electricBtn = screen.getByRole('button', {
      name: /electric/i,
    });
    const fireBtn = screen.getByRole('button', {
      name: /fire/i,
    });
    const bugBtn = screen.getByRole('button', {
      name: /bug/i,
    });
    const poisonBtn = screen.getByRole('button', {
      name: /poison/i,
    });
    const psychicBtn = screen.getByRole('button', {
      name: /psychic/i,
    });
    const normalBtn = screen.getByRole('button', {
      name: /normal/i,
    });
    const dragonBtn = screen.getByRole('button', {
      name: /dragon/i,
    });

    // check for the data test id property
    const attribute = 'data-testid';
    const attributeValue = 'pokemon-type-button';

    expect(allBtn).toHaveAttribute(attribute, '');
    expect(electricBtn).toHaveAttribute(attribute, attributeValue);
    expect(fireBtn).toHaveAttribute(attribute, attributeValue);
    expect(bugBtn).toHaveAttribute(attribute, attributeValue);
    expect(poisonBtn).toHaveAttribute(attribute, attributeValue);
    expect(psychicBtn).toHaveAttribute(attribute, attributeValue);
    expect(normalBtn).toHaveAttribute(attribute, attributeValue);
    expect(dragonBtn).toHaveAttribute(attribute, attributeValue);
  });

  test('É possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    const bugBtn = screen.getByRole('button', {
      name: /bug/i,
    });
    const nextPkm = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pikachuCardName = screen.getByText(/pikachu/i);

    expect(allBtn).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
    expect(nextPkm).toBeInTheDocument();
    expect(pikachuCardName).toBeInTheDocument();
    expect(nextPkm).toBeEnabled();

    userEvent.click(bugBtn);

    const caterpieCardName = screen.getByText(/caterpie/i);

    expect(caterpieCardName).toBeInTheDocument();
    expect(nextPkm).toBeDisabled();

    userEvent.click(allBtn);

    expect(pikachuCardName).toBeInTheDocument();
    expect(nextPkm).toBeEnabled();

    userEvent.click(nextPkm);

    const charmanderCardName = screen.getByText(/charmander/i);

    expect(charmanderCardName).toBeInTheDocument();
  });
});
// test('', () => {});
