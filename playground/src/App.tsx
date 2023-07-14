import { usePositions } from 'use-defi';

import './App.css';

function App() {
  const hookResult = usePositions();

  return (
    <>
      <div>
        <h1>
          <code>use-defi</code>
          <br />
          React Hooks Playground
        </h1>
        {hookResult}
      </div>
    </>
  );
}

export default App;
