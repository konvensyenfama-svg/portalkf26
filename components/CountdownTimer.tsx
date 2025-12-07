
import React, { useState, useEffect } from "react";

export const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Initial call
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
        {[
            { label: "HARI", value: timeLeft.days },
            { label: "JAM", value: timeLeft.hours },
            { label: "MINIT", value: timeLeft.minutes },
            { label: "SAAT", value: timeLeft.seconds }, 
        ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 md:w-32 md:h-32 bg-white/5 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center border border-white/10 shadow-2xl">
                    <span className="text-3xl md:text-6xl font-bold text-white font-mono">{String(item.value).padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white mt-3 font-semibold">{item.label}</span>
            </div>
        ))}
    </div>
  );
};
