const About = () => {
  return (
    <div className="text-white max-w-md m-10">
      <p key={1} className="p-2">
        Hi 👋🏽 I&apos;m Francisco. I was born and live in Lisbon, Portugal.
      </p>
      <p key={2} className="p-2">
        I&apos;m currently working @ IBM building solutions on someone else’s computer.
      </p>
      <p key={3} className="p-2">
        Feel free to say{" "}
        <a
          className="underline underline-offset-4"
          href="mailto:talk@heyfrancisco.com"
        >
          hello
        </a>
        , fork my{" "}
        <a
          className="underline underline-offset-4"
          href="https://github.com/heyfrancisco"
        >
          code
        </a>
        , see my{" "}
        <a
          className="underline underline-offset-4"
          href="https://instragram.com/francisco.doo"
        >
          photos
        </a>{" "}
        or{" "}
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
