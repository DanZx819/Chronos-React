import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";

type MessagesContainerProps = {
  children: React.ReactNode;
};

export function MessagesContainer({ children }: MessagesContainerProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "light" ? "light" : "dark";
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme === "light" ? "light" : "dark");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {children}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
    </>
  );
}