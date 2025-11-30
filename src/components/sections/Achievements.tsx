"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";

import achievementsData from "@/app/data/achievements.json";

const iconMap: { [key: string]: React.ReactNode } = {
  "Trophy": <Trophy className="w-8 h-8 text-yellow-500" />,
  "Award": <Award className="w-8 h-8 text-gray-300" />
};

const achievements = achievementsData.map(item => ({
  ...item,
  icon: iconMap[item.icon]
}));

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 border-t border-gray-900 min-h-[50vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-primary flex items-center">
          <span className="mr-2 text-secondary">03.</span> Achievements
        </h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-[#111] border ${item.color} p-6 rounded-lg relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {item.icon}
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 rounded-full shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
