import React from 'react'
import Task from './Task'
import firebase from '../config/firebase'
import { useSelector } from 'react-redux'

const Synthesis = ({record}:any) => {
  const user = useSelector((state:any)=>state.user.currentUser)
  let time = 0;
  if (record) {
    record.map((el: any) => {
      time+=el.hour*60+el.min
      return time
    });
  }

  console.log(record)
  const deleteRecord = (id: string) => {
    const newRecord = record.filter((el:any)=>el.id!==id)
    firebase.firestore().collection('records').doc(user.uid).update({
      record: newRecord
    })
  }
  
  return (
    <div>
      synthesis
      {`${Math.floor(time/60)}時間${time%60}分`}
      {record&&record.map((el:any,i:number)=>{
        return <Task el={el} key={i.toString()} deleteRecord={deleteRecord}/>
      })}
    </div>
  )
}

export default Synthesis
