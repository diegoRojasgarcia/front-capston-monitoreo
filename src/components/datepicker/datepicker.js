import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export function DatePicker({ valueDateP, setValueDateP }) {
  return (
    <Datepicker
      primaryColor={"orange"}
      value={valueDateP}
      asSingle={true}
      useRange={false}
      displayFormat={"DD/MM/YYYY"}
      onChange={(date) => setValueDateP(date)}
    />
  );
}
