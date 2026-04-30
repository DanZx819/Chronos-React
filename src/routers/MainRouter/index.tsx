import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { Home } from "../../pages/Home";
import { NotFound } from "../../pages/NotFound";
import { useEffect } from "react";
import { Hystory } from "../../pages/History";

function ScrollToTop(){
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'})
    }, [pathname])

    return null;
}

export default function MainRouter() {
  //const {pathname} = useLocation();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodoro/" element={<AboutPomodoro />} />
        <Route path="/hystory/" element={<Hystory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop/>
    </BrowserRouter>
  );
}
