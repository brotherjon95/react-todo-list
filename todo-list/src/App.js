// context
import ContextData from './context'
// components
import { AddItem, List } from './components/index'


function App() {

  return (
    <ContextData>
      <AddItem />
      <List />
    </ContextData>
  );
}

export default App;
