import React, { Suspense, memo } from "react";
import Spinner from "../../../views/spinner/Spinner.jsx";

const Loadable = (Component) => {
  const LoadableComponent = memo((props) => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  ));
  
  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;
  
  return LoadableComponent;
};

export default Loadable;
