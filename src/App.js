import { Provider } from "react-redux";
import appStore from "./Redux/appStore";
import { Outlet } from "react-router";
import Header from "./Components/Header";

const App = () => {
  return (
    <Provider store={appStore}>
      <Header />
      <Outlet />
    </Provider>
  );
};

export default App;
