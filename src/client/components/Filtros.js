import React, { useEffect, useState } from "react";
import { fetchData } from "../services/service";
import { FcSearch } from "@react-icons/all-files/fc/FcSearch";


const Filtros = ({
    ctx,
    bannerId,
    sedes,
    setSedes,
    rectorias,
    setRectorias,
    sede,
    rectoria,
    setSede,
    setRectoria,
    areas,
    setAreas,
    area,
    setArea,
    filtrarEventos
}) => {
    const urlEstudiantes = "https://comunidad.uniminuto.edu/estudiantes"
    const urlEventos = "https://registros.uniminuto.edu/api_eventos_test"
    // const urlEventos = "https://registros.uniminuto.edu/api_eventos"
    // const urlEventos = "http://localhost/api_eventos"

    // states
    const [disabledRec, setDisabledRec] = useState(true)
    const [disabledSede, setDisabledSede] = useState(true)
    const [disabledArea, setDisabledArea] = useState(true)
    const [rectoriasSedes, setRectoriasSedes] = useState([])

    useEffect(() => {
        obtenerRectorias()
        obtenerAreas()
    }, [])

    const obtenerRectorias = async () => {
        try {
            const rectoriasConSedes = await fetchData({ url: `${urlEventos}/select/index.php?fn=rectoriasSedes`, headers: {} })

            setRectoriasSedes(rectoriasConSedes);
            const rectorias = rectoriasConSedes.map(({ rectoria }) => rectoria);
            setRectorias(rectorias);

            const resultadoEstudiante = await fetchData({ url: `${urlEstudiantes}/Estudiantes/ProgramasAll/${bannerId}` })
            const ultimoResultadoEstudiante = resultadoEstudiante[resultadoEstudiante.length - 1]
            setRectoria(ultimoResultadoEstudiante.descRectoria)
            setSede(ultimoResultadoEstudiante.sede)

            const sedes = obtenerSedes(ultimoResultadoEstudiante.descRectoria, rectoriasConSedes)
            setSedes(JSON.parse(sedes))
            setDisabledRec(false)
            setDisabledSede(false)
        } catch (error) {
            console.log(`error ${error}`)
        }
    }

    const obtenerSedes = (rectoriaFiltrar, rectorias = rectoriasSedes) => {
        return rectorias.filter(({ rectoria }) => rectoria == rectoriaFiltrar).map(({ sedes }) => sedes)
    }

    const changeSedes = async (e) => {
        e.persist();
        setRectoria(e.target.value)
        setSedes(JSON.parse(obtenerSedes(e.target.value)))
    }

    const obtenerAreas = async () => {
        setDisabledArea(true)
        const result = await fetchData({ url: `${urlEventos}/select/index.php?fn=consultarArea` })
        setAreas(result)
        setDisabledArea(false)
    }
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-6">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm" value={rectoria} disabled={disabledRec} onChange={(e) => changeSedes(e)}>
                        <option value="">
                            {disabledRec ? 'Cargando Rectorias...' : 'SELECICIONE UNA RECTORIA'}
                        </option>
                        {
                            rectorias.length != 0 ?
                                rectorias.map((rectoria) => <option key={rectoria} value={rectoria}>{rectoria}</option>)
                                :
                                ""
                        }
                    </select>
                </div>
                <div className="col-6">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm" value={sede} disabled={disabledSede} onChange={(e) => setSede(e.target.value)}>
                        <option value="">
                            {disabledSede ? 'Cargando Sedes...' : 'SELECIONE UNA SEDE'}
                        </option>
                        {
                            sedes.length != 0 ?
                                sedes.map((sede) => <option key={sede} value={sede}>{sede}</option>)
                                :
                                ""
                        }
                    </select>
                </div>
                <div className="col-6 mt-2">
                    <div className="input-group input-group-sm">
                        <span className="input-group-text" id="inputGroup-sizing-sm"><FcSearch /> </span>
                        <input type="text" className="form-control" placeholder="Buscar evento" aria-describedby="inputGroup-sizing-sm" onChange={(e) => filtrarEventos(e)} />
                    </div>
                </div>
                <div className="col-6 mt-2">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm" value={area} disabled={disabledArea} onChange={(e) => setArea(e.target.value)}>
                        <option value="">
                            {disabledArea ? 'Cargando Areas...' : 'Seleccione una Area'}
                        </option>
                        {
                            areas.length != 0 ?
                                areas.map(({ codigo, descripcion, id }) => <option key={codigo} value={id}>{descripcion}</option>)
                                :
                                ""
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filtros;