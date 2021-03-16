import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
interface Props {
  title: string;
}

const MainLayout: React.FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Navbar />
      {props.children}
    </>
  );
};

export default MainLayout;
