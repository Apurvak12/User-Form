import Swal from "sweetalert2";
function Popup(){
  Swal.fire({
  title: "Thank You!",
  text: "Your form is submitted Successfully!",
  icon: "success"
}).then();
}
export default  Popup;