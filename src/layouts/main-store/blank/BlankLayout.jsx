import { Outlet } from "react-router-dom";
import LoadingBar from '../../../LoadingBar.jsx';

const BlankLayout = () => (
  <>
    <LoadingBar />
    <Outlet />
  </>
);

export default BlankLayout;
