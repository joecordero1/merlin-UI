import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props { model: 'bert' | 'dnn'; }
export const Predictions: React.FC<Props> = ({ model }) => {
  const [type, setType] = useState<'today' | 'week' | 'lastWeek' | 'currentMonth' | 'month'>('month');
  const [series, setSeries] = useState([{ name: 'Total', data: [] as number[] }]);
  const [categories, setCategories] = useState<string[]>([]);

  // 👉 Etiquetas legibles   clave => texto
  const LABELS: Record<string, string> = {
    today: 'Hoy',
    week: 'Semana Actual',
    lastWeek: 'Semana Pasada',
    currentMonth: 'Mes Actual',
    month: 'Mensual'
  };

  useEffect(() => {
    fetch(`http://localhost:4000/api/${model}/earning-chart?type=${type}`)
      .then((r) => r.json())
      .then(({ values, labels }) => {
        setSeries([{ name: 'Total', data: values }]);
        setCategories(labels);
      })
      .catch(console.error);
  }, [model, type]);

  const options: ApexOptions = {
    chart: { type: 'bar', height: 200 },
    grid: { borderColor: '#f2f6f7' },
    plotOptions: { bar: { columnWidth: '25%', distributed: true, borderRadius: 7 } },
    dataLabels: { enabled: false },
    legend: { show: false },
    yaxis: { labels: { formatter: (y) => `${y}` } },
    xaxis: { categories, labels: { rotate: -90 } }
  };

  return (
    <div className="box">
      <div className="box-header justify-between"><div className="box-title">Predicciones</div></div>
      <div className="box-body">
        <div className="flex gap-2 mb-2 justify-end">
          {['today','week','lastWeek','currentMonth','month'].map(t=>(
            <button
              key={t}
              onClick={()=>setType(t)}
              className={`px-2 py-1 text-xs rounded ${type===t?'bg-primary text-white':'bg-gray-200 dark:bg-white/10'}`}
            >
              { {today:'Hoy',week:'Semana',lastWeek:'Ant. Semana',
   currentMonth:'Mes Actual',month:'Meses'}[t] }

            </button>
          ))}
        </div>
        <ReactApexChart options={options} series={series} type="bar" height={200} />
      </div>
    </div>
  );
};
