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

export const updateComponentInTree = (
  nodes: any[],
  componentId: string,
  updater: (node: any) => any
): any[] => {
  return nodes.map((node) => {
    // 🎯 if current node matches
    if (node.id === componentId) {
      return updater(node);
    }

    // 🔁 if children exist → recurse
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateComponentInTree(
          node.children,
          componentId,
          updater
        )
      };
    }

    return node;
  });
};

export const removeComponentFromTree = (
  nodes: any[],
  targetId: string
): any[] => {
  return nodes
    // ❌ remove the node if it matches
    .filter((node) => node.id !== targetId)

    // 🔁 recurse into children
    .map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: removeComponentFromTree(
            node.children,
            targetId
          )
        };
      }
      return node;
    });
};