import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import NavBarWithRouter from "./components/NavBar";
import Home from "./components/Home";
import endpoints from "./constants/endpoints";

const DynamicRoute = ({ path, componentName, headerTitle }) => {
  const LazyComponent = React.lazy(() =>
    import(`./components/${componentName}`)
  );

  return (
    <Route
      path={path}
      key={headerTitle}
      render={() => <LazyComponent header={headerTitle} />}
    />
  );
};

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Switch>
          <Suspense fallback={<FallbackSpinner />}>
            <Route exact path="/" component={Home} />
            {data &&
              data.sections.map((route) => (
                <DynamicRoute
                  key={route.headerTitle}
                  path={route.path}
                  componentName={route.component}
                  headerTitle={route.headerTitle}
                />
              ))}
          </Suspense>
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
