interface ErrorMessageProps {
  message: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="notification is-danger is-light" style={{ margin: '2rem 0', borderRadius: '0.75rem' }}>
      <strong>Error al cargar los datos</strong>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
