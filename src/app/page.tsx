import Layout from "@/components/layout/Layout";

export default function HomePage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Layout>
        {children}
      </Layout>
    </div>
  );
}
