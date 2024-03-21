export default function Balance({ value }) {
  return (
    <div className="flex mx-3">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
}