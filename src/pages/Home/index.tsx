import { Link } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

const Home = () => {
  return (
    <div>
      <GlobalHeader>
        <Link to="">Pesquisar Análise</Link>
        <Link to="/aboutUs">Sobre Nós</Link>
      </GlobalHeader>
    </div>
  );
};

export default Home;
