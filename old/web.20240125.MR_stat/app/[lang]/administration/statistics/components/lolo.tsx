import React, { useState, useMemo } from 'react';

interface ExpensiveComponentProps {
  data: number;
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = ({ data }) => {
  // Utilisation de useState pour gérer un état
  const [count, setCount] = useState(0);

  // Utilisation de useMemo pour mémoriser la valeur calculée
  const expensiveValue = useMemo(() => {
    console.log('Calcul coûteux effectué !');
    return data * count;
  }, [data, count]); // Les dépendances sont data et count

  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState(10);

  return (
    <div>
      <ExpensiveComponent data={data} />
      <button onClick={() => setData(data + 1)}>Increment Data</button>
    </div>
  );
};

export default App;
