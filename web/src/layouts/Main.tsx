import { Helmet } from "react-helmet";
interface Props {
  title: string;
}

const MainLayout: React.FC<Props> = (props) => {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      {props.children}
    </>
  );
};

export default MainLayout;
