import { Routes , Route , BrowserRouter } from 'react-router-dom'
import Home from './Components/Home';
import New from './Components/New';
import Activity from './Components/Activity';
import Progress1 from './Components/Progress1';
import Progress2 from './Components/Progress2';
import Progress3 from './Components/Progress3';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={ <Home/> } />
          <Route path='/New' element={ <New/> } />
          <Route path='/Activity' element={ <Activity/> } />
          <Route path='/Progress-1' element={ <Progress1/> } />
          <Route path='/Progress-2' element={ <Progress2/> } />
          <Route path='/Progress-3' element={ <Progress3/> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
