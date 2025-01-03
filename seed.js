const { prisma } = require("./common");
const seed = async () => {
  const employeeObj = [
    {
      name: "employee1",
    },
    {
      name: "employee2",
    },
    {
      name: "employee3",
    },
    {
      name: "employee4",
    },
    {
      name: "employee5",
    },
    {
      name: "employee6",
    },
    {
      name: "employee7",
    },
    {
      name: "employee8",
    },
    {
      name: "employee9",
    },
    {
      name: "employee10",
    },
  ];
  await prisma.employee.createMany({
    data: employeeObj,
  });
};
seed();
