import React, { useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LayoutDefault from "@layouts/Default";
import PageNote from "./pages/Note";
import PageRemainder from "./pages/Remainder";
import { vh } from "./utils/vh";
import path from "./router/paths";

function App() {
  useEffect(() => {
    try {
      const localVh = vh(window);
      localVh();
      window.addEventListener("resize", localVh);
      return () => {
        window.removeEventListener("resize", localVh);
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path={path.note.path} name={path.note.name}>
          <LayoutDefault type={path.note.name}>
            <PageNote />
          </LayoutDefault>
        </Route>
        <Route path={path.remainder.path} name={path.remainder.name}>
          <LayoutDefault type={path.remainder.name}>
            <PageRemainder />
          </LayoutDefault>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
