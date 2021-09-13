import { Link } from "@chakra-ui/layout"
import GlobalHeader from "../../components/GlobalHeader"

export const SampleSignup = () => {
    return (
        <div>
            <GlobalHeader>
                <Link to='/sampleSignup'>Cadastrar Amostra</Link>
                <Link to='/'>Analisar Amostra</Link>
                <Link to='/'>Pesquisar Amostra</Link>
            </GlobalHeader>
        </div>
    )
}
