import Image from "next/image";

const About = () => {
  return (
    <div className="text-dark m-10 flex max-w-md flex-col items-center">
      <div className="p-3">
        <Image
          className="rounded-full"
          width={150}
          height={150}
          src="/images/face.png"
          alt="Francisco Ramos do Ó Picture"
        />
      </div>
      <div className="py-2 text-center text-lg font-bold">
        Hi, I&apos;m Francisco.
      </div>
      <div className="max-w-2 py-2 text-center">📍Lisbon. Cloud @ IBM.</div>
      <div className="max-w-xs py-2 text-center">
        Feel free to{" "}
        <a
          className="font-sans font-extralight underline underline-offset-4"
          href="https://www.linkedin.com/in/franciscoramosdoo/"
        >
          connect
        </a>{" "}
        with me.
      </div>
    </div>
  );
};

export default About;
