import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [sortField, setSortField] = useState('');
  let newGoods = [...goodsFromServer];
  const [handleReverse, setHandleReverse] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [handleReset, setHandleReset] = useState(false);

  if (sortField === 'reset') {
    newGoods = [...goodsFromServer];
  }

  if (sortField !== '') {
    newGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return good2.localeCompare(good1);
        case 'length':
          return good2.length - good1.length;

        default:
          return 0;
      }
    });
  }

  if (handleReverse) {
    newGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField('alphabetically');
            setHandleReset(true);
          }}
          type="button"
          className={
            sortField === 'alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField('length');
            setHandleReset(true);
          }}
          type="button"
          className={
            sortField === 'length'
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isVisible ? 'button is-info' : 'button is-info is-light'}
          onClick={() => {
            setHandleReverse(prev => !prev);
            setIsVisible(prev => !prev);
            setHandleReset(true);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          style={handleReset ? { display: 'block' } : { display: 'none' }}
          onClick={() => {
            setSortField('reset');
            setHandleReset(false);
            setIsVisible(false);
            setHandleReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {newGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
