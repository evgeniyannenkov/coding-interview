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
  const resolvedTasks = [];

  function processResolvedTask(id, resolver) {
    resolvedTasks.push(id);
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

  const resolvedTasks1 = [ 'id422', 'id424', 'id2444', 'id4242' ];
  const tasksIndexes = [ 0, 1, 2, 3 ];
                    // [ 0, 2, 1, 3 ] => [0, 1, -1, 3]
                    // [ 3, 2, 1, 0 ] => [0, -1, -1, -1]
  const resolvedTasks2 = [ 'id4242', 'id424', 'id2444', 'id422' ];

  const res = tasks.reduce((acc, id, i) => {
    const prevTaskId = tasks[i - 1];
    const resolvedIndex = resolvedTasks2.indexOf(id);
    console.log({
      tasks,
      resolvedTasks2,
      i,
      resolvedIndex,
      id,
      prevTaskId,
    });
    if (resolvedIndex < i) {
      acc.push(-1);
      return acc;
    }
    acc.push(i);
    return acc;
  }, []);
  console.log('res', res);
  console.log('expected', [0, 1, -1, 3]);
})()


