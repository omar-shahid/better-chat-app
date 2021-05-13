import MainLayout from "../layouts/Main";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      <MainLayout title="home">
        <h1>Hello World</h1>
      </MainLayout>
    </>
  );
};

export default Home;
