import './App.css';
import {TaskInbox} from './features/taskInbox/TaskInbox';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TaskInbox />
      </header>
    </div>
  );
};

export default App;
