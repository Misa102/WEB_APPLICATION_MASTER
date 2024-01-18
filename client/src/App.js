import "./App.css";
import HomePage from "./pages/HomePage";
import QuotesPage from "./pages/QuotesPage";
import About from "./pages/About";
import Navbar from "../components_homepage/Navbar";
import Footer from "../components_homepage/Footer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  //return <QuotesPage/>;
  //return <HomePage/>;
  return(

    <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/quoutes" exact component={QuotesPage}/>
            <Route path="/about" exact component={About}/>

          </Switch>
          <Footer/>

        </Router>
        </div>
    );
}

export default App;
