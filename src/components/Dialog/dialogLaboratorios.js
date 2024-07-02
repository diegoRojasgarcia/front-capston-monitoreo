import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";
import { centosDirectory } from "@/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogLaboratorios({
  openDialogSetting,
  handleCloseDialogSetting,
  setOpenDialogSetting,
  setLabActualizado,
}) {
  const [laboratorios, setLaboratorios] = useState([]);
  const cDirectory = new centosDirectory();

  React.useEffect(() => {
    cDirectory.getLabs().then((response) => {
      setLaboratorios(response);
    });
  }, []);

  const handleEdit = async (index) => {
    const item = laboratorios[index];

    const response = await cDirectory.updateLaboratorio(item);

    if (response) {
      const updatedItems = laboratorios.map((item, i) =>
        i === index ? item : item
      );
      setLaboratorios(updatedItems);
      console.log(response);
      localStorage.setItem("selectedLabs", JSON.stringify(response));
      setOpenDialogSetting(false);
      window.location.reload();
    } else {
      console.error("Failed to update activity");
    }
  };

  const handleChange = (index, event) => {
    const updatedItems = laboratorios.map((item, i) =>
      i === index ? { ...item, displayName: event.target.value } : item
    );
    setLaboratorios(updatedItems);
  };

  return (
    <Dialog
      open={openDialogSetting}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogSetting}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="flex justify-center p-5">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Display Name</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            {laboratorios ? (
              <tbody>
                {laboratorios.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border-b">{item.nombre}</td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={item.displayName}
                        onChange={(event) => handleChange(index, event)}
                        className="border p-1"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEdit(index, item.displayName)}
                        className="bg-orange-300 text-white py-1 px-3 rounded hover:bg-orange-400 transition duration-300"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className="ml-7">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-danger motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
                </div>
              </div>
            )}
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
