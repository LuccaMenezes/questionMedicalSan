import React, { useState, useEffect } from 'react';
import { EventApi } from "@fullcalendar/core"; // Tipagem para eventos

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventApi[]>([]);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) {
      return "Data não definida"; // Retorna uma mensagem padrão se a data for null
    }
  
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };
  

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Próximos Agendamentos</h3>
      {events.length > 0 ? (
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm text-gray-600">
                {formatDate(event.start)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhum agendamento futuro.</p>
      )}
    </div>
  );
};

export default UpcomingEvents;
