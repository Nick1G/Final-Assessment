import Provider from "./Provider";

const ProviderList = ({ name, providers }) => {
  return (
    <div className="titleList">
      <div className="title">
        <h1>{name}</h1>
        <div className="titles-wrapper">
          {providers.map(provider => {
            return <Provider key={provider.provider_id} provider={provider}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default ProviderList;