export const groupTasksByDate = (tasks) => {
  const today = new Date();
  const todayTasks = [];
  const weekTasks = [];
  const futureTasks = [];

  tasks.forEach((task) => {
    const duration = (new Date(task.end_date) - today) / (1000 * 60 * 60 * 24);
    if (duration < 1) todayTasks.push(task);
    else if (duration <= 7) weekTasks.push(task);
    else futureTasks.push(task);
  });

  return { todayTasks, weekTasks, futureTasks };
};
