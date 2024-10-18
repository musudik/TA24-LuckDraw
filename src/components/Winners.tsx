import React, { useState, useEffect } from 'react';

interface Winner {
  id: number;
  name: string;
  drawTitle: string;
  drawDate: string;
}

const Winners: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>([]);

  useEffect(() => {
    // Fetch winners from API or local storage
    const mockWinners: Winner[] = [
      { id: 1, name: 'John Doe', drawTitle: 'January Draw', drawDate: '2024-01-31' },
      { id: 2, name: 'Jane Smith', drawTitle: 'February Draw', drawDate: '2024-02-29' },
    ];
    setWinners(mockWinners);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold p-6 bg-gray-50">Lucky Draw Winners</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {winners.map((winner) => (
              <tr key={winner.id}>
                <td className="px-6 py-4 whitespace-nowrap">{winner.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{winner.drawTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{winner.drawDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Winners;