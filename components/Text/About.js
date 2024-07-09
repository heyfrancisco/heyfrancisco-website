import Image from "next/image";

const About = () => {
  return (
    <div className="flex flex-col items-center text-dark max-w-md m-10">
      <div className="mb-3 p-3">
        <Image
          className="rounded-full"
          width={150}
          height={150}
          src="/images/face.png"
          alt="Francisco Ramos do Ó Picture"
        />
      </div>
      <p key={1} className="p-2 text-center font-bold text-lg">
        Hi, I&apos;m Francisco.
      </p>
      <p key={2} className="p-2 text-center max-w-2">
        📍Lisbon. Cloud @ IBM.
      </p>
      <p key={3} className="p-2 max-w-xs text-center">
        Feel free to{" "}
        <a className="underline underline-offset-4" href="https://www.linkedin.com/in/franciscoramosdoo/">
          connect
        </a>{" "}
        with me.
      </p>
    </div>
  );
};

export default About;
