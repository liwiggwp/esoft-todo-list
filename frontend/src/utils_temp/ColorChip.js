export const priorityColor = (priority) => {
  switch (priority) {
    case "Высокий":
      return "error";
    case "Средний":
      return "warning";
    case "Низкий":
      return "success";
    default:
      return "default";
  }
};

export const statusColor = (status) => {
  switch (status) {
    case "Выполнена":
      return "success";
    case "Выполняется":
      return "primary";
    case "К выполнению":
      return "warning";
    case "Отменена":
      return "error";
    default:
      return "default";
  }
};
