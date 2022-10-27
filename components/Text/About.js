const About = () => {
  return (
    <div className="text-white max-w-md m-10">
      <p key={1} className="p-2">
        Hi 👋🏽 I&apos;m Francisco. I was born and live in Lisbon, Portugal.
      </p>
      <p key={2} className="p-2">
        I like learning about technology and make people&apos;s life better with
        it. I&apos;m currently working @ IBM.
      </p>
      <p key={3} className="p-2">
        Outside of my academic ventures, I enjoy traveling and playing sports,
        mainly rugby. I spend most of my spare time reading about tech, business
        and finance.
      </p>
      <p key={4} className="p-2">
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
