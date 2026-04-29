import { Body, Modal, Title } from "../../../components/Modal";

const Description = ({
  open,
  onClose,
  descriptions,
}: {
  open: boolean;
  onClose: () => void;
  descriptions: string[];
}) => {
  return (
    <Modal open={open} onClose={onClose} rootClassName="!w-100">
      <Title hasCloseButton closeButtonOnClick={onClose}>Description</Title>
      <Body>
        <div className="p-4">
          {descriptions.map((description) => {
            return <div className="w-full bg-gray rounded-md ">{description}</div>;
          })}
        </div>
      </Body>
    </Modal>
  );
};

export default Description;
