"use client";

import React from "react";
import { Button, ConfigProvider, Space } from "antd";

type WaveConfig = NonNullable<Parameters<typeof ConfigProvider>[0]["wave"]>;

// Shake Effect
const showShakeEffect: WaveConfig["showEffect"] = (node, { component }) => {
  if (component !== "Button") {
    return;
  }

  const seq = [0, -15, 15, -5, 5, 0];
  const itv = 10;

  let steps = 0;

  function loop() {
    cancelAnimationFrame((node as any).effectTimeout);

    (node as any).effectTimeout = requestAnimationFrame(() => {
      const currentStep = Math.floor(steps / itv);
      const current = seq[currentStep];
      const next = seq[currentStep + 1];

      if (!next) {
        node.style.transform = "";
        node.style.transition = "";
        return;
      }

      // Trans from current to next by itv
      const angle = current + ((next - current) / itv) * (steps % itv);

      node.style.transform = `rotate(${angle}deg)`;
      node.style.transition = "none";

      steps += 1;
      loop();
    });
  }

  loop();
};

// Component
const Wrapper = ({ name, ...wave }: WaveConfig & { name: string }) => (
  <ConfigProvider wave={wave}>
    <Button
      type="primary"
      className="bg-gradient-to-l hover:bg-gradient-to-b uppercase from-primary/90 to-primary/70 hover:text-slate-900 "
    >
      {name}
    </Button>
  </ConfigProvider>
);

const ButtonShake = ({ children }: { children: string }) => (
  <Space  style={{ padding: 24 }} size="large">
    <Wrapper name={children} showEffect={showShakeEffect} />
  </Space>
);

export default ButtonShake;
