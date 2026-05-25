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

export const replaceSubtreeInTree = (
  nodes: any[],
  targetId: string,
  newSubtree: any
): any[] => {
  return nodes.map((node) => {
    // 🎯 Replace entire node
    if (node.id === targetId) {
      debugger
      return newSubtree;
    }

    // 🔁 Traverse children
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: replaceSubtreeInTree(
          node.children,
          targetId,
          newSubtree
        )
      };
    }

    return node;
  });
};

export const getComponentTreeInTree = (
  nodes: any[],
  targetId: string,
): any => {
  for (const node of nodes) {
    // ✅ Found node
    if (node.id === targetId) {
      return node;
    }

    // ✅ Search children recursively
    if (node.children?.length) {
      const found = getComponentTreeInTree(
        node.children,
        targetId,
      );

      if (found) {
        return found;
      }
    }
  }

  return null;
};


export const generateUpdatedClassName = ({
  existingClassName,
  selectedClasses,
}: {
  existingClassName?: string;
  selectedClasses: Record<string, string>;
}) => {
  const existing = existingClassName?.split(" ") || [];

  const selectedValues = Object.values(selectedClasses);

  const filteredExisting = existing.filter(
    (cls) => !selectedValues.includes(cls)
  );

  return [...filteredExisting, ...selectedValues].join(" ").trim();
};