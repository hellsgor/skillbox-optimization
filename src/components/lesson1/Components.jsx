import { useEffect, useState } from 'react';
import { list } from './stubs';
import { slowFunction } from './utils';
import '../styles.css';

const ComponentA = () => {
  /* Устанавливаем стейт счетчика */
  const [count, setCount] = useState(1);

  /* Ф-я инкрементирует count */
  const onClick = () => setCount((currentCount) => currentCount + 1);

  return (
    <div className="component">
      <h3>Component A</h3>
      <p>{`State Count: ${count}`}</p>
      <button className="button" onClick={onClick}>
        Update count
      </button>
      <ComponentB />
      <ComponentCList />
    </div>
  );
};

/** Пример тяжелых вычислений */
const ComponentB = ({ count }) => {
  /* Ф-я, выполняющая достаточно трудоемкий код */
  const startTime = performance.now();
  const result = slowFunction();
  const endTime = performance.now();

  useEffect(() => {
    console.count('Render');
  });

  return (
    <div className="component">
      <h3>Component B</h3>
      <p>{`Show result value: ${result}`}</p>
      <p>{`Врем выполнения операции: ${Math.round(endTime - startTime)}`}</p>
    </div>
  );
};

/** Пример тяжелого рендеринга */
const ComponentCList = () => {
  return (
    <div>
      {list.map((item) => (
        <ComponentC key={item} id={item} />
      ))}
    </div>
  );
};

const ComponentC = ({ id }) => {
  const title = `Component C ${id}`;
  return (
    <div className="component">
      <h3>{title}</h3>
    </div>
  );
};

export { ComponentA };
