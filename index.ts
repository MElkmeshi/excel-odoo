import OdooJSONRpc from "@fernandoslim/odoo-jsonrpc";
import xlsx from "xlsx";
const main = async () => {
  const odoo = new OdooJSONRpc({
    baseUrl: "https://www.thub.ly",
    port: Number(443),
    db: "thubtest",
    username: "melkmeshi@thub.ly",
    password: "12345678",
  });

  await odoo.connect();

  const projectId = await odoo.create("project.project", {
    name: "New Project",
  });
  console.log(`Project created with ID: ${projectId}`);

  const workbook = xlsx.readFile("./tasks.xlsx"); 
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const tasks = xlsx.utils.sheet_to_json(worksheet) as { Name: string }[];

  for (const task of tasks) {
    const taskData = {
      name: task.Name,
      project_id: projectId,
    };

    const taskId = await odoo.create("project.task", taskData);
    console.log(`Task created with ID: ${taskId}`);
  }
};
main();
