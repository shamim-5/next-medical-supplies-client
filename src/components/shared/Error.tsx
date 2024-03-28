"use client";
import { Empty } from "antd";

interface IErrorPageProps {
  message: string | undefined;
}
const Error: React.FC<IErrorPageProps> = ({ message }) => (
  <div>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
      <h3 className="text-xs text-warning  py-6 px-2 border-2 border-warning/30 rounded mt-2 font-mono">{message}</h3>
    </Empty>
  </div>
);

export default Error;
