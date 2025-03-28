const schemaData = [
  {
    tableName: "Employee",
    columns: [
      { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "age", type: "INT" },
      { name: "email", type: "VARCHAR(255) UNIQUE" },
    ],
  },
  {
    tableName: "Teacher",
    columns: [
      { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "subject", type: "VARCHAR(255)" },
      { name: "email", type: "VARCHAR(255) UNIQUE" },
    ],
  },
  {
    tableName: "Order",
    columns: [
      { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
      { name: "name", type: "VARCHAR(255)" },
      { name: "price", type: "DECIMAL(10,2)" },
      { name: "rating", type: "INT" },
    ],
  },
  {
    tableName: "Courses",
    columns: [
      { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
      { name: "course_name", type: "VARCHAR(255)" },
      { name: "teacher_id", type: "INT FOREIGN KEY REFERENCES" },
      { name: "duration", type: "VARCHAR(50)" },
    ],
  },
];

export default schemaData;
