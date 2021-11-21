import Header from '../components/header';
import '../App.css';
// import Catogory from './catogory';

function Front() {
return(
    <div className="header">
        <Header/>
        <div className="container content">
            <h1>Know more about your <br/> Favorite Products and Analyze them</h1><br/>
            <a href="#products"><button type="button" className="btn btn-light"><b>Know More</b></button></a>
        </div>
        {/* <div>
            <Catogory></Catogory>
        </div> */}
    </div>
)
}

export default Front;