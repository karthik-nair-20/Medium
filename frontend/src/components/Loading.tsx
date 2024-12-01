import { RingLoader } from "react-spinners";

export function Loading() {

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <RingLoader
        size={70}
        speedMultiplier={0.9}
      />
    </div>
  )
}