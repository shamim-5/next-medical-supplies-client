import { useState } from "react";

export default function useCollapsed() {
  const [collapsed, setCollapsed] = useState(false);

  return { collapsed, setCollapsed };
}
