import  {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  generateUpdatedClassName,
  updateComponentInTree,
} from "../../utils/data.helper";

import { tailwindOptions } from "./data/editData";

import Button from "../../components/Button";

import {
  getComponentData,
  updateSingleComponentManually,
} from "../dashboard/api";

import type { ComponentDTO } from "../project/dto/component.dto";
import { useProjectStore } from "../../store/project.store";

type Props = {
  projectId: string;
  selectedComponentId: string;
};

const ManualEditSection = ({
  projectId,
  selectedComponentId,
}: Props) => {
  const queryClient = useQueryClient();
  const [selectedClasses, setSelectedClasses] =
    useState<Record<string, string>>({});
const {projectQueryData ,setProjectQueryData} = useProjectStore()

  const [formData, setFormData] =
    useState<ComponentDTO | null>(null);

  const { data } = useQuery({
    queryKey: [
      "selectedComponent",
      selectedComponentId,
    ],
    queryFn: () =>
      getComponentData(selectedComponentId),

    enabled: Boolean(selectedComponentId),
  });

  /*
    INITIALIZE FORM
  */
  useEffect(() => {
    if (!data?.data) return;

    const component = data.data;

    setFormData(component);

    initializeSelectedClasses(
      component.className || ""
    );
    queryClient.setQueryData(["projects", projectId],()=>{
        return projectQueryData
    })
  }, [data?.data]);

  /*
    INITIALIZE ACTIVE TAILWIND BUTTONS
  */
  const initializeSelectedClasses = (
    className: string
  ) => {
    const classList = className.split(" ");

    const selectedMap: Record<string, string> = {};

    Object.entries(tailwindOptions).forEach(
      ([section, values]) => {
        const matched = values.find((item) =>
          classList.includes(item.value)
        );

        if (matched) {
          selectedMap[section] = matched.value;
        }
      }
    );

    setSelectedClasses(selectedMap);
  };

  /*
    UPDATE SELECTED CLASS
  */
 const handleSelect = (
  section: string,
  className: string
) => {
  setSelectedClasses((prev) => {
    const isAlreadySelected =
      prev[section] === className;

    /*
      REMOVE IF SAME BUTTON CLICKED AGAIN
    */
    if (isAlreadySelected) {
      const updated = { ...prev };

      delete updated[section];

      return updated;
    }

    /*
      OTHERWISE REPLACE SECTION VALUE
    */
    return {
      ...prev,
      [section]: className,
    };
  });
};

  /*
    FINAL CLASSNAME
  */
  const finalClassName = useMemo(() => {
    return generateUpdatedClassName({
      existingClassName:
        formData?.className || "",
      selectedClasses,
    });
  }, [selectedClasses, formData]);

  useEffect(()=>{
    if(finalClassName){
         queryClient.setQueryData(
        ["projects", projectId],
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              components: updateComponentInTree(
                oldData.data.components,
                selectedComponentId,
                (node) => ({
                    ...node,
                    text:formData?.text,
                    description:formData?.description,
                    rules:formData?.rules,
                    className :finalClassName,
                })
              ),
            },
          };
        }
      );
    }
  },[finalClassName, formData?.text , formData?.description , formData?.rules])

  /*
    SAVE
  */
  const { mutate, isPending } = useMutation({
    mutationKey: ["manual-component-edit"],

    mutationFn: (payload: ComponentDTO) =>
      updateSingleComponentManually(
        projectId,
        selectedComponentId,
        payload
      ),

    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["projects", projectId],
        (oldData: any) => {
          if (!oldData) return oldData;
          setProjectQueryData({
            ...oldData,
            data: {
              ...oldData.data,
              components: updateComponentInTree(
                oldData.data.components,
                selectedComponentId,
                (node) => ({
                    ...node,
                  ...variables,
                })
              ),
            },
          })

          return {
            ...oldData,
            data: {
              ...oldData.data,
              components: updateComponentInTree(
                oldData.data.components,
                selectedComponentId,
                (node) => ({
                    ...node,
                  ...variables,
                })
              ),
            },
          };
        }
      );
    },
  });

  const handleSave = () => {
    if (!formData) return;

    mutate({
      ...formData,
      className: finalClassName,
    });
  };

  if (!formData) return null;

  return (
    <div className="bg-white text-xs rounded-2xl p-5 shadow-sm border border-primary">

      <h3 className="text-sm font-semibold mb-6">
        Manual Component Editor
      </h3>

      {/* TEXT */}
      {"text" in formData && (
        <div className="mb-6">
          <label className="text-xs font-medium block mb-2">
            Text
          </label>

          <input
            value={formData.text || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev!,
                text: e.target.value,
              }))
            }
            className="w-full border border-primary-500 rounded-xl p-3 outline-none"
          />
        </div>
      )}

      {/* DESCRIPTION */}
      <div className="mb-6">
        <label className="text-xs font-medium block mb-2">
          Description
        </label>

        <textarea
          value={formData.description || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev!,
              description: e.target.value,
            }))
          }
          rows={4}
          className="w-full border border-primary-500 rounded-xl p-3 outline-none"
        />
      </div>

      {/* RULES */}
      <div className="mb-6">
        <label className="text-xs font-medium block mb-2">
    Rules
  </label>

  <textarea
    value={formData.rules || ""}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev!,
        rules: e.target.value,
      }))
    }
    rows={5}
    placeholder="Enter component rules..."
    className="w-full border border-primary-500 rounded-xl p-3 outline-none"
  />
      </div>

      {/* TAILWIND */}
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(tailwindOptions).map(
          ([section, values]) => (
            <div key={section}>
              <p className="text-xs font-medium capitalize mb-2">
                {section}
              </p>

             <div className="flex flex-wrap gap-2">
  {values.map((option) => {
    const isActive =
      selectedClasses[section] ===
      option.value;

    const isColor = [
      "backgroundColor",
      "textColor",
    ].includes(section);

const color = isColor
  ? option.value.split("-").slice(1).join("-")
  : "";

    return (
      <button
        key={option.value}
        onClick={() =>
          handleSelect(
            section,
            option.value
          )
        }
        className={`
          ${
            isColor
              ? `
                w-5 h-5 rounded-full
                border-2
                bg-${color}
              `
              : `
                text-xs px-2 py-1 rounded-xl
              `
          }

          ${
            isActive
              ? `ring-2 ring-offset-2 ring-primary-500 ${!isColor && "bg-primary-100"}`
              : "border border-primary"
          }
        `}
      >
        {!isColor && option.label}

        {/* WHITE COLOR BORDER */}
        {isColor &&
          option.value.includes("white") && (
            <div className="w-full h-full rounded-full border border-gray-300" />
          )}

        {/* BLACK COLOR INDICATOR */}
        {isColor &&
          option.value.includes("black") && (
            <div className="w-full h-full rounded-full border border-gray-500" />
          )}
      </button>
    );
  })}
</div>
            </div>
          )
        )}
      </div>

      {/* GENERATED CLASSNAME */}
      <div className="mt-6 border-t border-primary pt-4">
        <p className="text-sm font-medium mb-2">
          Generated ClassName
        </p>

        <div className="border border-primary-500 p-4 rounded-xl text-xs break-all font-mono">
          {finalClassName}
        </div>
      </div>

      {/* SAVE */}
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending
            ? "Saving..."
            : "Save Manual Changes"}
        </Button>
      </div>
    </div>
  );
};

export default ManualEditSection;