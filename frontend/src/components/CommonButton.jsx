/* eslint-disable react/prop-types */


const CommonButton = (props) => {
    const {bgColor, bgHoverColor, title, onClick} = props
  return (
    <div>
        <button onClick={onClick} className={`${bgColor} text-white p-2 font-medium rounded hover:${bgHoverColor} hover:rounded-md hover:scale-105 duration-200 active:scale-95`}>{title}</button>
    </div>
  )
}

export default CommonButton