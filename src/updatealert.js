import Swal from "sweetalert2";
function Update(){
 Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success").then(()=>{
      window.location.reload();
    })
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
}
 export default Update;