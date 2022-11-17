import '../Error/Error.css'

const Error = ({ message }) => {
  return <div className="error-container">
    <p>{message}</p>
  </div>
}

export default Error