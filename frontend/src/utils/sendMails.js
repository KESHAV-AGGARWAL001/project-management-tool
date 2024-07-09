import emailjs from "@emailjs/browser";
const sendEmail = (from_email, receiver_email) => {
  const room_id = localStorage.getItem("roomId");
  const SERVICE_ID = "service_mnh9g1i";
  const TEMPLATE_ID = "template_6chk60g";
  const PUBLIC_KEY = "z7ErE13oWKFQhnrD5";
  emailjs
    .send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        room_id,
        from_email,
        receiver_email,
      },
      {
        publicKey: PUBLIC_KEY,
      }
    )
    .then(
      () => {
        alert("Successfully Sent the Email!");
      },
      (error) => {
        alert("Failed to send the Email!", error);
      }
    );
};

export default sendEmail;
