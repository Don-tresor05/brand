import { motion } from 'motion/react';

export default function TechStack() {
  const techCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'React Native', level: 88 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Figma', level: 86 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Java / Spring Boot', level: 88 },
        { name: 'Django REST Framework', level: 90 },
        { name: 'Node.js', level: 86 },
        { name: 'C#', level: 78 },
        { name: 'RESTful APIs', level: 90 },
      ],
    },
    {
      category: 'Data & Security',
      skills: [
        { name: 'MySQL / SQL Server', level: 88 },
        { name: 'MongoDB', level: 82 },
        { name: 'PL/SQL', level: 80 },
        { name: 'Linux Administration', level: 84 },
        { name: 'VAPT', level: 78 },
      ],
    },
  ];

  const badges = [
    'Java', 'JavaScript', 'TypeScript', 'Python', 'C#', 'C', 'React',
    'React Native', 'Spring Boot', 'Django REST Framework', 'Node.js',
    'RESTful APIs', 'MySQL', 'MongoDB', 'SQL Server', 'PL/SQL', 'HTML5',
    'CSS3', 'Tailwind CSS', 'Figma', 'Adobe Photoshop', 'Linux',
    'Git & GitHub', 'VAPT', 'Penetration Testing', 'Server Security',
  ];

  return (
    <div className="space-y-16">
      {/* Skill Bars */}
      <div className="grid md:grid-cols-3 gap-12">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3
              className="text-2xl mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}
            >
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{skill.name}</span>
                    <span
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge Wall */}
      <div>
        <h3
          className="text-2xl mb-8 text-center"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}
        >
          Technologies & Tools
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((badge, index) => (
            <motion.div
              key={badge}
              className="px-4 py-2 bg-card border border-border rounded-full text-sm cursor-pointer"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
              whileHover={{
                scale: 1.1,
                borderColor: 'var(--accent)',
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)',
              }}
            >
              {badge}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
