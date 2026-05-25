import { Body, Footer, FooterButton, Modal, Title } from "./Modal"

const ConfirmationModal = ({title , message ,open , onClose ,onConfirm}:{title:string ,message:string, open:boolean , onClose:()=>void ,onConfirm:()=>void})=>{
return <Modal open={open} onClose={onClose} closeOnOutsideClick className="!w-fit">
    <Title closeButtonOnClick={onClose} hasCloseButton>{title}</Title>
<Body>
    {message}
</Body>
<Footer>
    <FooterButton
    leftButtonTitle="Yes"
    onLeftButtonClick={onConfirm}
    rightButtonTitle="No"
    onRightButtonClick={onClose}
    >
    </FooterButton>
</Footer>
</Modal>
}

export default ConfirmationModal