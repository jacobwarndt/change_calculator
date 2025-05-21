import { useState } from 'react';
import './App.css';

function App() {
  const [amountDue, setAmountDue] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [change, setChange] = useState(null);
  const [denominations, setDenominations] = useState({
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0,
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0,
  });

  const calculateChange = () => {
    const due = parseFloat(amountDue);
    const received = parseFloat(amountReceived);
    let changeDue = Math.round((received - due) * 100);

    if (isNaN(due) || isNaN(received)) {
      setChange({ type: 'danger', message: 'Please enter valid numbers.' });
      return;
    }

    if (changeDue < 0) {
      setChange({
        type: 'danger',
        message: `Additional money owed is $${Math.abs(changeDue / 100).toFixed(2)}`,
      });
      setDenominations({
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0,
      });
      return;
    }

    const bills = {
      twenties: 2000,
      tens: 1000,
      fives: 500,
      ones: 100,
      quarters: 25,
      dimes: 10,
      nickels: 5,
      pennies: 1,
    };

    const result = {};
    for (const key in bills) {
      result[key] = Math.floor(changeDue / bills[key]);
      changeDue %= bills[key];
    }

    setChange({
      type: 'success',
      message: `The total change due is $${(received - due).toFixed(2)}`,
    });
    setDenominations(result);
  };

  return (
    <div className="container">
      <h1>Change Calculator</h1>
      <p>Enter the transaction details to calculate change.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="form-group">
                <label htmlFor="amountDue">How much is due?</label>
                <input
                  id="amountDue"
                  data-testid="amountDue"
                  className="form-control"
                  type="number"
                  value={amountDue}
                  onChange={(e) => setAmountDue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amountReceived">How much was received?</label>
                <input
                  id="amountReceived"
                  data-testid="amountReceived"
                  className="form-control"
                  type="number"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                data-testid="calculate"
                onClick={calculateChange}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {change && (
            <div className={`alert alert-${change.type}`}>
              {change.message}
            </div>
          )}
          <div className="row">
            {Object.entries(denominations).map(([key, value]) => (
              <div className="col-xs-6 col-sm-3 text-center well" key={key}>
                <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                <p data-testid={key}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;