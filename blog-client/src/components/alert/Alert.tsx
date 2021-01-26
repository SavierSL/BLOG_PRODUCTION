export interface AlertProps {
  error: { msg: string };
}

const Alert: React.FC<AlertProps> = ({ error }) => {
  console.log(error.msg);
  return (
    <>
      <div className="alertContainer">
        <h1>{error.msg}</h1>
      </div>
    </>
  );
};

export default Alert;
