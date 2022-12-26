import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
