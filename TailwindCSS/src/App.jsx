import { RevenueCard } from "./components/RevenueCard";

function App() {
  return (
    <div className="grid grid-cols-3">
      <RevenueCard
        title={"Amount Pending"}
        amount={"92,312.10"}
        orderCount={"13"}
      />
    </div>
  );
}

export default App;
