import Image from "next/image";

const About = () => {
  return (
    <div className="text-dark m-10 flex max-w-md flex-col items-center">
      <div className="mb-3 p-3">
        <Image
          className="rounded-full"
          width={150}
          height={150}
          src="/images/face.png"
          alt="Francisco Ramos do Ó Picture"
        />
      </div>
      <p key={1} className="text-center text-lg font-bold">
        Hi, I&apos;m Francisco.
      </p>
      <p key={2} className="max-w-2 text-center">
        📍Lisbon. Cloud @ IBM.
      </p>
      <p key={3} className="max-w-xs text-center">
        Feel free to{" "}
        <a
          className="underline underline-offset-4"
          href="https://www.linkedin.com/in/franciscoramosdoo/"
        >
          connect
        </a>{" "}
        with me.
      </p>
    </div>
  );
};

export default About;
