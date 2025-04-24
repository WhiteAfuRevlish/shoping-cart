import { Lists } from "@/components/features/Lists";
import { useLists } from "@/hooks/useLists";
import NewListModal from "./NewListModal";

const ListsPage: React.FC = () => {
  const { loading } = useLists();

  return (
    <div className="container h-full py-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            My Lists
          </h1>
          <NewListModal />
        </div>
        <Lists loading={loading} />
      </div>
    </div>
  );
};

export default ListsPage;