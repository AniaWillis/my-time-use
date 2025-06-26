import { CSSProperties } from "react";

import { ClipLoader } from "react-spinners";

import { SpinnerProps } from "../types/components";

const override: CSSProperties = {
  marginTop: "auto",
  marginBottom: "auto",
};

function Spinner({ size }: SpinnerProps) {
  return (
    <div className="w-full h-fit flex justify-center items-center">
      <ClipLoader
        color={"#0891B2"}
        cssOverride={override}
        size={size}
        speedMultiplier={0.5}
        aria-label="Loading Spinner"
      />
    </div>
  );
}

export default Spinner;

// npm ReactSpinners
// www.daidhu.io/react-spinners
