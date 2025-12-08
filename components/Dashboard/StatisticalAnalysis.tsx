'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Icons } from '../Icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface AnalysisStats {
  typology: Record<string, number>;
  topKeywords: [string, number][];
  topPeople: [string, number][];
  topLocations: [string, number][];
  languages: Record<string, number>;
  documentCount: number;
}

interface StatisticalAnalysisProps {
  documentIds: string[];
  onClose: () => void;
  isOpen: boolean;
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      font: {
        size: 16,
      }
    },
  },
};

const barChartOptions = (titleText: string) => ({
    ...chartOptions,
    plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, display: true, text: titleText }},
    scales: {
        x: { ticks: { font: { size: 10 }}},
        y: { beginAtZero: true }
    },
    indexAxis: 'y' as const,
});


export function StatisticalAnalysis({ documentIds, onClose, isOpen }: StatisticalAnalysisProps) {
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || documentIds.length === 0) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/ai/statistics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ documentIds }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Error al cargar estadísticas');
        }

        const data = await response.json();
        setStats(data.statistics);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [documentIds, isOpen]);

  if (!isOpen) return null;

  const generateChartData = (labels: string[], data: number[], label: string) => ({
    labels,
    datasets: [{
      label,
      data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)', 'rgba(83, 102, 255, 0.6)',
      ],
      borderColor: '#fff',
      borderWidth: 1,
    }]
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Análisis Estadístico ({stats?.documentCount} Documentos)</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <Icons.close className="w-6 h-6" />
          </button>
        </div>

        {loading && <div className="flex-grow flex justify-center items-center"><Icons.spinner className="w-12 h-12 animate-spin" /></div>}
        {error && <div className="flex-grow flex justify-center items-center text-red-500 bg-red-100 p-4 rounded-md">{error}</div>}

        {stats && !loading && !error && (
          <div className="flex-grow overflow-y-auto pr-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg h-80">
                <Doughnut
                  options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, display: true, text: 'Distribución por Tipología' }}}}
                  data={generateChartData(Object.keys(stats.typology), Object.values(stats.typology), 'Tipologías')}
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg h-80">
                <Doughnut
                  options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, display: true, text: 'Distribución por Idioma' }}}}
                  data={generateChartData(Object.keys(stats.languages), Object.values(stats.languages), 'Idiomas')}
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg h-96 col-span-1 lg:col-span-2">
                 <Bar options={barChartOptions('Top 15 Palabras Clave')} data={generateChartData(stats.topKeywords.map(k => k[0]), stats.topKeywords.map(k => k[1]), 'Frecuencia')} />
              </div>
               <div className="bg-gray-50 p-4 rounded-lg h-96">
                 <Bar options={barChartOptions('Top 10 Personas')} data={generateChartData(stats.topPeople.map(p => p[0]), stats.topPeople.map(p => p[1]), 'Menciones')} />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg h-96">
                 <Bar options={barChartOptions('Top 10 Lugares')} data={generateChartData(stats.topLocations.map(l => l[0]), stats.topLocations.map(l => l[1]), 'Menciones')} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
