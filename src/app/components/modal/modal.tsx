import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";

export interface ModalData {
  isOpen: boolean;
  onClose: Function;
  title: string | null;
  image: string | null;
  subtitle: string[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalComponent = (props: { state: ModalData }) => {
  return (
    <Modal open={props.state.isOpen} onClose={() => props.state.onClose()}>
      <Box sx={style}>
            {props.state.image ? <Box
              width={150}
              height={150}
            >
              <Image
                src={props.state.image}
                alt="image"
                width={150}
                height={150}
              ></Image>
            </Box> : ""}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.state.title}
        </Typography>
        {props.state.subtitle.map((subtitle) => (
          <Typography key={subtitle} id="modal-modal-description" sx={{ mt: 2 }}>
            {subtitle}
          </Typography>
        ))}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
