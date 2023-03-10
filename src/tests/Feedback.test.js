import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import { screen } from "@testing-library/react";
import Feedback from "../pages/Feedback";
import { playerOne, playerTwo, playersRanking } from "./helpers/mockData";
import userEvent from "@testing-library/user-event";

describe("Testando o componente feedback:", () => {
  it("Verifica se a pagina de feedback é renderizada", () => {
    renderWithRouterAndRedux(<Feedback />, playerOne);

    const gravatarImg = screen.getByRole("img", {
      name: /avatar\-de\-teste/i,
    });
    expect(gravatarImg).toHaveProperty(
      "src",
      `https://www.gravatar.com/avatar/${playerOne.player.gravatarEmail}`
    );
    screen.getByRole("heading", { level: 2, name: "Teste" });
    screen.getByText(/well Done/i)
  });

  it('Caso a pessoa acerte menos que três é renderizado a mensagem Could be Better', () => {
    renderWithRouterAndRedux(<Feedback />, playerTwo);
    screen.getByRole("heading", { level: 2, name: "Teste" });
    screen.getByText(/could be better/i)
  })

  it("Testa o botões jogar novamente", () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      playerOne,
      "/feedback"
    );
    const playAgain = screen.getByRole("button", { name: /jogar novamente/i });
    userEvent.click(playAgain);
    const logoTrivia = screen.getByRole("img", {
      name: /logo/i,
    });
    expect(logoTrivia).toBeInTheDocument;
  });

  it("Testa botão de ranking", () => {
    const { history } = renderWithRouterAndRedux(
      <App />,
      playerOne,
      "/feedback"
    );


    localStorage.setItem('ranking', JSON.stringify(playersRanking));

    const rankingButton = screen.getByRole("button", { name: /ranking/i });
    userEvent.click(rankingButton);

    screen.getByRole('heading', {level:1, name: /Ranking/i})
  });
});
