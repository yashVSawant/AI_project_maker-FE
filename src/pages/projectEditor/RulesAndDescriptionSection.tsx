import Button from "../../components/Button";

type Props = {
  description?: string;
  rules?: string;
};

const RulesAndDescriptionSection = ({
  description,
  rules,
}: Props) => {
  return (
    <>
      {/* DESCRIPTION */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary">
        <h3 className="text-lg font-semibold mb-3">
          Description
        </h3>

        <div className="text-sm text-gray-600 whitespace-pre-wrap">
          {description || "No description available."}
        </div>
      </div>

      {/* RULES */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary">
        <h3 className="text-lg font-semibold mb-3">
          Rules
        </h3>

        <div className="flex flex-col gap-2">
         
              <div
                
                className="bg-gray-100 rounded-lg p-3 text-sm"
              >
                {rules}
              </div>
            
        </div>

        <div className="flex justify-end mt-4">
          <Button>
            Save Rules
          </Button>
        </div>
      </div>
    </>
  );
};

export default RulesAndDescriptionSection;