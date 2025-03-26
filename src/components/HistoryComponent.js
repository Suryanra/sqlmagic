import React from 'react'

const HistoryComponent = () => {
const sqlQueries = [
  "SELECT * FROM employees;",                      // 1. Select all data from employees table
  "SELECT name, age FROM users WHERE age > 30;",   // 2. Select specific columns with a condition
  "INSERT INTO products (name, price) VALUES ('Laptop', 1200);",  // 3. Insert a new row into products table
  "UPDATE customers SET status = 'active' WHERE id = 5;",         // 4. Update a row based on ID
  "DELETE FROM orders WHERE order_date < '2024-01-01';"           // 5. Delete old orders
];

  return (
    <div>
      {sqlQueries.map((query,index)=>(<div key={index}>{query}</div>))}
    </div>
  )
}

export default HistoryComponent
