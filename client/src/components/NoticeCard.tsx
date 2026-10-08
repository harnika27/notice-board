interface NoticeCardProps {
  title: string;
  message: string;
}

// Shows one notice (title and message) received through props
function NoticeCard({ title, message }: NoticeCardProps) {
  return (
    <div className="notice-card">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default NoticeCard;
