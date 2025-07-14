// pages/components/dashboards/historial.tsx

import Pageheader from '@/shared/layout-components/page-header/pageheader';
import Seo from '@/shared/layout-components/seo/seo';
import React, { Fragment, useState, useEffect } from 'react';
import PredictionsTable from "@/pages/components/ui-elements/PredictionsTable";
import { Prediccion } from "@/pages/components/ui-elements/PredictionsTable";

const Historial = () => {
  const [predictions, setPredictions] = useState<Prediccion[]>([]);

  useEffect(() => {
    /*fetch("http://localhost:5020/api/merlin-recommender/chat")*/
    fetch("http://localhost:4000/api/list-predictions")
      .then((res) => res.json())
      .then((json) => setPredictions(json))
      .catch((err) => console.error("Error fetching predictions:", err));
  }, []);

  return (
    <Fragment>
      <Seo title={"Historial de Predicciones"} />
      <Pageheader currentpage="Historial" activepage="Dashboards" mainpage="Historial" />
      
      <div className="grid grid-cols-12 gap-x-6 mb-6">
        <div className="col-span-12">
          <PredictionsTable predicciones={predictions} />
        </div>
      </div>
    </Fragment>
  );
};

Historial.layout = "Contentlayout";
export default Historial;
