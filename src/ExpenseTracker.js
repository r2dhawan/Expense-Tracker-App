import React, { useState } from 'react';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const addExpense = () => {
    if (description.trim() === '' || isNaN(amount) || +amount === 0) {
      alert('Please enter a valid description and amount.');
      return;
    }

    const newExpense = {
      id: new Date().getTime().toString(),
      description,
      amount: +amount,
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const addAmount = (isAddition) => {
    if (isNaN(amount) || +amount === 0) {
      alert('Please enter a valid non-zero amount.');
      return;
    }

    const newAmount = Math.abs(+amount) * (isAddition ? 1 : -1);

    setExpenses([
      ...expenses,
      {
        id: new Date().getTime().toString(),
        description: `${isAddition ? 'Added' : 'Subtracted'} $${Math.abs(+amount)}`,
        amount: newAmount,
      },
    ]);
    setAmount('');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Expense Tracker</h2>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
          style={styles.input}
        />
        <button onClick={() => addAmount(true)} style={styles.addButton}>
          Add Amount
        </button>
        <button onClick={() => addAmount(false)} style={styles.subtractButton}>
          Subtract Amount
        </button>
      </div>
      <ul style={styles.expenseList}>
        {expenses.map((expense) => (
          <li key={expense.id} style={styles.expenseItem}>
            {expense.description} - ${expense.amount}{' '}
            <button onClick={() => deleteExpense(expense.id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div style={styles.totalContainer}>
        <button style={styles.totalButton} onClick={() => alert(`Total Expenses: $${getTotalExpenses()}`)}>
          Show Total Expenses
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    padding: '8px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    flex: 1,
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  subtractButton: {
    flex: 1,
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  expenseList: {
    listStyle: 'none',
    padding: 0,
  },
  expenseItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  deleteButton: {
    backgroundColor: '#ff4545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  totalButton: {
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ExpenseTracker;
