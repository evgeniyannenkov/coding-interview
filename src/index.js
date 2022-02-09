// const express = require('express');
// const app = express();
// const port = 3000;
const TaskRunner = require('./services/taskRunner');

const taskIds = ["id422", "id2444", "id424", "id4242"];
// app.post('/api/runTasks', (req, res) => {
//   res.send('Hello World!')
// })
//
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const runner = new TaskRunner();

(async function () {
  const resolvedTasksIds = [];

  function processResolvedTask(id, resolver) {
    resolvedTasksIds.push(id);
    return resolver(id);
  }

  const tasks = await Promise.all(
    taskIds.map(task => {
      return new Promise((resolve, reject) => {
        runner.runTask(task)
          .then(() => processResolvedTask(task, resolve))
          .catch((e) => reject(e))
      })
    })
  );

  const res = resolvedTasksIds.reduce((acc, id, i) => {
    const originalIndex = tasks.indexOf(id);
    const prevOriginalIndex = tasks.indexOf(resolvedTasksIds[i - 1]);
    console.log({
      tasks,
      resolvedTasksIds,
      originalIndex,
      prevOriginalIndex
    });
    if (prevOriginalIndex > originalIndex) {
      acc.push(-1);
      return acc;
    }
    acc.push(i);
    return acc;
  }, []);
  console.log('res', res);
})()


