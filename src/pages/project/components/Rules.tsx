import { Body, Modal, Title } from "../../../components/Modal";

const Rules = ({
  open,
  onClose,
  rules,
}: {
  open: boolean;
  onClose: () => void;
  rules: string[];
}) => {
  return (
    <Modal open={open} onClose={onClose} rootClassName="!w-100">
      <Title hasCloseButton closeButtonOnClick={onClose}>Rules</Title>
      <Body>
        <div className="p-4">
          {rules.map((rule) => {
            return <div className="w-full bg-gray rounded-md ">{rule}</div>;
          })}
        </div>
      </Body>
    </Modal>
  );
};
export default Rules;
