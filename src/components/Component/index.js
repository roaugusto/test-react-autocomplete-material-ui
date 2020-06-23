import React from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Component = (props) => {
  const {row, areaGovernaList, updateSelected} = props

  const handleSelect = (governativaRow) => {
    if(!governativaRow) return
    console.log("governativaRow", governativaRow);
    updateSelected(governativaRow.id, row.id)
  };

  
  const findGovernativa = areaGovernaList.find(item => item.id === row.areagovernativaid)

  return (
    <Autocomplete
      id={areaGovernaList.id}
      options={areaGovernaList}
      value={findGovernativa}
      getOptionLabel={option => option.titulo}
      onChange={(event, governativaRow) => handleSelect(governativaRow)}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField {...params} label="Área Governativa" variant="outlined" />
      )}
    />
  );
};


export default Component;
