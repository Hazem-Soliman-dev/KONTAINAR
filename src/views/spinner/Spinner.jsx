import { memo } from 'react';
import './spinner.css';

const Spinner = memo(() => (
  <div className="fallback-spinner">
    <div className="loading component-loader">
      <div className="effect-1 effects" />
      <div className="effect-2 effects" />
      <div className="effect-3 effects" />
    </div>
  </div>
));

Spinner.displayName = 'Spinner';

export default Spinner;
