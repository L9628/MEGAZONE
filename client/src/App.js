import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Users from "./page/Users";
import History from "./page/History";
import Price from "./page/Price";
import Signup from "./page/Signup";
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
          <div className="signup">
            <Link to="/signup">
              <button>회원 가입</button>
            </Link>
          </div>
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
        </div>
        <div className="page">
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
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
