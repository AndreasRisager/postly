export default function Announcement(props) {
  return (
    <div className="bg-primaryColor p-3 text-center text-base font-medium z-50 relative">
      <p>{props.announcement}</p>
    </div>
  );
}
