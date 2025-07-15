//pages/components/dashboards/modelo.tsx

import Pageheader from "@/shared/layout-components/page-header/pageheader";
import Seo from "@/shared/layout-components/seo/seo";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { Predictions } from "@/pages/components/ui-elements/predictions";
import { TopSuggestedProducts } from "@/pages/components/ui-elements/TopSuggestedProducts";
import { TopAcceptedProducts } from "@/pages/components/ui-elements/TopAcceptedProducts";
import InfoCard from "@/pages/components/ui-elements/InfoCard";

const API = "http://localhost:4000/api";
/* ---------------- reutilizable ---------------- */
const fetchJSON = async (endpoint: string, model: "bert" | "dnn") => {
	const res = await fetch(`${API}/${model}/${endpoint}`);
	if (!res.ok) throw new Error(endpoint);
	return res.json();
};

const Modelo = () => {
	const [model, setModel] = useState<"bert" | "dnn">("bert");
	const [predictions, setPredictions] = useState<any>(null);
	const [precision, setPrecision] = useState<any>(null);
	const [lastUpdated, setLastUpdated] = useState<any>(null);
	const [totals, setTotals] = useState<any>(null);
	const [ctr, setCTR] = useState<any>(null);

	const userdata: any = [];
    
	/* ---------------- carga al cambiar modelo ----- */
	useEffect(() => {
		Promise.all([
			fetchJSON("predictions", model).then(setPredictions),
			fetchJSON("total-predictions", model).then(setTotals),
			fetchJSON("CTR", model).then(setCTR),
			fetchJSON("presition", model).then(setPrecision),
			fetchJSON("last-updated", model).then(setLastUpdated)
		]).catch(console.error);
	}, [model]);

	/* ---------------- helper UI ------------------- */
	const TabBtn = ({ label, value }: { label: string; value: "bert" | "dnn" }) => (
		<button
			onClick={() => setModel(value)}
			className={`hs-tab-active:bg-primary hs-tab-active:text-white py-3 px-4 inline-flex items-center gap-2 text-sm rounded-sm ${
				model === value ? "bg-primary text-white" : "bg-transparent text-defaulttextcolor hover:text-primary"
			}`}
		>
			{label}
		</button>
	);

	return (
		<Fragment>
			<Seo title={"Modelo"} />
			<Pageheader currentpage="Modelo" activepage="Dashboards" mainpage="Modelo" />
			<div className="box">
				<div className="box-body">
					<nav className="flex space-x-2 rtl:space-x-reverse" aria-label="Tabs">
						<TabBtn label="Modelo BERT" value="bert" />
						<TabBtn label="Modelo DNN" value="dnn" />
					</nav>
					<div className="mt-3">
						<div id="pills-with-brand-color-1" role="tabpanel" aria-labelledby="pills-with-brand-color-item-1">
							<div className="grid grid-cols-12 gap-x-6 mb-6">
								{totals && (
									<InfoCard
										icon={
                                        
											<svg xmlns="http://www.w3.org/2000/svg" className="svg-white primary" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" /><path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z" /></g></svg>
										}
										title="Total de predicciones generadas"
										value={totals.total.toLocaleString()}
										badge={`${totals.increase}%`}
										colorClass="primary"
									/>
								)}

								{ctr && (
									<InfoCard
										icon={
                                        
											<svg xmlns="http://www.w3.org/2000/svg" className="svg-white secondary" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0,0h24v24H0V0z" fill="none" /><g><path d="M19.5,3.5L18,2l-1.5,1.5L15,2l-1.5,1.5L12,2l-1.5,1.5L9,2L7.5,3.5L6,2v14H3v3c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V2 L19.5,3.5z M15,20H6c-0.55,0-1-0.45-1-1v-1h10V20z M19,19c0,0.55-0.45,1-1,1s-1-0.45-1-1v-3H8V5h11V19z" /><rect height="2" width="6" x="9" y="7" /><rect height="2" width="2" x="16" y="7" /><rect height="2" width="6" x="9" y="10" /><rect height="2" width="2" x="16" y="10" /></g></svg>
										}
										title="CTR promedio"
										value={ctr.percent.toLocaleString()}
										badge={`${ctr.increasedPercent}%`}
										colorClass="primary"
									/>
								)}
								{precision && (

									<InfoCard
										icon={
											<svg xmlns="http://www.w3.org/2000/svg" className="svg-white success" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
										}
										title="Precisión del modelo"
										value={`${precision.percent}%`}
										badge={`${ctr.increasedPercent}%`}
										colorClass="success"
									/>
								)}

								{lastUpdated && (

									<InfoCard
										icon={
											<svg xmlns="http://www.w3.org/2000/svg" className="svg-white warning" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
										}
										title="Última actualización del modelo"
										value={new Date(lastUpdated.date).toLocaleString("es-EC", {
											dateStyle: "long",
											timeStyle: "short",
											hour12: true
										})}
										colorClass="warning"
										hiddenInfo={true}
									/>
								)}
							</div>

							<div className="grid grid-cols-12 gap-x-6">

								{predictions && (

									<div className="xl:col-span-6 col-span-12">
										{/*<div className="xl:col-start-7 xl:col-span-6 col-span-12"> */}
										<div className="box">
											<div className="box-header justify-between">
												<div className="box-title">Prediciones del modelo</div>
											</div>
											<div className="box-body">

												<div id="predictions">
													<Predictions model={model} />
												</div>
											</div>
										</div>
									</div>
								)}
								<div className="xl:col-start-7 xl:col-span-6 col-span-12">
									<TopSuggestedProducts model={model}/>
								</div>
								<div className="xl:col-start-7 xl:col-span-6 col-span-12">
									<TopAcceptedProducts model={model}/>
								</div>
							</div>
						</div>
                        
					</div>
				</div>
			</div>

		</Fragment>
	);
};
Modelo.layout = "Contentlayout";

export default Modelo;
