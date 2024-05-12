/* eslint-disable react/prop-types */

const Status = (props) => {
  const {bgColor, icon} = props
  return (
    <div className={`w-16 h-16 ${bgColor} flex justify-center items-center text-white text-3xl rounded-full`}>
      {icon}
    </div>
  );
};

export default Status;
