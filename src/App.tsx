import { RepositoriesProvider } from "./context";
import RepoList from "./components/RepoList";

function App() {
  return (
    <RepositoriesProvider>
      <RepoList />
    </RepositoriesProvider>
  );
}

export default App;
