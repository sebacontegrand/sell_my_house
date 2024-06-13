"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SpinnerDotted } from "spinners-react";
interface Property {
  id: string;
  title: string;
  price: number;
  condition: string;
  permalink: string;
  location: {
    address_line: string;
  };
  thumbnail: string;
}
const MeliSearch = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const prelisting = await localStorage.getItem("prelistingId");
        if (!prelisting) {
          throw new Error("No prelisting ID found in localStorage.");
        }

        console.log("%c Line:33 🍑 prelisting", "color:#465975", prelisting);

        const query = await fetch(`/api/form/${prelisting}`);
        const meliData = await query.json();
        if (meliData.error === "Form not found") {
          return <div>Prelisting missed</div>;
        }
        console.log("%c Line:33 🍑 meliData", "color:#465975", { meliData });

        const meliQuery =
          "Antiguedad<10 años " +
          "USD " +
          meliData.valorventa +
          "precio " +
          "zona: " +
          meliData.comentarios;

        const response = await fetch(
          `https://api.mercadolibre.com/sites/MLA/search?category=MLA1459&q=${meliQuery}&lat=40.7128&lng=-74.0059&page=1&sort=price&facets=&filters=&limit=10`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Mercado Libre data.");
        }

        const json = await response.json();
        console.log("%c Line:100 🍌 json", "color:#465975", json);

        setData(json);
      } catch (error: any) {
        console.error(error);
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SpinnerDotted
        size={50}
        thickness={100}
        speed={100}
        color="rgba(172, 125, 57, 1)"
      />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Prelisting not found</div>;
  }

  return (
    <div>
      <h1>Properties for Sale in City Bell</h1>
      <ul>
        {data.results.map((property: Property) => (
          <li className="my-16 mx-32 rounded-md bg-slate-100" key={property.id}>
            <h2>{property.title}</h2>
            <p>Price: ${property.price}</p>
            <p>Condition: {property.condition}</p>
            <a
              href={property.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to Meli
            </a>
            <p>Ubicacion: {property.location.address_line}</p>
            <Image
              src={property.thumbnail}
              alt={property.title}
              width={200}
              height={200}
              layout="responsive"
            />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeliSearch;
