import Layout from "components/layout";
import Navbar from "components/navbar";

export default function Home() {
  return (
    <Layout bgColor="#F9FAFF">
      <Navbar />
      <h1 className="text-5xl bg-blue-100">Hello, World!</h1>
    </Layout>
  );
}
