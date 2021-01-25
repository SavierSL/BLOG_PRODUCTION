export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <>
      <div className="homePage">
        <h1 className="primary-heading">BLOG IT</h1>
        <div className="homePage_content">
          <button className="primary-button">
            <h2 className="secondary-heading">Create Blog </h2>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
