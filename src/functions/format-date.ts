export default function formatDate(date: string) {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInMs = now.getTime() - pastDate.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks} semana${weeks > 1 ? "s" : ""} atrás`;
  } else if (days > 0) {
    return `${days} dia${days > 1 ? "s" : ""} atrás`;
  } else if (hours > 0) {
    return `${hours}h atrás`;
  } else if (minutes > 0) {
    return `${minutes} min atrás`;
  } else {
    return "agora";
  }
}
