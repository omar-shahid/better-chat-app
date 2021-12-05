import { Helmet } from "react-helmet";
interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
}

const MainLayout: React.FC<Props> = ({ title, children, ...rest }) => {
  return (
    <div {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default MainLayout;
