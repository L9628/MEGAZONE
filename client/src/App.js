import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Users from "./page/Users";
import History from "./page/History";
import Price from "./page/Price";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <div className="menu">
          <div className="index">
            <Link to="/">가입자 관리</Link>
          </div>
          <div className="index">
            <Link to="/history">충전 및 지출 이력</Link>
          </div>
          <div className="index">
            <Link to="/price">서비스 가격 정책</Link>
          </div>
        </div>
        <div id="page">
          <Switch>
            <Route exact path="/">
              <Users />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/price">
              <Price />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
