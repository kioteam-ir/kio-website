import { AdminLayout } from "../components/layout/AdminLayout";
import { Container } from "../components/ui/Container";

export default function AdminSeoPage() {
  return (
    <AdminLayout>
      <Container dir="rtl" className="py-6 sm:py-8">
        <h2 className="w-full text-5xl text-center mt-5">hello world</h2>
      </Container>
    </AdminLayout>
  );
}
