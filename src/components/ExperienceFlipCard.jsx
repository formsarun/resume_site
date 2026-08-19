import React, { useState } from 'react';
import { Calendar, Layers, MapPin, RefreshCw, Briefcase } from 'lucide-react';

export default function ExperienceFlipCard({ experience }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective w-full h-[400px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT: COMPANY DETAIL */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white/95 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 shadow-xl backdrop-blur-sm">
          <div>
            <div className="flex items-start justify-between">
              <span className="inline-flex p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <Briefcase size={22} />
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700/50 flex items-center gap-1">
                <Calendar size={12} /> {experience.duration}
              </span>
            </div>

            <h3 className="text-xl font-bold mt-4 text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 group-hover:dark:text-indigo-300 transition-colors duration-300">
              {experience.company}
            </h3>
            <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mt-1">{experience.role}</p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <MapPin size={12} />
              <span>India</span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 line-clamp-3 leading-relaxed">
              {experience.summary}
            </p>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1">
                <Layers size={10} /> Core Stack
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-12 overflow-hidden">
                {experience.skills.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-indigo-600 dark:text-indigo-300 rounded border border-slate-200 dark:border-indigo-500/10"
                  >
                    {skill}
                  </span>
                ))}
                {experience.skills.length > 4 && (
                  <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                    +{experience.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/50 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
              <span>View Projects & Achievements</span>
              <span className="flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded-lg transition-colors">
                Flip <RefreshCw size={12} className="animate-spin-slow" />
              </span>
            </div>
          </div>
        </div>

        {/* BACK: PROJECT DETAIL */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 shadow-xl">
          <div className="overflow-y-auto pr-1 custom-scrollbar flex-grow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Project Detail
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                Click to flip back <RefreshCw size={10} />
              </span>
            </div>

            <h4 className="text-lg font-bold mt-2 text-slate-900 dark:text-slate-100">
              {experience.project || 'Project Accomplishments'}
            </h4>

            <ul className="mt-3 space-y-2">
              {experience.details.map((detail, index) => (
                <li key={index} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 mt-1 font-bold">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Project Tech Stack
            </p>
            <div className="flex flex-wrap gap-1">
              {experience.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-300 rounded border border-slate-200 dark:border-emerald-500/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
