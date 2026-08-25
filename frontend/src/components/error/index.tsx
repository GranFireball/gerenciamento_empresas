interface ErrorProps {
  message: string
}
export default function Error({
  message
}: ErrorProps){
    return (
      <p>{message}</p>
    )
}