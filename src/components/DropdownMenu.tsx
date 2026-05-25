import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, type ReactNode } from "react";

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownItem[];
  menuClassName?: string;
  itemClassName?: string;
  position?: "left" | "right";
}

const DropdownMenu = ({
  trigger,
  items,
  menuClassName = "",
  itemClassName = "",
  position = "right",
}: DropdownMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* TRIGGER */}
      <Menu.Button as="div" className="cursor-pointer">
        {trigger}
      </Menu.Button>

      {/* DROPDOWN */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95 translate-y-1"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            `
            absolute z-50 mt-3 min-w-[220px]
            rounded-2xl border border-primary-100
            bg-white shadow-xl outline-none
            overflow-hidden
          `,
            position === "right" ? "right-0" : "left-0",
            menuClassName
          )}
        >
          <div className="p-2">
            {items.map((item, index) => (
              <Menu.Item key={index} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    disabled={item.disabled}
                    onClick={item.onClick}
                    className={classNames(
                      `
                      w-full flex items-center gap-3
                      px-4 py-3 rounded-xl text-sm
                      transition-all duration-150
                    `,
                      active && !item.disabled
                        ? item.danger
                          ? "bg-red-50 text-red-500"
                          : "bg-primary-100 text-gray-800"
                        : item.danger
                        ? "text-red-500"
                        : "text-gray-700",
                      item.disabled &&
                        "opacity-50 cursor-not-allowed",
                      itemClassName
                    )}
                  >
                    {item.icon && (
                      <span className="flex items-center justify-center">
                        {item.icon}
                      </span>
                    )}

                    <span className="font-medium">
                      {item.label}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;