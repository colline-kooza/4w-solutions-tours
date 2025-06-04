interface FlexibleSectionProps {
  backgroundColor?: string
  titleFirstLine: string
  titleSecondLine: string
  description: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  maxDescriptionWidth?: string
}

export default function FlexibleSection({
  backgroundColor = "bg-[#eafbf7]",
  titleFirstLine,
  titleSecondLine,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  maxDescriptionWidth = "max-w-[28rem]"
}: FlexibleSectionProps) {
  return (
    <section className={`${backgroundColor} py-10 px-4 sm:py-20 lg:py-14 mt-8 mb-8 ${className}`}>
      <div className="mx-auto max-w-4xl text-center">
        <div className={`text-4xl font-black tracking-tight text-[#000000] md:text-3xl lg:text-[42px] text-center flex flex-col items-center justify-center md:gap-4 gap-2 ${titleClassName}`}>
          <h2>{titleFirstLine}</h2>
          <span>{titleSecondLine}</span>
        </div>

        <p className={`mx-auto mt-6 ${maxDescriptionWidth} text-base md:leading-8 text-gray-700 md:text-lg leading-6 ${descriptionClassName}`}>
          {description}
        </p>
      </div>
    </section>
  );
}

// Usage examples:
/*
// Default usage (original design)
<FlexibleSection
  titleFirstLine="Keep things"
  titleSecondLine="flexible"
  description="Use Reserve Now & Pay Later to secure the activities you don't want to miss without being locked in."
/>


*/