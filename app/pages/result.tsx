import { useEffect, useState } from "react";

export default function Result({ params }) {
  const { makeId, year } = params;
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro find the models");
        }
        return response.json();
      })
      .then((data) => {
        setModels(data.Results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [makeId, year]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Models for {year}</h1>
      {models.length > 0 ? (
        <ul>
          {models.map((model) => (
            <li key={model.Model_ID}>{model.Model_Name}</li>
          ))}
        </ul>
      ) : (
        <p>No models found .</p>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { makeId: "441", year: "2023" } },
    { params: { makeId: "442", year: "2023" } },
  ];

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  return { props: { params } };
}
