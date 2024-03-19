function App() {
  return (
    <>
      <div className="font-bold text-center border border-black  text-red-500 my-1">
        Flex
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ background: "red" }}>Hello</div>
        <div style={{ background: "green" }}>Hello2</div>
        <div style={{ background: "yellow" }}>Hello3</div>
      </div>
      <hr />
      <div className="flex justify-around">
        <div className="bg-red-500">Hello1</div>
        <div className="bg-green-500">Hello1</div>
        <div className="bg-yellow-500">Hello1</div>
      </div>
      <hr />
      <div className="font-bold text-center border border-black text-red-500 my-1">
        Grid
      </div>
      <div className="grid grid-cols-3">
        <div className="bg-red-500">abc</div>
        <div className="bg-green-500">abc</div>
        <div className="bg-yellow-500">abc</div>
        <div className="bg-green-500">abc</div>
      </div>
      <hr />
      <div className="grid grid-cols-10">
        <div className="bg-red-500 col-span-4">40%</div>
        <div className="bg-green-500 col-span-1">10%</div>
        <div className="bg-yellow-500 col-span-5">50%</div>
      </div>
      <hr />
      <div className="font-bold text-center border border-black text-red-500 my-1">
        Responsive
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-red-500">%</div>
        <div className="bg-gray-500">%</div>
        <div className="bg-green-500">%</div>
        <div className="bg-yellow-500">%</div>
      </div>
    </>
  );
}

export default App;
