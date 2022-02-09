class TaskRunner {
  constructor() {}

  getRandomTime() {
    const min = Math.ceil(100);
    const max = Math.floor(900);
    return Math.floor(Math.random() * (max - min) + min);
  }

  runTask(id) {
    return new Promise((resolve) => {
      setTimeout(resolve, this.getRandomTime());
    });
  }

  hasTask(id) {
    return true;
  }

}

module.exports = TaskRunner;
