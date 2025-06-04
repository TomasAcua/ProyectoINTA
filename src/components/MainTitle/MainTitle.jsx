
const MainTitle = ({ title, emphasis }) => {
    return (
        <div className="p-8">
        <h1
          className="text-3xl text-slate-900 font-bold">
            {title}  
          <span className={'text-emerald-500'}>{emphasis}
          </span>
        </h1>
      </div>
    )
}

export default MainTitle;