import { Button } from "antd";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-red-700 font-heebo">Test TailwindCSS</h1>
      <p>Test TailwindCSS</p>
      <div className="mx-12 bg-gray-dark">
        <h2>Test TailwindCSS with Antd</h2>
        <Button type="primary">Antd button</Button>
      </div>
    </div>
  );
}
