import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import React, { Fragment, useRef } from "react";
import type { ReactNode } from "react";
import classNames from "classnames";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  rootClassName?: string;
  closeOnOutsideClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  className = "",
  mainClassName = "",
  rootClassName = "",
  closeOnOutsideClick = true,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classNames("relative")}
        initialFocus={cancelButtonRef}
        onClose={() => {
          if (!closeOnOutsideClick) {
            return;
          }
          onClose();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div
          className={classNames(
            mainClassName,
            "fixed inset-0 bg-black/5  w-screen overflow-y-auto !font-poppins flex items-center justify-center",
          )}
        >
          <div
            className={classNames(
              rootClassName,
              "flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0 w-[70%]",
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  className,
                  `relative transform overflow-hidden rounded-3xl bg-[#FFFFFF] dark:bg-borderDark text-center shadow-sm transition-all sm:my-8 sm:w-full`,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface TitleProps {
  children: ReactNode;
  rootClassNames?: string;
  hasCloseButton?: boolean;
  closeButtonOnClick?: () => void;
  titleClassNames?: string;
  containerClassName?: string;
}

export const Title: React.FC<TitleProps> = ({
  children,
  rootClassNames,
  hasCloseButton = false,
  closeButtonOnClick,
  titleClassNames,
  containerClassName,
}) => (
  <div className={classNames(`w-full flex items-center px-5 `, containerClassName)}>
    <div className={classNames("pb-4 pt-5 sm:p-6 sm:pb-4 flex-1", titleClassNames)}>
      <div className="text-center">
        <div className={classNames("text-lg leading-6 font-medium text-gray-900 ", rootClassNames)}>
          {children}
        </div>
      </div>
    </div>
    {hasCloseButton && (
      <button
        className="cursor-pointer font-[200]  text-[1.5rem] mt-0 absolute right-5 top-5"
        onClick={closeButtonOnClick}
      >
        <X className="h-6 w-6 text-gray-700 font-thin " />
        {/* <CloseIcon className="fill-black dark:fill-white" /> */}
      </button>
    )}
  </div>
);

interface BodyProps {
  children: ReactNode;
  className?: string;
}

export const Body: React.FC<BodyProps> = ({ children, className }) => (
  <div className={`${className} mt-2 px-4 pt-1 pb-6 justify-center w-full flex sm:px-6`}>
    {children}
  </div>
);

interface FooterProps {
  children: ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => (
  <div className="px-4 pt-1 pb-6 justify-center w-full flex sm:px-6">{children}</div>
);

interface FooterButtonProps {
  leftButtonTitle?: string;
  rightButtonTitle?: string;
  onLeftButtonClick?: (value: any) => void;
  onRightButtonClick?: (value: any) => void;
  leftButtonClassName?: string;
  rightButtonClassName?: string;
}

export const FooterButton: React.FC<FooterButtonProps> = ({
  leftButtonTitle,
  leftButtonClassName,
  rightButtonTitle,
  rightButtonClassName,
  onLeftButtonClick,
  onRightButtonClick,
}) => (
  <div className="sm:flex sm:flex-row-reverse">
    {rightButtonTitle && (
      <button
        type="button"
        className={`inline-flex w-full justify-center rounded-md  bg-primary px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-buttonBg sm:ml-5 sm:w-auto ${rightButtonClassName}`}
        onClick={onRightButtonClick}
      >
        {rightButtonTitle}
      </button>
    )}
    {leftButtonTitle && (
      <button
        type="button"
        className={`flex items-center mt-2 w-full justify-center rounded-md bg-lightGrayBg px-7 py-2 text-sm font-semibold text-subHeader shadow-sm ring-1 ring-inset ring-lightGrayBg hover:bg-lightGrayBg sm:mt-0 sm:w-auto ${leftButtonClassName}`}
        onClick={onLeftButtonClick}
      >
        {leftButtonTitle}
      </button>
    )}
  </div>
);
