import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Companies from "./page/Companies";
import History from "./page/History";
import Service from "./page/Service";
import Signup from "./page/Signup";
import Charge from "./page/Charge";
import Sidebar from "./login/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="outer">
        <div className="sidebar">
          <div id="logo">
            <Header />
          </div>
          <div id="login">
            <Sidebar />
          </div>
          <div className="menu">
            <div className="index">
              <Link to="/">가입자 관리</Link>
            </div>
            <div className="index">
              <Link to="/history">충전 및 지출 이력</Link>
            </div>
            <div className="index">
              <Link to="/service">서비스 가격 정책 및 이용</Link>
            </div>
          </div>
        </div>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Companies />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/service">
              <Service />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/charge">
              <Charge />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
