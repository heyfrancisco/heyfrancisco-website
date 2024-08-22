import Card from "../components/UI/Card";
import About from "../components/Text/About";
import Layout from "./layout";

export default function Home() {
  return (
    <Layout>
      <div className="bg-gray-100">
        <Card>
          <About />
        </Card>
      </div>
    </Layout>
  );
}
