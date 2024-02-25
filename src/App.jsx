import {  Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'



//pages
import Home, { linksLoader} from './Home_r'
import NewProject from './NewProject_'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />
      <Route path='/newproject' element={<NewProject />}  />
      <Route path='/continueproject' element={<NewProject />} loader={linksLoader} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
