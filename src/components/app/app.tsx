import MainPage from '../../pages/main-pages/main-page.tsx';

type AppScreenProps = {
  offerCardsCount: number;
}

function App({ offerCardsCount }: AppScreenProps): JSX.Element {
  return (
    <MainPage offerCardsCount={offerCardsCount} />
  );
}

export default App;
