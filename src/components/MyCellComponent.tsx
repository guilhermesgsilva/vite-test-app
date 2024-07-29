const MyCellComponent = ({ value }: { value: string }) => {
  return (
    <>
      <button onClick={() => window.alert("Action!")}>+</button>
      {" "}
      {value}
    </>
  );
};

export default MyCellComponent;
