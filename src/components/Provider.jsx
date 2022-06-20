import { useNavigate, createSearchParams } from "react-router-dom";

const Provider = ({ provider }) => {
  const { display_priority, logo_path, provider_id, provider_name } = provider;
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate({ pathname: "/providers", search: createSearchParams({ id: id }).toString() })
  };


  return (
    <div onClick={() => handleClick(provider_id)} className="movie">
      <img src={`https://image.tmdb.org/t/p/w500/${logo_path}`} alt="Provider poster" />
      <div className="overlay">
        <div className="title">{provider_name}</div>
      </div>
    </div>
  )
};

export default Provider;