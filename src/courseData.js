const coursesData = [
  {
    "id": "cs111",
    "header": "CS 111",
    "title": "Intro to Computer Science",
    "description": "Teaches how to design, develop, reason about, and test programs. Topics include data types, control structures, functions, objects, basic algorithms, and problem-solving strategies.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": true,
    "instructors": ["Reynolds", "Wilkerson"]
  },
  {
    "id": "cs180",
    "header": "CS 180",
    "title": "Intro to Data Science",
    "description": "Statistics; linear algebra; machine learning; data cleaning and visualization.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": false,
    "instructors": ["Stevens"]
  },
  {
    "id": "cs202",
    "header": "CS 202",
    "title": "Software Engineering Lab 1",
    "description": "The first of three experiential learning labs that will provide students with hands-on experience.",
    "credits": 1,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": false,
    "instructors": ["Bean"]
  },
  {
    "id": "cs203",
    "header": "CS 203",
    "title": "Software Engineering Lab 2",
    "description": "The second of three experiential learning labs that will provide students with hands-on experience.",
    "credits": 1,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": false,
    "instructors": ["Jensen"]
  },
  {
    "id": "cs204",
    "header": "CS 204",
    "title": "Software Engineering Lab 3",
    "description": "The third of three experiential learning labs that will provide students with hands-on experience.",
    "credits": 1,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": false,
    "instructors": ["Reynolds", "Stevens"]
  },
  {
    "id": "cs224",
    "header": "CS 224",
    "title": "Computer Systems",
    "description": "How a computer works to execute sequential code: low level data representation and instruction processing.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": true,
    "instructors": ["Wilkerson", "Bean"]
  },
  {
    "id": "cs235",
    "header": "CS 235",
    "title": "Data Structures",
    "description": "Fundamental data structures and algorithms; basic algorithm analysis.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": true,
    "instructors": ["Jensen", "Reynolds"]
  },
  {
    "id": "cs236",
    "header": "CS 236",
    "title": "Discrete Structure",
    "description": "Introduction to grammars and parsing; predicate and propositional logic; proof techniques.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": true,
    "instructors": ["Stevens", "Bean"]
  },
  {
    "id": "cs312",
    "header": "CS 312",
    "title": "Algorithm Design & Analysis",
    "description": "Advanced algorithm analysis, design techniques, graph algorithms, probabilistic algorithms, and parallel computing.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": true,
    "instructors": ["Wilkerson"]
  },
  {
    "id": "cs324",
    "header": "CS 324",
    "title": "Systems Programming",
    "description": "Operating systems, concurrent programming, process management, memory management, file systems, and networking.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": true,
    "instructors": ["Jensen", "Stevens"]
  },
  {
    "id": "cs340",
    "header": "CS 340",
    "title": "Software Design & Testing",
    "description": "Software development methodologies, object-oriented design patterns, testing strategies, and software maintenance.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": true,
    "instructors": ["Reynolds", "Bean"]
  },
  {
    "id": "cs330",
    "header": "CS 330",
    "title": "Programming Languages",
    "description": "Programming language paradigms, syntax and semantics, type systems, functional programming, and language implementation techniques.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Wilkerson"]
  },
  {
    "id": "cs345",
    "header": "CS 345",
    "title": "Operating Systems Design",
    "description": "Process management, memory allocation, file systems, device management, and distributed systems concepts.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Bean", "Stevens"]
  },
  {
    "id": "cs355",
    "header": "CS 355",
    "title": "Interactive Graphics",
    "description": "2D graphics programming, user interface design, event handling, and interactive applications development.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Reynolds"]
  },
  {
    "id": "cs450",
    "header": "CS 450",
    "title": "Computer Graphics",
    "description": "3D graphics, rendering, geometric modeling, animation, visualization techniques, and graphics programming.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen", "Bean"]
  },
  {
    "id": "cs465",
    "header": "CS 465",
    "title": "Computer Security",
    "description": "Cryptography, network security, authentication, access control, and software security principles.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Stevens", "Wilkerson", "Fulda"]
  },
  {
    "id": "cs470",
    "header": "CS 470",
    "title": "Artificial Intelligence",
    "description": "Machine learning, neural networks, natural language processing, and expert systems development.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Bean"]
  },
  {
    "id": "cs260",
    "header": "CS 260",
    "title": "Web Programming",
    "description": "HTML, CSS, JavaScript, and server-side programming for web applications.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen", "Reynolds"]
  },
  {
    "id": "cs356",
    "header": "CS 356",
    "title": "Mobile Application Development",
    "description": "Design and development of mobile applications for iOS and Android platforms.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Wilkerson", "Stevens"]
  },
  {
    "id": "cs401",
    "header": "CS 401",
    "title": "Ethics in Computer Science",
    "description": "Ethical issues in computing, privacy, intellectual property, and professional responsibility.",
    "credits": 2,
    "semesters": ["F", "W"],
    "isCore": true,
    "instructors": ["Bean", "Jensen"]
  },
  {
    "id": "cs452",
    "header": "CS 452",
    "title": "Database Systems",
    "description": "Relational database design, SQL, database management systems, and data warehousing.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Stevens", "Reynolds"]
  },
  {
    "id": "cs460",
    "header": "CS 460",
    "title": "Computer Networks",
    "description": "Network protocols, architecture, security, and distributed systems.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Wilkerson", "Bean"]
  },
  {
    "id": "cs472",
    "header": "CS 472",
    "title": "Machine Learning",
    "description": "Supervised and unsupervised learning algorithms, neural networks, and deep learning.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen"]
  },
  {
    "id": "cs480",
    "header": "CS 480",
    "title": "Software Engineering",
    "description": "Large-scale software development, project management, and software architecture.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Stevens", "Reynolds"]
  },
  {
    "id": "cs486_1",
    "header": "CS 486",
    "title": "Verification and Validation",
    "description": "Software testing techniques, test-driven development, and formal verification methods.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Bean", "Wilkerson"]
  },
  {
    "id": "cs490r",
    "header": "CS 490R",
    "title": "Special Topics in Computer Science",
    "description": "Advanced topics in computer science, varying by semester.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen", "Stevens"]
  },
  {
    "id": "cs494",
    "header": "CS 494",
    "title": "Capstone I",
    "description": "First part of the senior project course, focusing on project planning and design.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": true,
    "instructors": ["Reynolds", "Bean"]
  },
  {
    "id": "cs495",
    "header": "CS 495",
    "title": "Capstone II",
    "description": "Second part of the senior project course, focusing on implementation and presentation.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": true,
    "instructors": ["Wilkerson", "Jensen"]
  },
  {
    "id": "cs240",
    "header": "CS 240",
    "title": "Advanced Programming Concepts",
    "description": "Object-oriented programming, design patterns, and advanced language features.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Stevens", "Bean"]
  },
  {
    "id": "cs252",
    "header": "CS 252",
    "title": "Introduction to Computational Theory",
    "description": "Formal languages, automata theory, and computability.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Reynolds"]
  },
  {
    "id": "cs301",
    "header": "CS 301",
    "title": "Algorithms and Complexity",
    "description": "Advanced algorithm design, complexity analysis, and NP-completeness.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen", "Wilkerson"]
  },
  {
    "id": "cs360",
    "header": "CS 360",
    "title": "Internet Programming",
    "description": "Client-server architecture, RESTful APIs, and full-stack web development.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Bean", "Stevens"]
  },
  {
    "id": "cs405",
    "header": "CS 405",
    "title": "Creating and Managing a Software Business",
    "description": "Entrepreneurship in software, business models, and startup strategies.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Wilkerson", "Reynolds", "Fulda"]
  },
  {
    "id": "cs412",
    "header": "CS 412",
    "title": "Distributed Systems",
    "description": "Principles and paradigms of distributed computing systems.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen"]
  },
  {
    "id": "cs428",
    "header": "CS 428",
    "title": "Software Engineering",
    "description": "Software development processes, requirements engineering, and project management.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Bean", "Reynolds"]
  },
  {
    "id": "cs431",
    "header": "CS 431",
    "title": "Artificial Intelligence",
    "description": "Knowledge representation, reasoning, and machine learning techniques.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Stevens", "Wilkerson"]
  },
  {
    "id": "cs455",
    "header": "CS 455",
    "title": "Computer Graphics",
    "description": "3D modeling, rendering, and animation techniques.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen", "Bean"]
  },
  {
    "id": "cs462",
    "header": "CS 462",
    "title": "Large-scale Distributed Systems",
    "description": "Design and implementation of scalable distributed systems and cloud computing.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Reynolds", "Stevens"]
  },
  {
    "id": "cs474",
    "header": "CS 474",
    "title": "Deep Learning",
    "description": "Neural network architectures, training techniques, and applications in various domains.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Wilkerson", "Bean"]
  },
  {
    "id": "cs478",
    "header": "CS 478",
    "title": "Introduction to Data Mining",
    "description": "Data preprocessing, association rules, clustering, and classification techniques.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen"]
  },
  {
    "id": "cs484",
    "header": "CS 484",
    "title": "Parallel Processing",
    "description": "Parallel algorithms, architectures, and programming models.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Stevens", "Reynolds"]
  },
  {
    "id": "cs486_2",
    "header": "CS 486",
    "title": "Verification and Validation",
    "description": "Software testing techniques, test-driven development, and formal verification methods.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Bean", "Wilkerson"]
  },
  {
    "id": "cs493r",
    "header": "CS 493R",
    "title": "Computing for Good",
    "description": "Applying computer science skills to solve real-world problems in non-profit and humanitarian contexts.",
    "credits": 3,
    "semesters": ["F", "W"],
    "isCore": false,
    "instructors": ["Jensen", "Stevens"]
  },
  {
    "id": "cs497r",
    "header": "CS 497R",
    "title": "Undergraduate Research",
    "description": "Directed research in computer science under faculty supervision.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": false,
    "instructors": ["Reynolds", "Bean"]
  },
  {
    "id": "cs498r",
    "header": "CS 498R",
    "title": "Undergraduate Teaching Assistant",
    "description": "Assisting in teaching undergraduate computer science courses.",
    "credits": 3,
    "semesters": ["F", "W", "SP", "SU"],
    "isCore": false,
    "instructors": ["Wilkerson"]
  },
  {
    "id": "cs501",
    "header": "CS 501",
    "title": "Advanced Algorithms",
    "description": "In-depth study of advanced algorithmic techniques and analysis.",
    "credits": 3,
    "semesters": ["F"],
    "isCore": false,
    "instructors": ["Jensen", "Stevens", "Fulda"]
  }
]

export default coursesData