import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Traininglist from './components/Traininglist';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PersonalTrainer - 
            Customers
          </Typography>
        </Toolbar>
      </AppBar>
      <Customerlist />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PersonalTrainer - 
            Trainings
          </Typography>
        </Toolbar>
      </AppBar>
      <Traininglist />
    </div>
  );
}

export default App;
