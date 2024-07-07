import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import React, { useState, useEffect } from "react";
import { centosDirectory } from "@/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DialogoProgramaciones({
  openDialogProgramaciones,
  setOpenDialogProgramaciones,
  handleCloseDialogProgramaciones,
}) {
  const [programaciones, setProgramaciones] = useState([]);
  const cDirectory = new centosDirectory();
  const [isEditing, setIsEditing] = useState(null);
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("");

  useEffect(() => {
    cDirectory.getProgramaciones().then((response) => {
      setProgramaciones(response);
    });
  }, [openDialogProgramaciones]);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Meses empiezan en 0
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);

    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    setMinTime(`${hours}:${minutes}`);
  }, []);

  const handleEdit = async (index) => {
    const item = programaciones[index];

    const response = await cDirectory.updateProgramacion(item);
    if (response) {
      const updatedItems = programaciones.map((item, i) =>
        i === index ? item : item
      );
      setProgramaciones(updatedItems);
      setIsEditing(false);
    } else {
      console.error("Failed to update Programación");
    }
  };

  const handleDateChange = (event, index) => {
    const { value } = event.target;
    const date = new Date(value);
    // Validar que la fecha ingresada sea válida
    if (isNaN(date.getTime())) {
      alert("Por favor, ingrese una fecha válida.");
      return;
    }
    handleChange(index, "fecha", event);
  };

  const handleDelete = async (index) => {
    const item = programaciones[index];
    const response = await cDirectory.deleteProgramacion(item);
    if (response) {
      const updatedItems = programaciones.filter((_, i) => i !== index);
      setProgramaciones(updatedItems);
    } else {
      console.error("Failed to delete Programación");
    }
  };

  const handleChange = (index, field, event) => {
    const updatedItems = programaciones.map((item, i) =>
      i === index ? { ...item, [field]: event.target.value } : item
    );
    setProgramaciones(updatedItems);
  };

  return (
    <Dialog
      maxWidth={"lg"}
      open={openDialogProgramaciones}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialogProgramaciones}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <div className="py-2 text-xl flex items-center justify-center">
          {" "}
          <p>Programaciones Agendadas</p>
        </div>
        <div className="flex justify-center p-5 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Laboratorio</th>
                <th className="py-2 px-4 border-b">Actividad</th>
                {/* <th className="py-2 px-4 border-b">Usuario</th> */}
                <th className="py-2 px-4 border-b">Fecha</th>
                <th className="py-2 px-4 border-b">Hora Inicio</th>
                <th className="py-2 px-4 border-b">Hora Fin</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            {programaciones ? (
              <tbody>
                {programaciones.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-2 border-b">
                      <input
                        type="text"
                        value={item.labdisplayname}
                        onChange={(event) =>
                          handleChange(index, "laboratorio", event)
                        }
                        className="border p-1 w-[120px] "
                        disabled={true}
                      />
                    </td>
                    <td className="py-2 px-2 border-b">
                      <input
                        type="text"
                        value={item.actividad}
                        onChange={(event) =>
                          handleChange(index, "actividad", event)
                        }
                        className="border p-1 w-[120px]"
                        disabled={isEditing !== index}
                      />
                    </td>

                    {/* <td className="py-2 px-2 border-b">
                    <input
                      type="email"
                      value={item.email}
                      onChange={(event) => handleChange(index, "email", event)}
                      className="border p-1 w-full"
                      disabled={isEditing !== index}
                    />
                  </td> */}
                    <td className="py-2 px-2 border-b">
                      <input
                        type="date"
                        value={item.fecha}
                        onChange={(event) => handleDateChange(event, index)}
                        className="border p-1 w-full"
                        disabled={isEditing !== index}
                        min={minDate}
                      />
                    </td>
                    <td className="py-2 px-2 border-b">
                      <input
                        type="time"
                        value={item.horainicio}
                        onChange={(event) =>
                          handleChange(index, "horainicio", event)
                        }
                        className="border p-1 w-full"
                        disabled={isEditing !== index}
                        min={minTime}
                      />
                    </td>
                    <td className="py-2 px-2 border-b">
                      <input
                        type="time"
                        value={item.horafin}
                        onChange={(event) =>
                          handleChange(index, "horafin", event)
                        }
                        className="border p-1 w-full"
                        disabled={isEditing !== index}
                      />
                    </td>
                    <td className="py-2 px-2 border-b flex justify-around">
                      {isEditing === index ? (
                        <>
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-700 transition duration-300 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(null)}
                            className="bg-gray-500 text-white py-2 px-3 rounded hover:bg-gray-700 transition duration-300"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => setIsEditing(index)}
                            className="bg-orange-300 text-white py-2 px-3 rounded hover:bg-orange-500 transition duration-300 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-700 transition duration-300"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : null}
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
