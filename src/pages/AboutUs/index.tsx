import { Link } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

const AboutUs = () => {

  return (
    <div>
      <GlobalHeader>
        <Link to='/'>Home</Link>
      </GlobalHeader>
    </div>
  );
};

export default AboutUs;