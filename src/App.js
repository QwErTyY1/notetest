import classes from './App.module.css';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import MainContainer from "./components/Main/MainContainer";

function App() {

    return (
        <div className={classes.page}>
            <Header/>
            <MainContainer/>
            <Footer/>
        </div>
    );
}

export default App;
