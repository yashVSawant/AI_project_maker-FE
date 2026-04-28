type Condition = {
  conditionId: string;
  rule: string;
  action: "HIDDEN" | "DISABLED";
};

type Component = {
  id: string;
  conditions?: Condition[];
  children?: Component[];
};

export const extractConditions = (components: Component[]) => {
  const conditionsMap: Record<string, Condition> = {};

  const traverse = (comp: Component) => {
    if (comp.conditions) {
      comp.conditions.forEach((c) => {
        conditionsMap[c.conditionId] = c;
      });
    }

    comp.children?.forEach(traverse);
  };

  components.forEach(traverse);

  return {
    conditionsMap,
    conditionsArray: Object.values(conditionsMap), // ✅ FIX
  };
};
