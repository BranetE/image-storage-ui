const Controls = ({children}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
      {children}
    </div>
  );
};

export default Controls;
