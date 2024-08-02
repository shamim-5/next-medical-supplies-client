import React from "react";
import type { FormInstance } from "antd";
import { Button, Form } from "antd";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButtonAntd: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      className="bg-gradient-to-l hover:bg-gradient-to-b from-primary/90 to-primary/70 hover:text-slate-900 mr-4"
    >
      {children}
    </Button>
  );
};

export default SubmitButtonAntd;
