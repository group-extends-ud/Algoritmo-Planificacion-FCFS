import { Props } from 'util/props';

const ProcessTable = (props: Props) => (
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Tiempo de llegada</th>
                <th>Rafaga</th>
                <th>Tiempo de comienzo</th>
                <th>Tiempo de finalización</th>
                <th>Tiempo de retorno</th>
                <th>Tiempo de espera</th>
                <th>Bloquear Proceso</th>
            </tr>
        </thead>
        <tbody>
            {props.children}
        </tbody>
    </table>
);