import { Link } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";
import Analysis from "../Analysis";

const Home = () => {
  return (
    <div>
      <GlobalHeader>
        <Link to="">Pesquisar Análise</Link>
        <Link to="/aboutUs">Sobre Nós</Link>
      </GlobalHeader>
      <Analysis />
    </div>
  );
};

export default Home;
