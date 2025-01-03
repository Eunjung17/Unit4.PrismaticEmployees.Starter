const { express, prisma } = require("../common");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to the Prismatic Employees API.");
});

router.get("/employees", async (req, res) => {
  try {
    const result = await prisma.employee.findMany();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).send("nothing found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//adds a new employee with the provided name (post = create)
router.post("/employees", async (req, res) => {
    try {
          const { name } = req.body;
          const response = await prisma.employee.create({
          data: {
              name,
          },
          });
  
          if (response) {
          res.status(200).json(response);
          } else {
          res.status(200).send("Employee not added");
          }
      } catch (error) {
          res.status(400).send(error);
      }
  });

// 파라메터로 id를 쓸 경우
router.get("/employees/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await prisma.employee.findFirst({
        where: {
          id,
        },
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("Employee not found");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

// updates employee with specified ID with provided data
router.put("/employees/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const result = await prisma.employee.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/employees/:id", async (req, res) => {
    try {
          const id  = parseInt(req.params.id);

          const employeeToDelete = await prisma.employee.findUnique({
          where: {
              id
          },
          });
          console.log("employeeToDelete:" ,employeeToDelete);
          if(!employeeToDelete){
            res.status(404).send("Employee not found");
          }

          const deleteEmployee = await prisma.employee.delete({
            where: {
                id
            }
          });
  
          if (deleteEmployee) {
          res.status(200).json(deleteEmployee);
          } else {
          res.status(404).send("Employee not deleted");
          }
      } catch (error) {
          res.status(400).send(error);
      }
  });
  

module.exports = router;
