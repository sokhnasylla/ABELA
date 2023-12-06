import React from 'react'
import { Table } from 'react-bootstrap'
import "./mytab.css"
import { taches } from '../../../data/tacheself'

function MyTable() {
  return (
    <Table class="table table-bordered table-striped" id="mytable">
				<thead>
					<tr>
						<th>#</th>
						<th>Libelle Tache Applicatif</th>
						<th>Descriptif de la Tache</th>
						<th>Application</th>
						<th>Date de Création</th>
					</tr>
				</thead>
				<tbody>
                   {taches.map((row)=>
                  <tr>
                     <td>{row.id}</td>
                     <td>{row.libelle}</td>
                     <td>{row.desc}</td>
                     <td>{row.app}</td>
                     <td>{row.date}</td>
                  </tr>

                
                   )}
				</tbody>
			
    </Table>
  )
}

export default MyTable