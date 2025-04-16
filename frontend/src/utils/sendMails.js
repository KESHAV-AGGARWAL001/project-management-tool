import emailjs from "@emailjs/browser";
const sendEmail = (from_email, receiver_email) => {
  const room_id = localStorage.getItem("projectId");
  const SERVICE_ID = "service_kxmtdul";
  const TEMPLATE_ID = "template_ri1x795";
  const PUBLIC_KEY = "aH36VXZ105_FsinYA";

  return emailjs
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
      (result) => {
        console.log("Email sent successfully:", result);
        alert("Successfully Sent the Email!");
      },
      (error) => {
        console.error("Email sending failed:", error);
        alert(`Failed to send the Email! Error: ${error.text || error.message || 'Unknown error'}`);
        throw error;
      }
    );
};

export default sendEmail;
