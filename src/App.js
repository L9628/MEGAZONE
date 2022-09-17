import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Users from "./page/Users";
import History from "./page/History";
import Price from "./page/Price";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="menu">
          <div>
            <Link to="/">가입자 관리</Link>
          </div>
          <div>
            <Link to="/history">충전 및 지출 이력</Link>
          </div>
          <div>
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
    </BrowserRouter>
  );
}

export default App;
