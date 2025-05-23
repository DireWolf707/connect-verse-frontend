import { Player } from "@lottiefiles/react-lottie-player"

const Circles = () => {
  return (
    <div className="flex grow items-center justify-center overflow-hidden">
      <Player autoplay loop src="/animations/circles.json" />
    </div>
  )
}

export default Circles
