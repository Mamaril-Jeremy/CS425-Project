const users = [
    {
      userCity: 'Las Vegas',
      userEmailAddress: 'johndoe@gmail.com',
      userFirstName: 'John',
      userID: '09213084',
      userLastName: 'Doe',
      userMajor: 'Computer Science',
      userOccupation: 'Tutor',
      userPhoneNumber: '7023418274',
      userRole: 'mentor',
      userState: 'Nevada',
    },
    {
      userCity: 'New York',
      userEmailAddress: 'janedoe@gmail.com',
      userFirstName: 'Jane',
      userID: '09123456',
      userLastName: 'Doe',
      userMajor: 'Electrical Engineering',
      userOccupation: 'Software Engineer',
      userPhoneNumber: '2129876543',
      userRole: 'mentor',
      userState: 'New York',
    },
    {
      userCity: 'Los Angeles',
      userEmailAddress: 'bobsmith@gmail.com',
      userFirstName: 'Bob',
      userID: '08234567',
      userLastName: 'Smith',
      userMajor: 'Business Administration',
      userOccupation: 'Entrepreneur',
      userPhoneNumber: '3108765432',
      userRole: 'mentor',
      userState: 'California',
    },
    {
      userCity: 'Chicago',
      userEmailAddress: 'susanlee@gmail.com',
      userFirstName: 'Susan',
      userID: '07123456',
      userLastName: 'Lee',
      userMajor: 'Psychology',
      userOccupation: 'Counselor',
      userPhoneNumber: '3127654321',
      userRole: 'mentor',
      userState: 'Illinois',
    },
    {
      userCity: 'Houston',
      userEmailAddress: 'michaeljones@gmail.com',
      userFirstName: 'Michael',
      userID: '06234567',
      userLastName: 'Jones',
      userMajor: 'Mechanical Engineering',
      userOccupation: 'Engineer',
      userPhoneNumber: '7136543210',
      userRole: 'mentee',
      userState: 'Texas',
    },
    {
      userCity: 'Miami',
      userEmailAddress: 'emilywilson@gmail.com',
      userFirstName: 'Emily',
      userID: '05123456',
      userLastName: 'Wilson',
      userMajor: 'Art History',
      userOccupation: 'Student',
      userPhoneNumber: '3055432109',
      userRole: 'mentee',
      userState: 'Florida',
    },
    {
      userCity: 'San Francisco',
      userEmailAddress: 'davidbrown@gmail.com',
      userFirstName: 'David',
      userID: '04234567',
      userLastName: 'Brown',
      userMajor: 'Computer Engineering',
      userOccupation: 'Software Developer',
      userPhoneNumber: '4154321098',
      userRole: 'mentee',
      userState: 'California',
    },
    {
      userCity: 'Austin',
      userEmailAddress: 'sarahsmith@gmail.com',
      userFirstName: 'Sarah',
      userID: '03123456',
      userLastName: 'Smith',
      userMajor: 'Marketing',
      userOccupation: 'Marketing Specialist',
      userPhoneNumber: '5129876543',
      userRole: 'mentee',
      userState: 'Texas',
    },
    {
      userCity: 'Seattle',
      userEmailAddress: 'ryanwilson@gmail.com',
      userFirstName: 'Ryan',
      userID: '02234567',
      userLastName: 'Wilson',
      userMajor: 'Environmental Science',
      userOccupation: 'Environmental Scientist',
      userPhoneNumber: '2068765432',
      userRole: 'mentee',
      userState: 'Washington',
    },
    {
      userCity: 'Atlanta',
      userEmailAddress: 'lindajones@gmail.com',
      userFirstName: 'Linda',
      userID: '01123456',
      userLastName: 'Jones',
      userMajor: 'Finance',
      userOccupation: 'Financial Analyst',
      userPhoneNumber: '4047654321',
      userRole: 'mentee',
      userState: 'Georgia',
    },
    {
      userCity: 'Denver',
      userEmailAddress: 'alexgreen@gmail.com',
      userFirstName: 'Alex',
      userID: '10234567',
      userLastName: 'Green',
      userMajor: 'Environmental Science',
      userOccupation: 'Environmental Consultant',
      userPhoneNumber: '3037654321',
      userRole: 'mentee',
      userState: 'Colorado',
    },
    {
      userCity: 'Boston',
      userEmailAddress: 'amycarter@gmail.com',
      userFirstName: 'Amy',
      userID: '10123456',
      userLastName: 'Carter',
      userMajor: 'History',
      userOccupation: 'Historian',
      userPhoneNumber: '6179876543',
      userRole: 'mentee',
      userState: 'Massachusetts',
    },
    {
      userCity: 'Phoenix',
      userEmailAddress: 'ryanmiller@gmail.com',
      userFirstName: 'Ryan',
      userID: '09234567',
      userLastName: 'Miller',
      userMajor: 'Civil Engineering',
      userOccupation: 'Civil Engineer',
      userPhoneNumber: '6028765432',
      userRole: 'mentee',
      userState: 'Arizona',
    },
    {
      userCity: 'Portland',
      userEmailAddress: 'lisasmith@gmail.com',
      userFirstName: 'Lisa',
      userID: '09123456',
      userLastName: 'Smith',
      userMajor: 'Biology',
      userOccupation: 'Biologist',
      userPhoneNumber: '5039876543',
      userRole: 'mentee',
      userState: 'Oregon',
    },
    {
      userCity: 'Minneapolis',
      userEmailAddress: 'derekjones@gmail.com',
      userFirstName: 'Derek',
      userID: '08234567',
      userLastName: 'Jones',
      userMajor: 'Economics',
      userOccupation: 'Economist',
      userPhoneNumber: '6128765432',
      userRole: 'mentee',
      userState: 'Minnesota',
    },
    {
      userCity: 'Philadelphia',
      userEmailAddress: 'emmakim@gmail.com',
      userFirstName: 'Emma',
      userID: '07123456',
      userLastName: 'Kim',
      userMajor: 'Chemistry',
      userOccupation: 'Chemist',
      userPhoneNumber: '2157654321',
      userRole: 'mentee',
      userState: 'Pennsylvania',
    },
    {
      userCity: 'Orlando',
      userEmailAddress: 'chrisharris@gmail.com',
      userFirstName: 'Chris',
      userID: '06234567',
      userLastName: 'Harris',
      userMajor: 'Graphic Design',
      userOccupation: 'Graphic Designer',
      userPhoneNumber: '4076543210',
      userRole: 'mentee',
      userState: 'Florida',
    },
    {
      userCity: 'Dallas',
      userEmailAddress: 'monicawilson@gmail.com',
      userFirstName: 'Monica',
      userID: '05123456',
      userLastName: 'Wilson',
      userMajor: 'Political Science',
      userOccupation: 'Political Analyst',
      userPhoneNumber: '2145432109',
      userRole: 'mentee',
      userState: 'Texas',
    },
    {
      userCity: 'Raleigh',
      userEmailAddress: 'kevinmartin@gmail.com',
      userFirstName: 'Kevin',
      userID: '04234567',
      userLastName: 'Martin',
      userMajor: 'Computer Science',
      userOccupation: 'Software Engineer',
      userPhoneNumber: '9194321098',
      userRole: 'mentee',
      userState: 'North Carolina',
    },
    {
      userCity: 'Detroit',
      userEmailAddress: 'nataliebrown@gmail.com',
      userFirstName: 'Natalie',
      userID: '03123456',
      userLastName: 'Brown',
      userMajor: 'Mechanical Engineering',
      userOccupation: 'Mechanical Engineer',
      userPhoneNumber: '3139876543',
      userRole: 'mentee',
      userState: 'Michigan',
    },
      {
      userCity: 'Chicago',
      userEmailAddress: 'chriswilson@gmail.com',
      userFirstName: 'Chris',
      userID: '11223344',
      userLastName: 'Wilson',
      userMajor: 'Marketing',
      userOccupation: 'Marketing Manager',
      userPhoneNumber: '3129876543',
      userRole: 'mentor',
      userState: 'Illinois',
    },
    {
      userCity: 'Atlanta',
      userEmailAddress: 'sandrabrown@gmail.com',
      userFirstName: 'Sandra',
      userID: '22334455',
      userLastName: 'Brown',
      userMajor: 'Finance',
      userOccupation: 'Financial Advisor',
      userPhoneNumber: '4041234567',
      userRole: 'mentor',
      userState: 'Georgia',
    },
    {
      userCity: 'Seattle',
      userEmailAddress: 'matthewjones@gmail.com',
      userFirstName: 'Matthew',
      userID: '33445566',
      userLastName: 'Jones',
      userMajor: 'Computer Engineering',
      userOccupation: 'Software Architect',
      userPhoneNumber: '2062345678',
      userRole: 'mentor',
      userState: 'Washington',
    },
    {
      userCity: 'Dallas',
      userEmailAddress: 'laurasmith@gmail.com',
      userFirstName: 'Laura',
      userID: '44556677',
      userLastName: 'Smith',
      userMajor: 'Psychology',
      userOccupation: 'Psychologist',
      userPhoneNumber: '2143456789',
      userRole: 'mentor',
      userState: 'Texas',
    },
    {
      userCity: 'Denver',
      userEmailAddress: 'markwilson@gmail.com',
      userFirstName: 'Mark',
      userID: '55667788',
      userLastName: 'Wilson',
      userMajor: 'Civil Engineering',
      userOccupation: 'Civil Engineer',
      userPhoneNumber: '3034567890',
      userRole: 'mentor',
      userState: 'Colorado',
    },
    {
      userCity: 'New York',
      userEmailAddress: 'carolmiller@gmail.com',
      userFirstName: 'Carol',
      userID: '66778899',
      userLastName: 'Miller',
      userMajor: 'Art History',
      userOccupation: 'Art Curator',
      userPhoneNumber: '2125678901',
      userRole: 'mentor',
      userState: 'New York',
    },
    {
      userCity: 'San Francisco',
      userEmailAddress: 'danieljohnson@gmail.com',
      userFirstName: 'Daniel',
      userID: '77889900',
      userLastName: 'Johnson',
      userMajor: 'Computer Science',
      userOccupation: 'Data Scientist',
      userPhoneNumber: '4156789012',
      userRole: 'mentor',
      userState: 'California',
    },
    {
      userCity: 'Miami',
      userEmailAddress: 'angelabrown@gmail.com',
      userFirstName: 'Angela',
      userID: '88990011',
      userLastName: 'Brown',
      userMajor: 'Business Administration',
      userOccupation: 'Business Consultant',
      userPhoneNumber: '3057890123',
      userRole: 'mentor',
      userState: 'Florida',
    },
    {
      userCity: 'Houston',
      userEmailAddress: 'kevinthomas@gmail.com',
      userFirstName: 'Kevin',
      userID: '99001122',
      userLastName: 'Thomas',
      userMajor: 'Mechanical Engineering',
      userOccupation: 'Mechanical Engineer',
      userPhoneNumber: '7138901234',
      userRole: 'mentor',
      userState: 'Texas',
    },
    {
      userCity: 'Phoenix',
      userEmailAddress: 'melissamartin@gmail.com',
      userFirstName: 'Melissa',
      userID: '00112233',
      userLastName: 'Martin',
      userMajor: 'Political Science',
      userOccupation: 'Political Analyst',
      userPhoneNumber: '6029012345',
      userRole: 'mentor',
      userState: 'Arizona',
    },
  ];
  
  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
  
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + (str1[i - 1] !== str2[j - 1] ? 1 : 0),
            dp[i][j - 1] + 1,
            dp[i - 1][j] + 1
          );
        }
      }
    }
  
    return dp[m][n];
  }
  
  function calculateSimilarityScore(mentee, mentor) {
    const weights = {
      userCity: 1,
      userMajor: 2,
      userOccupation: 3,
      userState: 1,
    };
  
    let similarityScore = 0;
    for (const attribute in weights) {
      const distance = levenshteinDistance(String(mentee[attribute]), String(mentor[attribute]));
      const similarity = 1 - distance / Math.max(mentee[attribute].length, mentor[attribute].length);
      similarityScore += weights[attribute] * similarity;
    }
  
    return similarityScore;
  }
  
  function findBestMatchForMentee(mentee) {
    const potentialMentors = users.filter(user => user.userRole === 'mentor');
  
    const mentorScores = potentialMentors.map(mentor => ({
      mentor,
      score: calculateSimilarityScore(mentee, mentor),
    }));
  
    mentorScores.sort((a, b) => b.score - a.score);
  
    if (mentorScores.length > 0) {
      const bestMatch = mentorScores[0].mentor;
      return bestMatch;
    } else {
      return null;
    }
  }
  
  users
    .filter(user => user.userRole === 'mentee')
    .forEach(mentee => {
      const bestMatchedMentor = findBestMatchForMentee(mentee);
  
      if (bestMatchedMentor) {
        console.log(`Best matched mentor for ${mentee.userFirstName} ${mentee.userLastName}: ${bestMatchedMentor.userFirstName} ${bestMatchedMentor.userLastName}`);
        console.log('Similarity Score:', calculateSimilarityScore(mentee, bestMatchedMentor));
      } else {
        console.log(`No matching mentor found for ${mentee.userFirstName} ${mentee.userLastName}`);
      }
    });