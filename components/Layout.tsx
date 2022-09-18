import { useEffect } from "react";
import { useAppState } from "../context/AppStateProvider";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";

const staticPages = ["/", "/about"];

export default function Layout({ children }) {
  const { login, web3Auth } = useAppState();
  const { pathname } = useRouter();

  useEffect(() => {
    (async () => {
      if (
        web3Auth &&
        web3Auth.status === "ready" &&
        !staticPages.includes(pathname)
      ) {
        login();
      }
    })();
  }, [web3Auth, login, pathname]);

  return (
    <div className="min-h-screen flex flex-col jus">
      <Header />
      <main className="bg-blue-50 flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
