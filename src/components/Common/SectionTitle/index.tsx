interface SectionTitleProps {
  title: string;
  paragraph?: string;
  width?: string;
  center?: boolean;
  mb?: string;
}

const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: SectionTitleProps) => {
  return (
    <div
      className={`w-full ${center ? "text-center" : ""}`}
      style={{ marginBottom: mb }}
    >
      <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
        {title}
      </h2>
      {paragraph && (
        <p className="text-base !leading-relaxed text-body-color md:text-lg">
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default SectionTitle; 