const SubsTableItem = ({email, mongoId, date, handleDelete}) => {

    const emailDate = new Date(date)

    return ( 
        <tr className="bg-white border-b text-left ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {email?email:"no email"}
            </th>
            <td className="px-6 py-4 hidden sm:block">{emailDate?emailDate.toDateString():"11 Jan 2024"}</td>
            <td onClick={()=>{handleDelete(mongoId)}} className="px-6 py-4 cursor-pointer">x</td>
        </tr>
     );
}
 
export default SubsTableItem;