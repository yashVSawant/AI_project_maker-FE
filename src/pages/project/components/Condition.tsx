import Button, { ButtonVariant } from "../../../components/Button";
import { useProjectStore } from "../../../store/project.store";

const Condition = ({
  conditionId,
  rule,
  action,
  active = false,
}: {
  conditionId: string;
  rule: string;
  action: string;
  active?: boolean;
}) => {
  const isHidden = action === "HIDDEN";
  const { updateConditionState } = useProjectStore();
  const isActive = Boolean(active);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition">
      {/* Rule */}
      <p className="text-sm text-gray-800 font-medium leading-snug">{rule}</p>

      {/* Action Badge */}
      <div className="mt-2 flex items-center  gap-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded 
            ${isHidden ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}
        >
          {action}
        </span>
        {isActive ? (
          <Button
            variant={ButtonVariant.SECONDARY}
            onClick={() => {
              updateConditionState({ conditionId: conditionId, active: !isActive });
            }}
          >
            Inactivate
          </Button>
        ) : (
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={() => {
              updateConditionState({ conditionId: conditionId, active: !isActive });
            }}
          >
            Activate
          </Button>
        )}
      </div>
    </div>
  );
};

export default Condition;
