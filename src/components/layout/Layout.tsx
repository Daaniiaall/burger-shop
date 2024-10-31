import Footer from "./Footer";

const Layout  = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className="min-h-dvh">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;