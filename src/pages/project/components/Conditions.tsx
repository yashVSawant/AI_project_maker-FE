import SideDrawer from "../../../components/SideDrawer";
import { useProjectStore } from "../../../store/project.store";
import Condition from "./Condition";

const Conditions = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { conditions } = useProjectStore();
  return (
    <SideDrawer title="Conditions" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        {conditions.map((c) => {
          return <Condition {...c} />;
        })}
      </div>
    </SideDrawer>
  );
};
export default Conditions;
