import "./App.css";
import HomePage from "./pages/HomePage";
import QuotesPage from "./pages/QuotesPage";
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
            <Route path="/" exact component={QuotesPage}/>

          </Switch>
          <Footer/>

        </Router>
        </div>
    );
}

export default App;
