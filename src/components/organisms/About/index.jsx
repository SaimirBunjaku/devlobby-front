import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const About = () => {
  const teamMembers = [
    { id: 1, name: 'Leonat Krasniqi', username:'leonat_krasniqi', position: 'Lead Team', gender: 'male' },
    { id: 2, name: 'Abedin Telaku', username:'abedin_telaku', position: 'Web Developer', gender: 'male' },
    { id: 3, name: 'Agnit Misini', username:'agnit_misini', position: 'Web Developer', gender: 'male' },
    { id: 4, name: 'Edber Vuçitërna', username:'edber_vuçitërna', position: 'Web Developer', gender: 'male' },
    { id: 5, name: 'Lisa Ramizi', username:'lisa_ramizi', position: 'Web Developer', gender: 'female' },
    { id: 6, name: 'Leon Miftari', username:'leon_miftari', position: 'Web Developer', gender: 'male' },
    { id: 7, name: 'Nol Ahmedi', username:'nol_ahmedi', position: 'Web Developer', gender: 'male' },
    { id: 8, name: 'Orges Isufi', username:'orges_isufi', position: 'Web Developer', gender: 'male' },
    { id: 9, name: 'Saimir Bunjaku', username:'saimir_bunjaku', position: 'Web Developer', gender: 'male' },
    { id: 10, name: 'Shpat Spahiu', username:'shpat_spahiu', position: 'Web Developer', gender: 'male' },
  ];

  return (
    <div className="about">
      <div className="company-info">
        <h2>About Us</h2>
        <p>Founded with the vision of fostering a community where developers, creators, and dreamers can converge, Dev Lobby is more than just a platform; it's a sanctuary designed to nurture your professional aspirations while catering to your personal quest for fun and relaxation. Here, we celebrate the spirit of innovation and the joy of escapism in equal measure.</p>
      </div>
      <h1>Meet the Team</h1>
      <div className="team-members">
        <div className="team-leader">
          {teamMembers.map(member => (
            member.position === 'Lead Team' && (
              <TeamMemberCard key={member.id} member={member} />
            )
          ))}
        </div>
        <div className="team-members-others">
          {teamMembers.map(member => (
            member.position !== 'Lead Team' && (
              <TeamMemberCard key={member.id} member={member} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
