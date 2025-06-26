import { BENEFITS } from "../constants/benefits";

function BenefitsCard() {
  return (
    <div className="flex flex-col p-6 h-fit xs:w-4/5 lg:w-3/4 mx-auto bg-linear-to-br from-cyan-700 to-cyan-500/25 rounded-sm mt-10 sm:mt-16">
      <h2 className="font-heading font-semibold text-lg sm:text-xl text-center mb-6">
        Benefits of improved time management
      </h2>
      <ul className="z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BENEFITS.map((benefit) => (
          <li
            key={benefit}
            className="flex border border-zinc-50 rounded-sm min-h-16 justify-center items-center font-body font-normal text-base p-2 text-center"
          >
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BenefitsCard;
