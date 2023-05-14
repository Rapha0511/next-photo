import React from 'react'

export default function ProgressComponent({progress}) {
  return (
    <div className='ProgressComponent' style={{width:'200px',height:'120px', background:'#fff',position:"fixed", bottom:"0",left:"0",display:"flex",justifyContent:"center",alignItems:'center',boxShadow:"0px 5px 10px 0px rgba(0, 0, 0, 0.5)",borderRadius:"3px"}}>
        <p>Uploading : {progress} %</p>
    </div>
  )
}