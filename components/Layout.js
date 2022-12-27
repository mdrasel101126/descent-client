import { Toaster } from "react-hot-toast";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Header></Header>
      <main style={{ minHeight: "59vh" }}>
        {children}
        <Toaster />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
