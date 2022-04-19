
const tasks=[
    {
        roll:1,
        name:'xyz',
        address:'pune'
    },
    {
        roll:2,
        name:'abc',
        address:'mumbai'
    },
]
const Tasks = () => {
  return (
    <>
        {
            tasks.map((task)=>(
                <h3 key={task.roll}>
                    {task.name}
                </h3> 
            ))}
    </>
  )
}

export default Tasks