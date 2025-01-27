import { useEffect, useState, memo } from 'react';
import { list } from './stubs';
import { slowFunction } from './utils';
import '../styles.css';

const ComponentA = () => {
  // const obj = {};
  // console.log(Object.is('1', 1));
  // console.log(Object.is(NaN, NaN));
  // console.log(Object.is(-0, 0));
  // console.log(Object.is(obj, {}));
  return <Wrapper children={<ComponentB />} />;
};

const Wrapper = ({ children }) => {
  const [count, setCount] = useState(0);
  const onClick = () => setCount((current) => ++current);

  return (
    <div
      className="component"
      style={{ backgroundColor: count % 2 === 0 ? '#000' : 'initial' }}
    >
      <h3>Component A</h3>
      <p>{`Show result value: ${count}`}</p>
      <button className="button" onClick={onClick}>
        Update count
      </button>

      {children}
    </div>
  );
};

/** Пример тяжелых вычислений */
const ComponentB = () => {
  /* Ф-я, выполняющая достаточно трудоемкий код */
  const result = slowFunction();

  return (
    <div className="component">
      <h3>Component B</h3>
      <p>{`Show result value: ${result}`}</p>
    </div>
  );
};

const MemoComponentB = memo(ComponentB, (prev, next) => {
  if (prev.testProp.testCount === next.testProp.testCount) return true;
  return false;
});

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

const MemoComponentCList = memo(ComponentCList);

const ComponentC = ({ id }) => {
  const title = `Component C ${id}`;
  return (
    <div className="component">
      <h3>Component C</h3>
      <ComponentD />
    </div>
  );
};

const content = <div>content</div>;

const ComponentD = memo(() => {
  return (
    <div className="component">
      <h3>Component D</h3>
      {content}
    </div>
  );
});

export { ComponentA };
