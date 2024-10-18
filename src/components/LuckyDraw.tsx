import React, { useState, useEffect, useRef } from 'react';

interface Draw {
  id: number;
  title: string;
  date: string;
}

interface Winner {
  id: number;
  name: string;
  drawId: number;
}

const LuckyDraw: React.FC = () => {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [selectedDraw, setSelectedDraw] = useState<Draw | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch draws from API or local storage
    const mockDraws: Draw[] = [
      { id: 1, title: 'January Draw', date: '2024-01-31' },
      { id: 2, title: 'February Draw', date: '2024-02-29' },
    ];
    setDraws(mockDraws);
  }, []);

  const handleScheduleDraw = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const newDraw: Draw = { id: draws.length + 1, title, date };
    setDraws([...draws, newDraw]);
    form.reset();
  };

  const handleSelectDraw = (draw: Draw) => {
    setSelectedDraw(draw);
    // Fetch participants for the selected draw
    const mockParticipants = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis'];
    setParticipants(mockParticipants);
  };

  const spinWheel = () => {
    if (isSpinning || !wheelRef.current) return;
    setIsSpinning(true);
    const wheel = wheelRef.current;
    const rotation = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
    wheel.style.transition = 'transform 10s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${rotation}deg)`;
    
    setTimeout(() => {
      setIsSpinning(false);
      const winnerIndex = Math.floor((360 - (rotation % 360)) / (360 / participants.length));
      const winner = participants[winnerIndex];
      if (selectedDraw) {
        setWinners([...winners, { id: winners.length + 1, name: winner, drawId: selectedDraw.id }]);
      }
      // Remove winner from participants
      setParticipants(participants.filter(p => p !== winner));
    }, 10000);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Schedule Lucky Draw</h2>
        <form onSubmit={handleScheduleDraw} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Draw Title</label>
            <input type="text" id="title" name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Draw Date</label>
            <input type="date" id="date" name="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Schedule Draw
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Conduct Lucky Draw</h2>
        <div className="mb-4">
          <label htmlFor="draw-select" className="block text-sm font-medium text-gray-700">Select Draw</label>
          <select
            id="draw-select"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => handleSelectDraw(draws[parseInt(e.target.value)])}
          >
            <option value="">Select a draw</option>
            {draws.map((draw, index) => (
              <option key={draw.id} value={index}>{draw.title} - {draw.date}</option>
            ))}
          </select>
        </div>

        {selectedDraw && (
          <div className="text-center">
            <div
              ref={wheelRef}
              className="w-64 h-64 mx-auto mb-4 rounded-full border-4 border-gray-300 relative"
              style={{
                background: `conic-gradient(${participants.map((_, index) => 
                  `${index % 2 === 0 ? '#4299e1' : '#3182ce'} ${index * (360 / participants.length)}deg ${(index + 1) * (360 / participants.length)}deg`
                ).join(', ')})`,
              }}
            >
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center text-white font-bold text-xs"
                  style={{ transform: `rotate(${index * (360 / participants.length) + (180 / participants.length)}deg)` }}
                >
                  {participant}
                </div>
              ))}
              <div className="absolute top-0 left-1/2 w-0 h-0 -mt-4 -ml-2 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[16px] border-b-red-500"></div>
            </div>
            <button
              onClick={spinWheel}
              disabled={isSpinning || participants.length === 0}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
            </button>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Winners</h3>
          <ul className="list-disc list-inside">
            {winners.map((winner) => (
              <li key={winner.id}>{winner.name} - {draws.find(d => d.id === winner.drawId)?.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LuckyDraw;