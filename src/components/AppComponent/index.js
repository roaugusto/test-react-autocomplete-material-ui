import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ClayButton, { ClayButtonWithIcon } from "@clayui/button";
import { ClayInput } from "@clayui/form";
import ClayIcon from "@clayui/icon";
import ClayManagementToolbar from "@clayui/management-toolbar";

import api from '../../services/api';
import Component from '../Component'

const AppComponent = params => {
  const spritemap = "../../../node_modules/clay/lib/images/icons/icons.svg";
  //const urlGetAreasGovernativas = "/ipdj.areagovernativa/get-area-governativa";

  const [dataList, setDataList] = useState([]);
  const [medidaList] = useState([]);
  const [searchMobile, setSearchMobile] = useState(false);
  const [areaGovernaList, setAreaGovernaList] = useState([]);

  useEffect(() => {
    async function loadDataList() {
      api.get('/entidade').then(response => {
        console.log(response.data)
        setDataList(response.data);
      });
    }

    async function loadGovernaList() {
      api.get('/governativaList').then(response => {
        console.log(response.data)
        setAreaGovernaList(response.data);
      });
    }

    loadDataList();
    loadGovernaList();
  }, []);

  const handleFiltro = event => {
    let filtrado = [];

    filtrado = medidaList;

    filtrado = filtrado.filter(
      filtro =>
        filtro.entidade
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) !== -1 ||
        filtro.areagovernativa
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) !== -1
    );
    setDataList(filtrado);
  };

  const handleUpdate = (governativaId, entidadeId) =>{

    console.log('governativaId', governativaId)
    console.log('entidadeId', entidadeId)

    const entidade = dataList.find(item => item.id === entidadeId)
    entidade.areagovernativaid = governativaId
    console.log('entidade', entidade)
    api.put(`/entidade/${entidadeId}`, entidade).then(response => {
      console.log(response)
    });

    api.get('/entidade').then(response => {
      console.log(response.data)
      setDataList(response.data);
    });
  } 

  return (
    <div>
      <ClayManagementToolbar>
        <ClayManagementToolbar.Search showMobile={searchMobile}>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                aria-label="Search"
                className="form-control input-group-inset input-group-inset-after"
                placeholder="Procurar..."
                type="text"
                onChange={handleFiltro}
              />
              <ClayInput.GroupInsetItem after tag="span">
                <ClayButtonWithIcon
                  className="navbar-breakpoint-d-none"
                  displayType="unstyled"
                  onClick={() => setSearchMobile(false)}
                  spritemap={spritemap}
                  symbol="times"
                />
                <ClayIcon spritemap={spritemap} symbol="search" />
              </ClayInput.GroupInsetItem>
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayManagementToolbar.Search>
        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
            <ClayButton
              className="nav-link nav-link-monospaced"
              displayType="unstyled"
              onClick={() => setSearchMobile(true)}
            >
              <ClayIcon spritemap={spritemap} symbol="search" />
            </ClayButton>
          </ClayManagementToolbar.Item>
        </ClayManagementToolbar.ItemList>
      </ClayManagementToolbar>
      <DataTable
        columns={[
          {
            name: "",
            width: "5%"
          },

          {
            name: "Entidade",
            selector: "entidade",
            sortable: true,
            width: "65%"
          },
          {
            name: "Área Governativa",
            cell: row => <Component row={row} areaGovernaList={areaGovernaList} updateSelected={handleUpdate}/>,
            sortable: true
          }
        ]}
        data={dataList}
        pagination
        noHeader
        paginationPerPage={10}
        paginationComponentOptions={{
          rowsPerPageText: "Linhas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todas"
        }}
        noDataComponent={"Não há registro para exibir"}
      />
    </div>
  );
};

export default AppComponent;
