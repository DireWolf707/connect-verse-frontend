import { Player } from "@lottiefiles/react-lottie-player"

const Waving = ({ className }) => {
  return (
    <div className="flex grow items-center justify-center overflow-hidden">
      <Player
        autoplay
        loop
        src="/animations/waving.json"
        className={className}
      />
    </div>
  )
}

export default Waving
